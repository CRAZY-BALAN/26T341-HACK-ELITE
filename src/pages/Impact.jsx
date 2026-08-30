import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { staggerContainer, fadeUp } from "../animations/variants";

const STATS = [
  { label: "Users supported", value: 12480, suffix: "" },
  { label: "Resources connected", value: 4821, suffix: "" },
  { label: "Accessibility satisfaction", value: 93, suffix: "%" },
  { label: "Faster service discovery", value: 87, suffix: "%" },
];

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 900;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      setDisplay(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return <span ref={ref}>{display.toLocaleString()}{suffix}</span>;
}

export default function Impact() {
  return (
    <motion.div initial="hidden" animate="show" variants={staggerContainer(0.07)} className="max-w-4xl mx-auto space-y-8">
      <motion.div variants={fadeUp}>
        <p className="font-mono text-xs uppercase tracking-wide text-[var(--color-accent-700)] mb-2">For judges & partners</p>
        <h1 className="font-display text-[30px]">The impact so far</h1>
        <p className="text-[14.5px] text-[var(--color-ink-600)] mt-1 max-w-lg">
          Simulated figures for the demo — showing what an adaptive, inclusive platform could look like at scale.
        </p>
      </motion.div>

      <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-2xl border border-[var(--color-border)] bg-white p-5 text-center">
            <p className="font-display text-[28px] text-gradient font-medium"><Counter value={s.value} suffix={s.suffix} /></p>
            <p className="text-[12px] text-[var(--color-ink-500)] mt-1 leading-snug">{s.label}</p>
          </div>
        ))}
      </motion.div>

      <motion.div variants={fadeUp} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-soft)] p-6">
        <p className="font-display text-[18px] mb-4">How it works</p>
        <div className="flex flex-col sm:flex-row items-stretch gap-3">
          {["Problem", "User profile", "Adaptive engine", "AI assistance", "Personalized services", "Impact"].map((step, i, arr) => (
            <div key={step} className="flex items-center gap-3 flex-1">
              <div className="flex-1 rounded-xl bg-white border border-[var(--color-border)] px-3 py-3 text-center">
                <p className="text-[12.5px] font-semibold text-[var(--color-ink-900)]">{step}</p>
              </div>
              {i < arr.length - 1 && <span className="hidden sm:block text-[var(--color-accent-500)]">→</span>}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
