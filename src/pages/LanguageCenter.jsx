import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useToast } from "../components/common/Toast";
import { fadeUp, staggerContainer } from "../animations/variants";

const LANGS = [
  { code: "en", name: "English", sample: "Here are three healthcare resources near you." },
  { code: "ta", name: "Tamil", sample: "உங்களுக்கு அருகில் மூன்று சுகாதார வளங்கள் உள்ளன." },
  { code: "hi", name: "Hindi", sample: "आपके पास तीन स्वास्थ्य सेवा संसाधन हैं।" },
  { code: "te", name: "Telugu", sample: "మీ దగ్గర మూడు ఆరోగ్య వనరులు ఉన్నాయి." },
  { code: "ml", name: "Malayalam", sample: "നിങ്ങൾക്ക് സമീപം മൂന്ന് ആരോഗ്യ വിഭവങ്ങൾ ഉണ്ട്." },
  { code: "kn", name: "Kannada", sample: "ನಿಮ್ಮ ಬಳಿ ಮೂರು ಆರೋಗ್ಯ ಸಂಪನ್ಮೂಲಗಳಿವೆ." },
];

export default function LanguageCenter() {
  const [active, setActive] = useState("en");
  const showToast = useToast();
  const current = LANGS.find((l) => l.code === active);

  return (
    <motion.div initial="hidden" animate="show" variants={staggerContainer(0.06)} className="max-w-lg mx-auto space-y-6">
      <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {LANGS.map((l) => (
          <button
            key={l.code}
            onClick={() => { setActive(l.code); showToast(`Language set to ${l.name}.`); }}
            className={`flex items-center justify-between rounded-xl border px-3.5 py-2.5 text-[13.5px] font-medium ${
              active === l.code ? "border-[var(--color-accent-500)] bg-[var(--color-accent-50)] text-[var(--color-accent-900)]" : "border-[var(--color-border)]"
            }`}
          >
            {l.name} {active === l.code && <Check size={14} />}
          </button>
        ))}
      </motion.div>
      <motion.div variants={fadeUp} className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--color-ink-400)] mb-2">Preview</p>
        <p className="text-[15px] leading-relaxed">{current.sample}</p>
      </motion.div>
    </motion.div>
  );
}
