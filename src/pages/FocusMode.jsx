import { motion } from "framer-motion";
import { Target, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { fadeUp, staggerContainer } from "../animations/variants";

const TASKS = [
  "Message the AI assistant about your form",
  "Review the suggested resource",
  "Save it to your support plan",
];

export default function FocusMode() {
  const [step, setStep] = useState(0);
  const done = step >= TASKS.length;

  return (
    <motion.div initial="hidden" animate="show" variants={staggerContainer(0.06)} className="max-w-md mx-auto py-6 space-y-6">
      <motion.div variants={fadeUp} className="flex items-center gap-2 text-[var(--color-accent-700)]">
        <Target size={18} /> <p className="font-display text-[16px]">One task at a time</p>
      </motion.div>

      {done ? (
        <motion.div variants={fadeUp} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-soft)] p-8 text-center">
          <CheckCircle2 size={28} className="mx-auto text-[var(--color-success)] mb-2" />
          <p className="font-display text-[17px]">All done for now.</p>
        </motion.div>
      ) : (
        <motion.div variants={fadeUp} className="rounded-2xl border border-[var(--color-border)] bg-white p-8 text-center">
          <p className="text-[12px] font-semibold uppercase tracking-wide text-[var(--color-ink-400)] mb-2">Step {step + 1} of {TASKS.length}</p>
          <p className="font-display text-[19px] mb-6">{TASKS[step]}</p>
          <button onClick={() => setStep((s) => s + 1)} className="rounded-xl bg-signature-gradient text-white font-semibold px-6 py-2.5 text-[14px]">
            Mark complete
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
