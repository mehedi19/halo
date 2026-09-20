"use client";

/* HALO.BD — Hero signature moment (§37): restrained word-by-word reveal.
   Server-first markup stays readable without JS; splitting happens post-mount
   and is skipped entirely under prefers-reduced-motion. */
import { useEffect, useRef, type ReactNode } from "react";

export default function HeroTitle({
  children,
  as: Tag = "h1",
}: {
  children: ReactNode;
  as?: "h1" | "h2";
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const nodes = Array.from(el.childNodes);
    let index = 0;
    const frag = document.createDocumentFragment();
    nodes.forEach((node) => {
      const italic = node.nodeType === 1 && (node as HTMLElement).tagName === "EM";
      (node.textContent || "").split(/(\s+)/).forEach((piece) => {
        if (!piece.trim()) {
          frag.appendChild(document.createTextNode(" "));
          return;
        }
        const span = document.createElement("span");
        span.className = "halo-word";
        span.style.setProperty("--halo-word-i", String(index++));
        if (italic) {
          const em = document.createElement("em");
          em.textContent = piece;
          span.appendChild(em);
        } else {
          span.textContent = piece;
        }
        frag.appendChild(span);
      });
    });
    el.textContent = "";
    el.appendChild(frag);
  }, []);

  return (
    <Tag ref={ref} className="halo-display">
      {children}
    </Tag>
  );
}
