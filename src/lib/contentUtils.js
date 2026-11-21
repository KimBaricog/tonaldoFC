// Small helpers for the editable site content

export const deepEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);
export const clone = (v) => JSON.parse(JSON.stringify(v));

export const getIn = (obj, path) =>
  path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), obj);

// Returns a copy of `obj` with the value at `path` replaced (path like "faq.items.2.question")
export function setIn(obj, path, value) {
  const [head, ...rest] = path.split(".");
  const copy = Array.isArray(obj) ? [...obj] : { ...obj };
  copy[head] = rest.length
    ? setIn(
        obj?.[head] ?? (Number.isInteger(+rest[0]) ? [] : {}),
        rest.join("."),
        value,
      )
    : value;
  return copy;
}

const isObject = (v) =>
  v !== null && typeof v === "object" && !Array.isArray(v);

// Layers stored (edited) values on top of the built-in defaults, field by field.
// Anything missing or of the wrong type falls back to the default, so a broken or partial
// database row can never remove text from the website.
function mergeValue(def, stored) {
  if (Array.isArray(def)) {
    if (!Array.isArray(stored)) return def;
    return stored.map((item, i) => {
      const template = def[i] ?? def[0];
      if (isObject(template))
        return isObject(item) ? mergeValue(template, item) : template;
      return typeof item === typeof template ? item : template;
    });
  }
  if (isObject(def)) {
    const out = {};
    for (const key of Object.keys(def))
      out[key] = mergeValue(
        def[key],
        isObject(stored) ? stored[key] : undefined,
      );
    // keep extra keys that only exist on stored list items (e.g. a program photo)
    if (isObject(stored))
      for (const key of Object.keys(stored))
        if (!(key in out) && stored[key] != null) out[key] = stored[key];
    return out;
  }
  return typeof stored === typeof def ? stored : def;
}

export function mergeContent(defaults, stored) {
  const out = {};
  for (const section of Object.keys(defaults)) {
    out[section] = isObject(stored?.[section])
      ? mergeValue(defaults[section], stored[section])
      : defaults[section];
  }
  return out;
}

// "Hello {count}" + { count: 6 } -> "Hello 6"
export const fill = (text, vars) =>
  (text || "").replace(/\{(\w+)\}/g, (_, k) =>
    k in vars ? vars[k] : `{${k}}`,
  );
