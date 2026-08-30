import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Settings2, Type, Contrast, Wand2 } from "lucide-react";
import { useProfile } from "../../context/ProfileContext";
import { useToast } from "../common/Toast";

const TITLES = {
  "/dashboard": "Home",
  "/assistant": "Ask Inclusa",
  "/resources": "Find Support",
  "/emergency": "Emergency",
  "/accessibility": "Accessibility Center",
  "/community": "Inclusive Community",
  "/profile": "My Profile",
  "/impact": "Impact",
  "/languages": "Languages",
  "/focus": "Focus Mode",
  "/voice": "Voice Navigation",
};

export default function Header() {
  const { pathname } = useLocation();
  const { a11y, updateA11y, name } = useProfile();
  const showToast = useToast();
  const [open, setOpen] = useState(false);

  const title = TITLES[pathname] || "Inclusa";

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-[var(--color-border)] px-5 md:px-8 py-3.5 flex items-center justify-between">
      <div>
        <p className="text-[11px] text-[var(--color-ink-400)] font-medium">Inclusa / {title}</p>
        <h1 className="font-display text-[19px] leading-tight">{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => showToast("You're all caught up — no new notifications.")}
          className="h-9 w-9 rounded-full flex items-center justify-center text-[var(--color-ink-600)] hover:bg-[var(--color-bg-soft)]"
          aria-label="Notifications"
        >
          <Bell size={18} />
        </button>

        <div className="relative">
          <button
            onClick={() => setOpen((o) => !o)}
            className="h-9 w-9 rounded-full flex items-center justify-center text-[var(--color-ink-600)] hover:bg-[var(--color-bg-soft)]"
            aria-label="Quick accessibility controls"
            aria-expanded={open}
          >
            <Settings2 size={18} />
          </button>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                transition={{ duration: 0.16 }}
                className="absolute right-0 mt-2 w-64 bg-white border border-[var(--color-border)] rounded-2xl shadow-xl p-3 space-y-2"
              >
                <QuickRow icon={Type} label="Larger text" active={a11y.fontScale >= 115}
                  onClick={() => updateA11y({ fontScale: a11y.fontScale >= 115 ? 100 : 120 })} />
                <QuickRow icon={Contrast} label="High contrast" active={a11y.highContrast}
                  onClick={() => updateA11y({ highContrast: !a11y.highContrast })} />
                <QuickRow icon={Wand2} label="Reduce motion" active={a11y.reduceMotion}
                  onClick={() => updateA11y({ reduceMotion: !a11y.reduceMotion })} />
                <Link to="/accessibility" className="block text-center text-[13px] font-medium text-[var(--color-accent-700)] pt-1">
                  Open full accessibility center →
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Link
          to="/profile"
          className="h-9 w-9 rounded-full bg-signature-gradient text-white flex items-center justify-center text-[13px] font-semibold"
          aria-label="My profile"
        >
          {name?.[0]?.toUpperCase() || "A"}
        </Link>
      </div>
    </header>
  );
}

function QuickRow({ icon: Icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-[13.5px] font-medium ${
        active ? "bg-[var(--color-accent-100)] text-[var(--color-accent-900)]" : "hover:bg-[var(--color-bg-soft)] text-[var(--color-ink-700)]"
      }`}
    >
      <span className="flex items-center gap-2"><Icon size={16} /> {label}</span>
      <span className={`h-2 w-2 rounded-full ${active ? "bg-[var(--color-accent-600)]" : "bg-[var(--color-border-strong)]"}`} />
    </button>
  );
}
