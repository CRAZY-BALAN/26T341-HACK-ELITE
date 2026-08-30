import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useProfile } from "../context/ProfileContext";
import { WIDGETS } from "../data/widgetContent";
import { ActionsWidget, ListWidget, StatusWidget } from "../components/dashboard/Widgets";
import { DashboardSkeleton } from "../components/common/Skeleton";
import { staggerContainer, fadeUp } from "../animations/variants";

export default function Dashboard() {
  const { profile, onboarded, name, a11y } = useProfile();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 550);
    return () => clearTimeout(t);
  }, [profile?.id]);

  if (!profile) return <Navigate to="/" replace />;
  if (!onboarded) return <Navigate to="/onboarding" replace />;

  const widgetKeys = profile.widgets.filter((k) => k !== "greeting");
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <motion.div initial="hidden" animate="show" variants={staggerContainer(0.07)} className="space-y-6">
      <motion.div variants={fadeUp}>
        <p className="font-display text-[26px] leading-tight">{greeting}, {name}.</p>
        <p className="text-[var(--color-ink-600)] text-[14.5px] mt-1">
          Here are the services that can help you today, arranged for the {profile.name.toLowerCase()} experience.
        </p>
        {a11y.lowData && (
          <span className="inline-block mt-3 text-[12px] font-semibold text-[var(--color-accent-700)] bg-[var(--color-accent-50)] px-2.5 py-1 rounded-full">
            Low-data mode is on — visuals simplified
          </span>
        )}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {widgetKeys.map((key) => {
          const w = WIDGETS[key];
          if (!w) return null;
          if (w.type === "actions") return <div key={key} className="md:col-span-2"><ActionsWidget {...w} /></div>;
          if (w.type === "list") return <ListWidget key={key} {...w} />;
          if (w.type === "status") return <StatusWidget key={key} {...w} />;
          return null;
        })}
      </div>
    </motion.div>
  );
}
