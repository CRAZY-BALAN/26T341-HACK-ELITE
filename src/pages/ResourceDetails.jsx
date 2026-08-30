import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Clock, Phone, Star, Languages, Accessibility as AccessibilityIcon } from "lucide-react";
import { RESOURCES } from "../data/resources";
import Button from "../components/common/Button";
import { useToast } from "../components/common/Toast";
import { fadeUp, staggerContainer } from "../animations/variants";

export default function ResourceDetails() {
  const { id } = useParams();
  const resource = RESOURCES.find((r) => r.id === id);
  const showToast = useToast();

  if (!resource) return <Navigate to="/resources" replace />;

  return (
    <motion.div initial="hidden" animate="show" variants={staggerContainer(0.06)} className="max-w-2xl mx-auto space-y-6">
      <motion.div variants={fadeUp}>
        <Link to="/resources" className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-[var(--color-ink-500)] hover:text-[var(--color-ink-900)] mb-4">
          <ArrowLeft size={15} /> Back to Find Support
        </Link>
        <span className="text-[11px] font-semibold uppercase tracking-wide text-[var(--color-accent-700)] bg-[var(--color-accent-50)] px-2 py-0.5 rounded-full">{resource.category}</span>
        <h1 className="font-display text-[28px] mt-2 mb-2">{resource.name}</h1>
        <p className="text-[15px] text-[var(--color-ink-600)] leading-relaxed">{resource.description}</p>
      </motion.div>

      <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3">
        <InfoRow icon={MapPin} label="Distance" value={resource.distance} />
        <InfoRow icon={Clock} label="Hours" value={resource.hours} />
        <InfoRow icon={Phone} label="Contact" value={resource.contact} />
        <InfoRow icon={Star} label="Rating" value={`${resource.rating} / 5`} />
        <InfoRow icon={Languages} label="Languages" value={resource.languages.join(", ")} />
        <InfoRow icon={AccessibilityIcon} label="Accessibility" value={resource.accessible ? "Wheelchair accessible" : "Limited accessibility"} />
      </motion.div>

      <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
        <Button onClick={() => showToast("Resource saved.")} variant="primary">Save</Button>
        <Button onClick={() => showToast("Directions opened.")} variant="secondary">Directions</Button>
        <Button onClick={() => showToast(`Calling ${resource.contact}…`)} variant="secondary">Call</Button>
        <Button onClick={() => showToast("Link copied to share.")} variant="ghost">Share</Button>
      </motion.div>
    </motion.div>
  );
}

function InfoRow({ icon: Ico, label, value }) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] p-3.5 bg-white">
      <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-[var(--color-ink-400)] mb-1">
        <Ico size={12} /> {label}
      </p>
      <p className="text-[14px] font-medium text-[var(--color-ink-900)]">{value}</p>
    </div>
  );
}
