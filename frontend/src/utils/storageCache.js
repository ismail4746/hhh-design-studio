// Simple sessionStorage JSON cache with TTL.
// Uses best-effort storage (fails silently for quota/private mode).

export function getCachedJson(key, maxAgeMs) {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed.t !== "number") return null;
    if (Date.now() - parsed.t > maxAgeMs) return null;
    return parsed.v ?? null;
  } catch {
    return null;
  }
}

export function setCachedJson(key, value) {
  try {
    sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), v: value }));
  } catch {
    // ignore
  }
}
