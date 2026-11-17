import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import {
  checkIsAdmin,
  getSession,
  onAuthChange,
  signOut,
} from "../services/adminService";
import { fetchGalleryImages } from "../services/galleryService";
import LoginForm from "../components/admin/LoginForm";
import UploadForm from "../components/admin/UploadForm";
import PhotoManager from "../components/admin/PhotoManager";
import CoachManager from "../components/admin/CoachManager";
import { img } from "../utils/img";
import "./style/admin.css";

export default function AdminPage() {
  const [session, setSession] = useState(undefined); // undefined = still checking
  const [allowed, setAllowed] = useState(null); // null = checking, true/false after the admin check
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tab, setTab] = useState(
    window.location.hash === "#coaches" ? "coaches" : "gallery",
  );
  const switchTab = (t) => {
    setTab(t);
    window.history.replaceState(null, "", `#${t}`);
  };

  useEffect(() => {
    document.title = "Admin · Tonaldo FC";
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex,nofollow";
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  useEffect(() => {
    if (!supabase) return;
    getSession().then(setSession);
    return onAuthChange(setSession);
  }, []);

  useEffect(() => {
    if (!session) {
      setAllowed(null);
      return;
    }
    checkIsAdmin()
      .then(setAllowed)
      .catch(() => setAllowed(false));
  }, [session]);

  const reload = useCallback(async () => {
    try {
      setPhotos(await fetchGalleryImages());
      setError(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    if (allowed) reload();
  }, [allowed, reload]);

  const categories = useMemo(
    () => [...new Set(photos.map((p) => p.category))],
    [photos],
  );

  let body;
  if (!supabase)
    body = (
      <div className="adm-card">
        <h1>Admin not set up yet</h1>
        <p>
          Add <code>VITE_SUPABASE_URL</code> and{" "}
          <code>VITE_SUPABASE_ANON_KEY</code> to your environment variables,
          then restart.
        </p>
      </div>
    );
  else if (session === undefined)
    body = <p className="adm-muted adm-center">Loading…</p>;
  else if (!session) body = <LoginForm />;
  else if (allowed === null)
    body = <p className="adm-muted adm-center">Checking access…</p>;
  else if (!allowed)
    body = (
      <div className="adm-card">
        <h1>No access</h1>
        <p>This account isn't an admin. Sign out and use the admin account.</p>
      </div>
    );
  else
    body = (
      <>
        <nav className="adm-tabs" aria-label="Admin sections">
          <button
            className={tab === "gallery" ? "on" : ""}
            onClick={() => switchTab("gallery")}
          >
            Gallery
          </button>
          <button
            className={tab === "coaches" ? "on" : ""}
            onClick={() => switchTab("coaches")}
          >
            Coaches
          </button>
        </nav>
        {tab === "gallery" ? (
          <>
            <UploadForm categories={categories} onUploaded={reload} />
            <PhotoManager
              photos={photos}
              categories={categories}
              loading={loading}
              error={error}
              onChanged={reload}
            />
          </>
        ) : (
          <CoachManager />
        )}
      </>
    );

  return (
    <div className="adm">
      <header className="adm-bar">
        <a href="/" className="adm-brand">
          <img src={img("crest.png")} alt="" />
          <span>
            TONALDO FC<small>WEBSITE ADMIN</small>
          </span>
        </a>
        <div>
          <a href="/" className="adm-link">
            View website
          </a>
          {session && (
            <button className="adm-link" onClick={signOut}>
              Sign out
            </button>
          )}
        </div>
      </header>
      <main className="adm-main">{body}</main>
    </div>
  );
}
