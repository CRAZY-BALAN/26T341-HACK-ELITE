import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { PROFILES } from "../data/profiles";
import { useProfile } from "../context/ProfileContext";
import { Icon } from "../utils/icons";
import Button from "../components/common/Button";
import AmbientBackground from "../components/common/AmbientBackground";
import AdaptiveMark from "../components/common/AdaptiveMark";
import { fadeUp, fadeIn, staggerContainer } from "../animations/variants";

export default function Landing() {
  const navigate = useNavigate();
  const { selectProfile } = useProfile();
  const [loading, setLoading] = useState(true);
  const [picked, setPicked] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const handleContinue = () => {
    if (!picked) return;
    selectProfile(picked);
    navigate("/onboarding");
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AmbientBackground />

      <div className="relative max-w-5xl mx-auto px-6 pt-16 pb-28">
        <motion.div initial="hidden" animate="show" variants={fadeIn} className="flex items-center gap-2.5 mb-14">
          <AdaptiveMark size={30} />
          <span className="font-display text-[19px] font-medium tracking-tight">Inclusa</span>
        </motion.div>

        <motion.div initial="hidden" animate="show" variants={staggerContainer(0.08)} className="max-w-2xl mb-14">
          <motion.p variants={fadeUp} className="font-mono text-xs tracking-wide uppercase text-[var(--color-accent-700)] mb-4">
            Inclusive Design Challenge
          </motion.p>
          <motion.h1 variants={fadeUp} className="font-display text-[40px] sm:text-[52px] leading-[1.05] tracking-tight text-[var(--color-ink-900)] mb-5">
            Who are you designing <span className="text-gradient">this experience</span> for?
          </motion.h1>
          <motion.p variants={fadeUp} className="text-[17px] text-[var(--color-ink-600)] leading-relaxed">
            Inclusa doesn't just show different information — it changes the way it works, for you.
            Choose the experience closest to yours, and watch the whole interface adapt.
          </motion.p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="skeleton h-[168px] rounded-2xl" />
            ))}
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer(0.05)}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {PROFILES.map((p) => {
              const active = picked === p.id;
              return (
                <motion.button
                  key={p.id}
                  variants={fadeUp}
                  onClick={() => setPicked(p.id)}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                  aria-pressed={active}
                  className={`relative text-left rounded-2xl border p-5 flex flex-col gap-3 bg-white transition-colors ${
                    active ? "border-[var(--color-accent-500)] ring-2 ring-[var(--color-accent-200)]" : "border-[var(--color-border)] hover:border-[var(--color-accent-300)]"
                  }`}
                >
                  <div
                    className="h-11 w-11 rounded-xl flex items-center justify-center"
                    style={{ background: `hsl(${p.hue} 90% 94%)`, color: `hsl(${p.hue} 70% 32%)` }}
                  >
                    <Icon name={p.icon} size={20} />
                  </div>
                  <div>
                    <p className="font-display text-[16px] font-medium text-[var(--color-ink-900)]">{p.name}</p>
                    <p className="text-[13px] text-[var(--color-ink-400)] mb-1.5">{p.age}</p>
                    <p className="text-[13px] text-[var(--color-ink-600)] leading-snug">{p.benefit}</p>
                  </div>
                  <AnimatePresence>
                    {active && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute top-4 right-4 h-6 w-6 rounded-full bg-signature-gradient text-white flex items-center justify-center"
                      >
                        <Check size={14} strokeWidth={3} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </motion.div>
        )}

        <AnimatePresence>
          {picked && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
            >
              <Button size="lg" onClick={handleContinue}>
                Build my experience <ArrowRight size={18} />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
