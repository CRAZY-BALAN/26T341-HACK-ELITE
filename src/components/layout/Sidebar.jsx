import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useProfile } from "../../context/ProfileContext";
import { NAV_LABELS } from "../../data/profiles";
import { Icon } from "../../utils/icons";
import AdaptiveMark from "../common/AdaptiveMark";

export default function Sidebar() {
  const { profile } = useProfile();
  const items = profile?.nav ?? ["dashboard", "assistant", "resources", "emergency", "profile"];

  return (
    <aside className="hidden md:flex md:w-[236px] shrink-0 flex-col border-r border-[var(--color-border)] bg-white h-screen sticky top-0 py-6 px-4">
      <div className="flex items-center gap-2.5 px-2 mb-8">
        <AdaptiveMark size={30} />
        <span className="font-display text-[19px] font-medium tracking-tight">Inclusa</span>
      </div>

      <nav className="flex flex-col gap-1" aria-label="Primary">
        {items.map((key) => {
          const meta = NAV_LABELS[key];
          if (!meta) return null;
          return (
            <NavLink
              key={key}
              to={key === "dashboard" ? "/dashboard" : `/${key}`}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14.5px] font-medium transition-colors ${
                  isActive ? "text-[var(--color-accent-900)]" : "text-[var(--color-ink-600)] hover:text-[var(--color-ink-900)] hover:bg-[var(--color-bg-soft)]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="sidebar-active"
                      className="absolute inset-0 rounded-xl bg-[var(--color-accent-100)]"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10"><Icon name={meta.icon} size={18} /></span>
                  <span className="relative z-10">{meta.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {profile && (
        <div className="mt-auto px-3 py-3 rounded-xl bg-[var(--color-bg-soft)] border border-[var(--color-border)]">
          <p className="text-[11px] uppercase tracking-wide text-[var(--color-ink-400)] font-semibold mb-1">Experience</p>
          <p className="text-[13.5px] font-medium text-[var(--color-ink-900)]">{profile.name}</p>
        </div>
      )}
    </aside>
  );
}
