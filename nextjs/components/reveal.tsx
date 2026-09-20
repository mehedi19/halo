"use client";

/* HALO.BD — Scroll reveal wrapper (IntersectionObserver, once).
   Mirrors assets/js/halo.js §1. Respects prefers-reduced-motion via CSS. */
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

export default function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  /** stagger delay in ms (§25 gentle stagger) */
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("is-visible");
            io.unobserve(el);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`halo-reveal ${className}`.trim()}
      style={{ "--halo-reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
