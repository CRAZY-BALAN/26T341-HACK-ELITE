import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Phone, Share2, UserCheck, Hospital, ShieldAlert, X } from "lucide-react";
import { useToast } from "../components/common/Toast";
import { staggerContainer, fadeUp } from "../animations/variants";

const ACTIONS = [
  { id: "call", label: "Call Emergency Services", icon: Phone, desc: "Dials 108 — ambulance & emergency response." },
  { id: "share", label: "Share My Location", icon: Share2, desc: "Sends your live location to your trusted contact." },
  { id: "contact", label: "Contact Trusted Person", icon: UserCheck, desc: "Calls Priya (Daughter) — your primary contact." },
  { id: "hospital", label: "Find Nearest Hospital", icon: Hospital, desc: "Government General Hospital — 4.0 km, 24 hours." },
  { id: "report", label: "Report an Incident", icon: ShieldAlert, desc: "Log details for local authorities to review." },
];

export default function Emergency() {
  const [confirming, setConfirming] = useState(null);
  const showToast = useToast();

  const confirm = () => {
    showToast(`${confirming.label} — done.`);
    setConfirming(null);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div initial="hidden" animate="show" variants={staggerContainer(0.07)} className="space-y-6">
        <motion.div variants={fadeUp} className="rounded-2xl bg-[var(--color-ink-900)] text-white p-6 flex items-center gap-4">
          <span className="h-12 w-12 rounded-full bg-[var(--color-error)]/20 text-[var(--color-error)] flex items-center justify-center shrink-0">
            <AlertTriangle size={22} />
          </span>
          <div>
            <p className="font-display text-[19px]">Emergency Assistance</p>
            <p className="text-[13px] text-white/60">Every action below asks for confirmation before it happens.</p>
          </div>
        </motion.div>

        <motion.button
          variants={fadeUp}
          onClick={() => setConfirming(ACTIONS[0])}
          whileTap={{ scale: 0.98 }}
          className="w-full rounded-2xl border-2 border-[var(--color-error)] bg-[color-mix(in_srgb,var(--color-error)_8%,white)] py-8 flex flex-col items-center gap-2"
        >
          <span className="h-14 w-14 rounded-full bg-[var(--color-error)] text-white flex items-center justify-center">
            <Phone size={24} />
          </span>
          <span className="font-display text-[18px] text-[var(--color-error)]">Call for Emergency Help</span>
        </motion.button>

        <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ACTIONS.slice(1).map((a) => (
            <button
              key={a.id}
              onClick={() => setConfirming(a)}
              className="text-left rounded-2xl border border-[var(--color-border)] bg-white p-4 hover:border-[var(--color-accent-400)] transition-colors"
            >
              <span className="h-9 w-9 rounded-lg bg-[var(--color-accent-100)] text-[var(--color-accent-700)] flex items-center justify-center mb-2">
                <a.icon size={17} />
              </span>
              <p className="text-[14px] font-semibold">{a.label}</p>
              <p className="text-[12.5px] text-[var(--color-ink-400)] mt-0.5">{a.desc}</p>
            </button>
          ))}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {confirming && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-6"
            onClick={() => setConfirming(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-sm w-full"
            >
              <div className="flex items-start justify-between mb-3">
                <p className="font-display text-[18px]">Confirm: {confirming.label}</p>
                <button onClick={() => setConfirming(null)} aria-label="Cancel"><X size={18} /></button>
              </div>
              <p className="text-[13.5px] text-[var(--color-ink-600)] mb-5">{confirming.desc}</p>
              <div className="flex gap-2">
                <button onClick={confirm} className="flex-1 rounded-xl bg-[var(--color-error)] text-white font-semibold py-2.5 text-[14px]">Confirm</button>
                <button onClick={() => setConfirming(null)} className="flex-1 rounded-xl border border-[var(--color-border)] font-semibold py-2.5 text-[14px]">Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
