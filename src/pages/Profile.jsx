import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { useProfile } from "../context/ProfileContext";
import { PROFILES } from "../data/profiles";
import { Icon } from "../utils/icons";
import { useToast } from "../components/common/Toast";
import { staggerContainer, fadeUp } from "../animations/variants";

export default function Profile() {
  const { profile, a11y, name, setName, selectProfile } = useProfile();
  const [demoOpen, setDemoOpen] = useState(false);
  const showToast = useToast();

  const dna = [
    { label: "Text size", value: `${a11y.fontScale}%` },
    { label: "Contrast", value: a11y.highContrast ? "High" : "Standard" },
    { label: "Motion", value: a11y.reduceMotion ? "Reduced" : "Full" },
    { label: "Voice", value: a11y.voiceAssist ? "On" : "Off" },
    { label: "Captions", value: a11y.captions ? "On" : "Off" },
    { label: "Language", value: a11y.simplified ? "Simplified" : "Standard" },
  ];

  return (
    <motion.div initial="hidden" animate="show" variants={staggerContainer(0.06)} className="max-w-2xl mx-auto space-y-6">
      <motion.div variants={fadeUp} className="rounded-2xl border border-[var(--color-border)] bg-white p-5 flex items-center gap-4">
        <span className="h-14 w-14 rounded-full bg-signature-gradient text-white flex items-center justify-center text-[20px] font-semibold">
          {name?.[0]?.toUpperCase() || "A"}
        </span>
        <div className="flex-1">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="font-display text-[19px] bg-transparent outline-none w-full"
            aria-label="Your name"
          />
          <p className="text-[13px] text-[var(--color-ink-400)]">{profile?.name} experience</p>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
        <p className="font-display text-[16px] mb-1">Accessibility DNA</p>
        <p className="text-[12.5px] text-[var(--color-ink-400)] mb-4">A visual profile of the preferences shaping your experience.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {dna.map((d) => (
            <div key={d.label} className="rounded-xl bg-[var(--color-bg-soft)] border border-[var(--color-border)] p-3 text-center">
              <p className="text-[11px] text-[var(--color-ink-400)] font-semibold uppercase tracking-wide">{d.label}</p>
              <p className="text-[14px] font-semibold text-[var(--color-accent-800)] mt-0.5">{d.value}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
        <div className="flex items-center justify-between mb-1">
          <p className="font-display text-[16px] flex items-center gap-2"><Sparkles size={16} /> Demo mode</p>
          <button onClick={() => setDemoOpen((o) => !o)} className="text-[13px] font-semibold text-[var(--color-accent-700)]">
            {demoOpen ? "Hide" : "Explore"}
          </button>
        </div>
        <p className="text-[12.5px] text-[var(--color-ink-400)] mb-3">For judges — switch between experiences and watch the interface transform.</p>
        {demoOpen && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {PROFILES.map((p) => (
              <button
                key={p.id}
                onClick={() => { selectProfile(p.id); showToast(`Switched to ${p.name} experience.`); }}
                className={`flex items-center gap-2 rounded-xl border px-2.5 py-2 text-[12.5px] font-medium text-left ${
                  profile?.id === p.id ? "border-[var(--color-accent-500)] bg-[var(--color-accent-50)]" : "border-[var(--color-border)]"
                }`}
              >
                <Icon name={p.icon} size={14} />
                <span className="truncate">{p.name}</span>
                {profile?.id === p.id && <Check size={12} className="ml-auto text-[var(--color-accent-700)]" />}
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
