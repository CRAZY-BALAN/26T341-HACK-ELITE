import { motion } from "framer-motion";

export default function EmptyState({ icon: Icon, title, message, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center text-center gap-3 py-16 px-6 rounded-2xl border border-dashed border-[var(--color-border-strong)] bg-[var(--color-bg-soft)]"
    >
      {Icon && (
        <div className="h-12 w-12 rounded-full bg-[var(--color-accent-100)] flex items-center justify-center text-[var(--color-accent-700)]">
          <Icon size={22} />
        </div>
      )}
      <h3 className="font-display text-lg font-medium text-[var(--color-ink-900)]">{title}</h3>
      <p className="text-sm text-[var(--color-ink-600)] max-w-sm">{message}</p>
      {action}
    </motion.div>
  );
}
