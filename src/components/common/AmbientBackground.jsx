import { motion } from "framer-motion";
import { useProfile } from "../../context/ProfileContext";

export default function AmbientBackground() {
  const { a11y } = useProfile();
  const animate = !a11y.reduceMotion;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full blur-[90px] opacity-[0.28] bg-signature-gradient"
        animate={animate ? { x: [0, 40, 0], y: [0, 30, 0] } : {}}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-32 h-[380px] w-[380px] rounded-full blur-[100px] opacity-[0.22] bg-signature-gradient"
        animate={animate ? { x: [0, -30, 0], y: [0, -20, 0] } : {}}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 grain-surface opacity-[0.5]" />
    </div>
  );
}
