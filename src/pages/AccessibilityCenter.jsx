import { motion } from "framer-motion";
import { Type, Contrast, Wand2, Mic, Captions, BookOpenText, KeyRound } from "lucide-react";
import { useProfile } from "../context/ProfileContext";
import { useToast } from "../components/common/Toast";
import { staggerContainer, fadeUp } from "../animations/variants";

export default function AccessibilityCenter() {
  const { a11y, updateA11y } = useProfile();
  const showToast = useToast();

  const set = (patch, msg) => { updateA11y(patch); showToast(msg); };

  return (
    <motion.div initial="hidden" animate="show" variants={staggerContainer(0.06)} className="max-w-2xl mx-auto space-y-6">
      <motion.div variants={fadeUp}>
        <p className="text-[13.5px] text-[var(--color-ink-600)]">Changes apply immediately across all of Inclusa.</p>
      </motion.div>

      <motion.div variants={fadeUp} className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
        <p className="flex items-center gap-2 font-display text-[16px] mb-4"><Type size={17} /> Text size</p>
        <div className="flex items-center gap-3">
          {[100, 112, 124].map((v) => (
            <button
              key={v}
              onClick={() => set({ fontScale: v }, "Text size updated.")}
              className={`px-4 py-2 rounded-xl border font-medium text-[13.5px] ${a11y.fontScale === v ? "border-[var(--color-accent-500)] bg-[var(--color-accent-50)] text-[var(--color-accent-900)]" : "border-[var(--color-border)]"}`}
            >
              {v === 100 ? "Default" : v === 112 ? "Large" : "Extra large"}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="rounded-2xl border border-[var(--color-border)] bg-white p-5 space-y-4">
        <ToggleRow icon={Contrast} title="High contrast" desc="Increases text and border contrast across the app." active={a11y.highContrast} onClick={() => set({ highContrast: !a11y.highContrast }, "Contrast updated.")} />
        <ToggleRow icon={Wand2} title="Reduced motion" desc="Turns off non-essential animation everywhere." active={a11y.reduceMotion} onClick={() => set({ reduceMotion: !a11y.reduceMotion }, "Motion preference updated.")} />
        <ToggleRow icon={Mic} title="Voice assistance" desc="Enables spoken responses from the AI assistant." active={a11y.voiceAssist} onClick={() => set({ voiceAssist: !a11y.voiceAssist }, "Voice assistance updated.")} />
        <ToggleRow icon={Captions} title="Captions" desc="Shows captions on any audio or call content." active={a11y.captions} onClick={() => set({ captions: !a11y.captions }, "Captions updated.")} />
        <ToggleRow icon={BookOpenText} title="Simplified language" desc="Rewrites longer content in plainer language." active={a11y.simplified} onClick={() => set({ simplified: !a11y.simplified }, "Language style updated.")} />
        <ToggleRow icon={KeyRound} title="Low-data mode" desc="Reduces images and background animation to save data." active={a11y.lowData} onClick={() => set({ lowData: !a11y.lowData }, "Data usage updated.")} />
      </motion.div>
    </motion.div>
  );
}

function ToggleRow({ icon: Ico, title, desc, active, onClick }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-start gap-3">
        <span className="h-8 w-8 rounded-lg bg-[var(--color-accent-100)] text-[var(--color-accent-700)] flex items-center justify-center shrink-0 mt-0.5">
          <Ico size={16} />
        </span>
        <div>
          <p className="text-[14px] font-semibold text-[var(--color-ink-900)]">{title}</p>
          <p className="text-[12.5px] text-[var(--color-ink-400)]">{desc}</p>
        </div>
      </div>
      <button
        onClick={onClick}
        role="switch"
        aria-checked={active}
        aria-label={title}
        className={`relative h-6 w-11 rounded-full transition-colors shrink-0 ${active ? "bg-[var(--color-accent-600)]" : "bg-[var(--color-border-strong)]"}`}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 32 }}
          className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow"
          style={{ left: active ? 22 : 2 }}
        />
      </button>
    </div>
  );
}
