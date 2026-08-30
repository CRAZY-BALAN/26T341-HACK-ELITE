import { NavLink } from "react-router-dom";
import { useProfile } from "../../context/ProfileContext";
import { NAV_LABELS } from "../../data/profiles";
import { Icon } from "../../utils/icons";

export default function MobileNav() {
  const { profile } = useProfile();
  const items = (profile?.nav ?? ["dashboard", "assistant", "resources", "emergency", "profile"]).slice(0, 5);

  return (
    <nav
      aria-label="Primary"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[var(--color-border)] px-2 py-2 flex items-center justify-between"
    >
      {items.map((key) => {
        const meta = NAV_LABELS[key];
        if (!meta) return null;
        return (
          <NavLink
            key={key}
            to={key === "dashboard" ? "/dashboard" : `/${key}`}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg flex-1 text-[11px] font-medium ${
                isActive ? "text-[var(--color-accent-700)]" : "text-[var(--color-ink-400)]"
              }`
            }
          >
            <Icon name={meta.icon} size={20} />
            {meta.label}
          </NavLink>
        );
      })}
    </nav>
  );
}
