import { motion } from "framer-motion";
import { useProfile } from "../../context/ProfileContext";

// The mark is three arcs. Their stroke weight, gap, and rotation speed are
// literally driven by the current accessibility profile — the logo IS the
// adaptive engine made visible, not a static badge next to it.
export default function AdaptiveMark({ size = 34 }) {
  const { profile, a11y } = useProfile();
  const strokeBase = a11y.fontScale >= 115 ? 5.5 : 3.5;
  const spin = !a11y.reduceMotion;
  const hue = profile ? profile.hue : 28;

  return (
    <div style={{ width: size, height: size }} aria-hidden="true">
      <motion.svg
        viewBox="0 0 48 48"
        width={size}
        height={size}
        animate={spin ? { rotate: 360 } : { rotate: 0 }}
        transition={spin ? { duration: 22, repeat: Infinity, ease: "linear" } : { duration: 0 }}
      >
        <circle cx="24" cy="24" r="20" fill="none" stroke={`hsl(${hue} 92% 90%)`} strokeWidth={strokeBase} />
        <circle
          cx="24" cy="24" r="20" fill="none"
          stroke={`hsl(${hue} 88% 55%)`}
          strokeWidth={strokeBase}
          strokeDasharray="58 68"
          strokeLinecap="round"
        />
        <circle
          cx="24" cy="24" r="13" fill="none"
          stroke={`hsl(${hue + 14} 90% 45%)`}
          strokeWidth={strokeBase - 1}
          strokeDasharray="28 24"
          strokeLinecap="round"
        />
      </motion.svg>
    </div>
  );
}
