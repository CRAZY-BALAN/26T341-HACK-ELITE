import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const base = "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors focus-visible:outline-2 disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  primary: "text-white shadow-sm bg-signature-gradient hover:brightness-105",
  secondary: "bg-white text-[var(--color-ink-900)] border border-[var(--color-border-strong)] hover:bg-[var(--color-accent-50)]",
  ghost: "text-[var(--color-ink-700)] hover:bg-[var(--color-accent-50)]",
  danger: "text-white bg-[var(--color-error)] hover:brightness-105",
};

const sizes = {
  sm: "text-sm px-3.5 py-2",
  md: "text-[15px] px-5 py-2.5",
  lg: "text-base px-7 py-3.5",
};

export default function Button({ as = "button", to, variant = "primary", size = "md", className = "", children, ...props }) {
  const cls = `${base} ${variants[variant] ?? variants.primary} ${sizes[size] ?? sizes.md} ${className}`;
  const MotionComp = as === "link" ? motion(Link) : motion.button;
  const extra = as === "link" ? { to } : {};
  return (
    <MotionComp
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
      className={cls}
      {...extra}
      {...props}
    >
      {children}
    </MotionComp>
  );
}
