import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SCHEMA } from "./editorSchema";
import FieldRenderer from "./FieldRenderer";
import Icon from "./Icon";
import { DEFAULT_CONTENT } from "../../data/defaultContent";
import { clone, deepEqual, mergeContent, setIn } from "../../lib/contentUtils";
import {
  fetchStoredContent,
  saveSections,
} from "../../services/contentService";
import "./style/admin.css";
const DEVICES = [
  { id: "desktop", label: "Desktop", icon: "monitor", pixels: 1440 },
  { id: "tablet", label: "Tablet", icon: "tablet", pixels: 820 },
  { id: "mobile", label: "Phone", icon: "phone", pixels: 390 },
];

export default function ContentEditor() {
  const [original, setOriginal] = useState(null); // what is saved (or the built-in text)
  const [draft, setDraft] = useState(null); // what is being edited
  const [loadFailed, setLoadFailed] = useState(false);
  const [openId, setOpenId] = useState("hero");
  const [focus, setFocus] = useState(null); // { path, n } set when text is clicked in the preview
  const [device, setDevice] = useState("desktop");
  const [view, setView] = useState("edit"); // small screens: 'edit' or 'preview'
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [pane, setPane] = useState({ w: 900, small: false }); // size of the preview area
  const frameRef = useRef(null);
  const previewRef = useRef(null);
  const panelRef = useRef(null);
  const draftRef = useRef(null);
  const origin = window.location.origin;

  const load = useCallback(async () => {
    setLoadFailed(false);
    try {
      const merged = mergeContent(DEFAULT_CONTENT, await fetchStoredContent());
      setOriginal(merged);
      setDraft(merged);
    } catch {
      // Couldn't read saved content: edit from the built-in text, but don't allow saving until it loads
      setLoadFailed(true);
      setOriginal(DEFAULT_CONTENT);
      setDraft(DEFAULT_CONTENT);
    }
  }, []);
  useEffect(() => {
    load();
  }, [load]);

  // measure the preview area so the website can be shown at its real desktop/tablet/phone width, scaled to fit
  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;
    const measure = () =>
      setPane({
        w: el.clientWidth - 36,
        small: window.matchMedia("(max-width: 1100px)").matches,
      });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [draft === null]); // eslint-disable-line react-hooks/exhaustive-deps

  // send the draft to the live preview
  draftRef.current = draft;
  const sendDraft = useCallback(() => {
    const win = frameRef.current?.contentWindow;
    if (win && draftRef.current)
      win.postMessage(
        { type: "tonaldo-draft", content: draftRef.current },
        origin,
      );
  }, [origin]);
  useEffect(() => {
    const t = setTimeout(sendDraft, 120);
    return () => clearTimeout(t);
  }, [draft, sendDraft]);

  // messages from the preview: ready, or "this text was clicked"
  useEffect(() => {
    const onMessage = (e) => {
      if (e.origin !== origin) return;
      if (e.data?.type === "tonaldo-ready") sendDraft();
      if (e.data?.type === "tonaldo-focus") {
        const path = String(e.data.path);
        setOpenId(path.split(".")[0]);
        setView("edit");
        setFocus({ path, n: Date.now() });
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [origin, sendDraft]);

  // scroll to and highlight the clicked field
  useEffect(() => {
    if (!focus || !panelRef.current) return;
    let tries = 0;
    const find = () => {
      const el = panelRef.current?.querySelector(
        `[data-field="${focus.path}"]`,
      );
      if (!el) {
        if (tries++ < 6) setTimeout(find, 60);
        return;
      }
      el.scrollIntoView({ block: "center", behavior: "smooth" });
      const box = el.closest(".cx-field") || el;
      box.classList.add("cx-flash");
      if (el.focus && el.tagName !== "DIV") el.focus({ preventScroll: true });
      setTimeout(() => box.classList.remove("cx-flash"), 1600);
    };
    setTimeout(find, 60);
  }, [focus]);

  const dirty = useMemo(
    () =>
      draft && original
        ? SCHEMA.filter((s) => !deepEqual(draft[s.id], original[s.id])).map(
            (s) => s.id,
          )
        : [],
    [draft, original],
  );
  useEffect(() => {
    if (!dirty.length) return;
    const warn = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty.length]);

  const setField = (sectionId, key, value) =>
    setDraft((d) => setIn(d, `${sectionId}.${key}`, value));
  const resetSection = (id) =>
    setDraft((d) => ({ ...d, [id]: clone(DEFAULT_CONTENT[id]) }));

  const save = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const changes = {};
      for (const id of dirty)
        changes[id] = deepEqual(draft[id], DEFAULT_CONTENT[id])
          ? null
          : draft[id]; // back to built-in text = remove the saved copy
      await saveSections(changes);
      setOriginal(draft);
      setMessage({
        type: "ok",
        text: "Saved. The website now shows your changes.",
      });
    } catch {
      setMessage({
        type: "err",
        text: "Could not save. Check your connection and try again.",
      });
    }
    setSaving(false);
  };

  if (!draft) return <p className="adm-muted adm-center">Loading…</p>;
  const wanted = pane.small
    ? Math.max(pane.w + 16, 320)
    : DEVICES.find((d) => d.id === device).pixels;
  const scale = Math.min(1, (pane.w + (pane.small ? 16 : 0)) / wanted);

  return (
    <div className="cx" data-view={view}>
      <div className="cx-bar">
        <div className="cx-status">
          {dirty.length ? (
            <>
              <i className="dot" />
              {dirty.length} section{dirty.length > 1 ? "s" : ""} with unsaved
              changes
            </>
          ) : (
            <>
              <Icon name="check" size={16} />
              No unsaved changes
            </>
          )}
          {message && (
            <span className={message.type === "ok" ? "adm-ok" : "adm-err"}>
              {message.text}
            </span>
          )}
        </div>
        <div className="cx-view-switch">
          <button
            className={view === "edit" ? "on" : ""}
            onClick={() => setView("edit")}
          >
            Edit
          </button>
          <button
            className={view === "preview" ? "on" : ""}
            onClick={() => setView("preview")}
          >
            Preview
          </button>
        </div>
        <div className="cx-devices" role="group" aria-label="Preview size">
          {DEVICES.map((d) => (
            <button
              key={d.id}
              className={device === d.id ? "on" : ""}
              onClick={() => setDevice(d.id)}
              aria-label={d.label}
              title={d.label}
            >
              <Icon name={d.icon} size={18} />
            </button>
          ))}
        </div>
        <button
          className="btn sm ghost-dark"
          disabled={!dirty.length || saving}
          onClick={() => setDraft(original)}
        >
          Discard
        </button>
        <button
          className="btn sm"
          disabled={!dirty.length || saving || loadFailed}
          onClick={save}
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>

      {loadFailed && (
        <div className="cx-warn">
          Couldn't load your saved text, so you're seeing the website's built-in
          text. Saving is turned off until it loads.{" "}
          <button onClick={load}>Try again</button>
        </div>
      )}

      <div className="cx-body">
        <div className="cx-panel" ref={panelRef}>
          <p className="cx-tip">
            <Icon name="edit" size={16} /> Click any text in the preview to edit
            it, or open a section below. If anything ever fails to load, the
            website shows its built-in text.
          </p>
          {SCHEMA.map((section) => {
            const isOpen = openId === section.id;
            const isDirty = dirty.includes(section.id);
            return (
              <section
                className={`cx-sec${isOpen ? " open" : ""}`}
                key={section.id}
              >
                <button
                  className="cx-sec-head"
                  onClick={() => setOpenId(isOpen ? null : section.id)}
                  aria-expanded={isOpen}
                >
                  <span>{section.label}</span>
                  {isDirty && <i className="dot" title="Unsaved changes" />}
                  <Icon name="chevron" size={18} />
                </button>
                {isOpen && (
                  <div className="cx-sec-body">
                    {section.fields.map((f) => (
                      <FieldRenderer
                        key={f.key}
                        field={f}
                        value={draft[section.id]?.[f.key]}
                        path={`${section.id}.${f.key}`}
                        focus={focus}
                        onChange={(v) => setField(section.id, f.key, v)}
                      />
                    ))}
                    <button
                      className="cx-reset"
                      onClick={() => resetSection(section.id)}
                      disabled={deepEqual(
                        draft[section.id],
                        DEFAULT_CONTENT[section.id],
                      )}
                    >
                      Reset this section to the built-in text
                    </button>
                  </div>
                )}
              </section>
            );
          })}
        </div>

        <div className="cx-preview" ref={previewRef}>
          <div className="cx-frame" style={{ width: wanted * scale }}>
            <iframe
              ref={frameRef}
              title="Website preview"
              src="/?editor=1"
              onLoad={sendDraft}
              style={{
                width: wanted,
                height: `${100 / scale}%`,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
