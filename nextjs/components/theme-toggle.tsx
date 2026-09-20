"use client";

/* HALO.BD — Theme toggle (System → Light → Dark). Mirrors assets/js/halo-theme.js.
   The pre-paint BOOT script lives in app/layout.tsx (no flash). */
import { useEffect, useState } from "react";

const KEY = "halo-theme";
type State = "system" | "light" | "dark";
const CYCLE: Record<State, State> = { system: "light", light: "dark", dark: "system" };
const LABELS: Record<State, string> = {
  system: "Theme: system. Activate to switch to light mode.",
  light: "Theme: light. Activate to switch to dark mode.",
  dark: "Theme: dark. Activate to follow the system theme.",
};

function getState(): State {
  try {
    const v = localStorage.getItem(KEY);
    return v === "light" || v === "dark" ? v : "system";
  } catch {
    return "system";
  }
}
function effective(state: State) {
  if (state !== "system") return state;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function apply(state: State, persist: boolean) {
  try {
    if (persist) {
      if (state === "system") localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, state);
    }
  } catch { /* private mode */ }
  const theme = effective(state);
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  root.setAttribute("data-theme-source", state);
  root.style.colorScheme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "dark" ? "#0A0A0A" : "#F6F6F3");
}

export default function ThemeToggle() {
  const [state, setState] = useState<State>("system");

  useEffect(() => {
    const s = getState();
    setState(s);
    apply(s, false);
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => { if (getState() === "system") apply("system", false); };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const next = () => {
    const s = CYCLE[getState()];
    setState(s);
    apply(s, true);
  };

  return (
    <button
      type="button"
      className="halo-theme-toggle"
      aria-label={LABELS[state]}
      aria-pressed={state !== "system"}
      title={LABELS[state]}
      onClick={next}
    >
      {/* Lucide (ISC): sun / moon / monitor — visibility is token-driven in CSS */}
      <svg className="halo-icon-sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></svg>
      <svg className="halo-icon-moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
      <svg className="halo-icon-system" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="14" x="2" y="3" rx="2" /><line x1="8" x2="16" y1="21" y2="21" /><line x1="12" x2="12" y1="17" y2="21" /></svg>
    </button>
  );
}
