import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Icon } from "../../utils/icons";
import { useToast } from "../common/Toast";
import { fadeUp } from "../../animations/variants";

export function ActionsWidget({ title, items, large }) {
  return (
    <motion.div variants={fadeUp} className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
      <p className="font-display text-[16px] mb-4">{title}</p>
      <div className={`grid gap-3 ${large ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-4"}`}>
        {items.map((it) => (
          <Link
            key={it.label}
            to={it.to}
            className={`flex flex-col items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-accent-400)] hover:bg-[var(--color-accent-50)] transition-colors text-center ${large ? "py-6" : "py-4"}`}
          >
            <span className="h-9 w-9 rounded-full bg-[var(--color-accent-100)] text-[var(--color-accent-700)] flex items-center justify-center">
              <Icon name={it.icon} size={large ? 20 : 17} />
            </span>
            <span className={`font-medium ${large ? "text-[15px]" : "text-[13px]"}`}>{it.label}</span>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

export function ListWidget({ title, icon, items }) {
  return (
    <motion.div variants={fadeUp} className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="h-8 w-8 rounded-lg bg-[var(--color-accent-100)] text-[var(--color-accent-700)] flex items-center justify-center">
          <Icon name={icon} size={16} />
        </span>
        <p className="font-display text-[16px]">{title}</p>
      </div>
      <ul className="space-y-3">
        {items.map((it) => (
          <li key={it.primary} className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[14px] font-medium text-[var(--color-ink-900)] truncate">{it.primary}</p>
              <p className="text-[12.5px] text-[var(--color-ink-400)]">{it.secondary}</p>
            </div>
            {it.tag && (
              <span className="shrink-0 text-[12px] font-semibold text-[var(--color-accent-700)] bg-[var(--color-accent-50)] px-2.5 py-1 rounded-full">
                {it.tag}
              </span>
            )}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function StatusWidget({ title, icon, description, cta }) {
  const showToast = useToast();
  return (
    <motion.div variants={fadeUp} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-soft)] p-5">
      <div className="flex items-center gap-2 mb-2">
        <span className="h-8 w-8 rounded-lg bg-white text-[var(--color-accent-700)] flex items-center justify-center border border-[var(--color-border)]">
          <Icon name={icon} size={16} />
        </span>
        <p className="font-display text-[16px]">{title}</p>
      </div>
      <p className="text-[13.5px] text-[var(--color-ink-600)] mb-4 leading-relaxed">{description}</p>
      <button
        onClick={() => showToast(`${title} updated.`)}
        className="text-[13.5px] font-semibold text-[var(--color-accent-700)] hover:underline"
      >
        {cta} →
      </button>
    </motion.div>
  );
}
