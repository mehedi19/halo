/* HALO.BD — /playground/ (§22). §40 rule: publish only with ≥3 real pieces. */
import type { Metadata } from "next";
import Reveal from "../../components/reveal";

export const metadata: Metadata = {
  title: "Playground",
  description: "Experiments by Mehedi Hasan — UI experiments, micro-interactions, AI experiments, vibe-coding projects, motion studies and concept products.",
  alternates: { canonical: "/playground/" },
  /* [TODO] set robots index:true once real experiments exist (§40) */
  robots: { index: false },
};

const ITEMS = [
  { n: "01", t: "[Experiment 01]", d: "[PLACEHOLDER — UI experiment / micro-interaction §22]" },
  { n: "02", t: "[Experiment 02]", d: "[PLACEHOLDER — AI experiment / vibe-coding project]" },
  { n: "03", t: "[Experiment 03]", d: "[PLACEHOLDER — motion study / concept product]" },
];

export default function PlaygroundPage() {
  return (
    <section className="halo-section">
      <div className="halo-wrap">
        <div className="halo-section-head">
          <p className="halo-eyebrow">Playground</p>
          <h1 className="halo-display">Things I build when nobody asks me to.</h1>
          <p className="halo-lead">UI experiments, micro-interactions, AI experiments, motion studies and design-system explorations.</p>
        </div>
        <div className="halo-play-grid">
          {ITEMS.map((item, i) => (
            <Reveal key={item.n} delay={i * 80}>
              <div className="halo-play-item">
                <b className="halo-h3">{item.t}</b>
                <small className="halo-caption">{item.d}</small>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
