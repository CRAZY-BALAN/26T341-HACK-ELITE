import { useState } from "react";
import { motion } from "framer-motion";
import { Mic } from "lucide-react";
import { useToast } from "../components/common/Toast";
import { fadeUp, staggerContainer } from "../animations/variants";

export default function VoiceNav() {
  const [listening, setListening] = useState(false);
  const showToast = useToast();

  return (
    <motion.div initial="hidden" animate="show" variants={staggerContainer(0.06)} className="max-w-md mx-auto text-center py-10 space-y-6">
      <motion.p variants={fadeUp} className="text-[14px] text-[var(--color-ink-600)]">
        Say a page name, or "read this page", any time.
      </motion.p>
      <motion.button
        variants={fadeUp}
        onClick={() => { setListening((l) => !l); showToast(listening ? "Voice navigation stopped." : "Listening…"); }}
        animate={listening ? { scale: [1, 1.06, 1] } : { scale: 1 }}
        transition={{ duration: 1.2, repeat: listening ? Infinity : 0 }}
        className={`mx-auto h-28 w-28 rounded-full flex items-center justify-center text-white ${listening ? "bg-[var(--color-error)]" : "bg-signature-gradient"}`}
      >
        <Mic size={34} />
      </motion.button>
      <motion.p variants={fadeUp} className="text-[13px] font-medium text-[var(--color-ink-500)]">
        {listening ? "Listening — tap to stop" : "Tap to start voice navigation"}
      </motion.p>
    </motion.div>
  );
}
