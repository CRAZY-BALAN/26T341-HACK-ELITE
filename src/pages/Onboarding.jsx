import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, HeartPulse, GraduationCap, Briefcase, Landmark, Siren, Bus, Wallet, MessageSquare, Mic, Type, Eye, ZoomIn, Contrast, Wand2, Captions, BookOpenText } from "lucide-react";
import { useProfile } from "../context/ProfileContext";
import Button from "../components/common/Button";
import AmbientBackground from "../components/common/AmbientBackground";

const NEEDS = [
  { id: "healthcare", label: "Healthcare", icon: HeartPulse },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "employment", label: "Employment", icon: Briefcase },
  { id: "government", label: "Government Services", icon: Landmark },
  { id: "emergency", label: "Emergency Help", icon: Siren },
  { id: "transport", label: "Transportation", icon: Bus },
  { id: "financial", label: "Financial Support", icon: Wallet },
  { id: "communication", label: "Communication", icon: MessageSquare },
];

const INTERACTION = [
  { id: "voice", label: "Voice", icon: Mic },
  { id: "text", label: "Text", icon: Type },
  { id: "visual", label: "Visual", icon: Eye },
  { id: "simple", label: "Simple Navigation", icon: ZoomIn },
];

const A11Y_PREFS = [
  { id: "fontScale", label: "Large text", icon: Type, on: { fontScale: 122 }, off: { fontScale: 100 } },
  { id: "highContrast", label: "High contrast", icon: Contrast, on: { highContrast: true }, off: { highContrast: false } },
  { id: "reduceMotion", label: "Reduced motion", icon: Wand2, on: { reduceMotion: true }, off: { reduceMotion: false } },
  { id: "captions", label: "Captions", icon: Captions, on: { captions: true }, off: { captions: false } },
  { id: "voiceAssist", label: "Voice assistance", icon: Mic, on: { voiceAssist: true }, off: { voiceAssist: false } },
  { id: "simplified", label: "Simplified language", icon: BookOpenText, on: { simplified: true }, off: { simplified: false } },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const { profile, a11y, completeOnboarding } = useProfile();
  const [step, setStep] = useState(1);
  const [needs, setNeeds] = useState([]);
  const [interaction, setInteraction] = useState(profile?.defaults?.simplified ? "simple" : "text");
  const [prefs, setPrefs] = useState(new Set(Object.entries(a11y).filter(([, v]) => v === true || (typeof v === "number" && v > 100)).map(([k]) => k)));

  if (!profile) {
    navigate("/", { replace: true });
    return null;
  }

  const toggleNeed = (id) => setNeeds((n) => (n.includes(id) ? n.filter((x) => x !== id) : [...n, id]));
  const togglePref = (id) => setPrefs((s) => { const next = new Set(s); next.has(id) ? next.delete(id) : next.add(id); return next; });

  const finish = () => {
    const patch = {};
    A11Y_PREFS.forEach((p) => Object.assign(patch, prefs.has(p.id) ? p.on : p.off));
    completeOnboarding(patch);
    navigate("/dashboard");
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center px-6 py-16">
      <AmbientBackground />
      <div className="relative w-full max-w-xl">
        <div className="flex items-center gap-2 mb-8">
          <span className="font-mono text-xs text-[var(--color-accent-700)]">0{step} / 03</span>
          <div className="flex-1 h-1.5 rounded-full bg-[var(--color-accent-100)] overflow-hidden">
            <motion.div
              className="h-full bg-signature-gradient"
              animate={{ width: `${(step / 3) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3 }}>
              <h2 className="font-display text-[28px] mb-2">What do you need most?</h2>
              <p className="text-[var(--color-ink-600)] mb-6 text-sm">Pick as many as apply — we'll surface these first.</p>
              <div className="grid grid-cols-2 gap-3">
                {NEEDS.map(({ id, label, icon: Ico }) => (
                  <button
                    key={id}
                    onClick={() => toggleNeed(id)}
                    className={`flex items-center gap-2.5 rounded-xl border px-4 py-3 text-sm font-medium text-left transition-colors ${
                      needs.includes(id) ? "border-[var(--color-accent-500)] bg-[var(--color-accent-50)] text-[var(--color-accent-900)]" : "border-[var(--color-border)] hover:border-[var(--color-accent-300)]"
                    }`}
                  >
                    <Ico size={17} /> {label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3 }}>
              <h2 className="font-display text-[28px] mb-2">How would you like to interact?</h2>
              <p className="text-[var(--color-ink-600)] mb-6 text-sm">This shapes how Inclusa responds to you by default.</p>
              <div className="grid grid-cols-2 gap-3">
                {INTERACTION.map(({ id, label, icon: Ico }) => (
                  <button
                    key={id}
                    onClick={() => setInteraction(id)}
                    className={`flex items-center gap-2.5 rounded-xl border px-4 py-3 text-sm font-medium text-left transition-colors ${
                      interaction === id ? "border-[var(--color-accent-500)] bg-[var(--color-accent-50)] text-[var(--color-accent-900)]" : "border-[var(--color-border)] hover:border-[var(--color-accent-300)]"
                    }`}
                  >
                    <Ico size={17} /> {label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3 }}>
              <h2 className="font-display text-[28px] mb-2">Accessibility preferences</h2>
              <p className="text-[var(--color-ink-600)] mb-6 text-sm">Turn on anything that helps — you can change these anytime.</p>
              <div className="grid grid-cols-2 gap-3">
                {A11Y_PREFS.map(({ id, label, icon: Ico }) => (
                  <button
                    key={id}
                    onClick={() => togglePref(id)}
                    className={`flex items-center gap-2.5 rounded-xl border px-4 py-3 text-sm font-medium text-left transition-colors ${
                      prefs.has(id) ? "border-[var(--color-accent-500)] bg-[var(--color-accent-50)] text-[var(--color-accent-900)]" : "border-[var(--color-border)] hover:border-[var(--color-accent-300)]"
                    }`}
                  >
                    <Ico size={17} /> {label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between mt-9">
          {step > 1 ? (
            <Button variant="ghost" onClick={() => setStep((s) => s - 1)}><ArrowLeft size={16} /> Back</Button>
          ) : <span />}
          {step < 3 ? (
            <Button onClick={() => setStep((s) => s + 1)}>Continue <ArrowRight size={16} /></Button>
          ) : (
            <Button onClick={finish}>Create my experience <ArrowRight size={16} /></Button>
          )}
        </div>
      </div>
    </div>
  );
}
