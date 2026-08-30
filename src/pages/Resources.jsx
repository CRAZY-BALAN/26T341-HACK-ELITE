import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, MapPin, Star, Accessibility as AccessibilityIcon } from "lucide-react";
import { CATEGORIES, RESOURCES } from "../data/resources";
import EmptyState from "../components/common/EmptyState";
import { staggerContainer, fadeUp } from "../animations/variants";

export default function Resources() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [accessibleOnly, setAccessibleOnly] = useState(false);
  const [openNow, setOpenNow] = useState(false);

  const results = useMemo(() => {
    return RESOURCES.filter((r) => {
      if (category !== "All" && r.category !== category) return false;
      if (accessibleOnly && !r.accessible) return false;
      if (openNow && !r.open) return false;
      if (query && !r.name.toLowerCase().includes(query.toLowerCase()) && !r.category.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [query, category, accessibleOnly, openNow]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 rounded-2xl border border-[var(--color-border-strong)] bg-white px-4 py-2.5">
        <Search size={17} className="text-[var(--color-ink-400)]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search resources, categories…"
          className="flex-1 outline-none text-[14.5px] py-1.5 bg-transparent"
          aria-label="Search resources"
        />
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <FilterChip active={category === "All"} onClick={() => setCategory("All")}>All</FilterChip>
        {CATEGORIES.map((c) => (
          <FilterChip key={c} active={category === c} onClick={() => setCategory(c)}>{c}</FilterChip>
        ))}
      </div>
      <div className="flex items-center gap-2 text-[13px]">
        <SlidersHorizontal size={14} className="text-[var(--color-ink-400)]" />
        <ToggleChip active={accessibleOnly} onClick={() => setAccessibleOnly((v) => !v)}><AccessibilityIcon size={13} /> Accessible</ToggleChip>
        <ToggleChip active={openNow} onClick={() => setOpenNow((v) => !v)}>Open now</ToggleChip>
      </div>

      {/* Simulated map strip */}
      <div className="relative h-28 rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-soft)]">
        <div className="absolute inset-0 grain-surface opacity-60" />
        {results.slice(0, 6).map((r, i) => (
          <span
            key={r.id}
            className="absolute h-2.5 w-2.5 rounded-full bg-[var(--color-accent-600)] ring-4 ring-[var(--color-accent-100)]"
            style={{ left: `${10 + i * 15}%`, top: `${30 + (i % 3) * 18}%` }}
            title={r.name}
          />
        ))}
        <span className="absolute bottom-2 right-3 text-[11px] font-medium text-[var(--color-ink-400)]">Simulated map view</span>
      </div>

      {results.length === 0 ? (
        <EmptyState icon={MapPin} title="No resources match yet" message="Try a different category or clear your filters." />
      ) : (
        <motion.div initial="hidden" animate="show" variants={staggerContainer(0.05)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {results.map((r) => (
            <motion.div key={r.id} variants={fadeUp}>
              <Link
                to={`/resources/${r.id}`}
                className="block h-full rounded-2xl border border-[var(--color-border)] bg-white p-5 hover:border-[var(--color-accent-400)] hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-[var(--color-accent-700)] bg-[var(--color-accent-50)] px-2 py-0.5 rounded-full">
                    {r.category}
                  </span>
                  {r.accessible && <AccessibilityIcon size={15} className="text-[var(--color-ink-400)]" />}
                </div>
                <p className="font-display text-[16px] mb-1">{r.name}</p>
                <p className="text-[13px] text-[var(--color-ink-600)] mb-3 line-clamp-2">{r.description}</p>
                <div className="flex items-center gap-3 text-[12.5px] text-[var(--color-ink-400)]">
                  <span className="flex items-center gap-1"><MapPin size={12} /> {r.distance}</span>
                  <span className="flex items-center gap-1"><Star size={12} /> {r.rating}</span>
                  <span>{r.cost}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

function FilterChip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`text-[12.5px] font-medium px-3 py-1.5 rounded-full border transition-colors ${
        active ? "border-[var(--color-accent-500)] bg-[var(--color-accent-500)] text-white" : "border-[var(--color-border)] text-[var(--color-ink-600)] hover:border-[var(--color-accent-300)]"
      }`}
    >
      {children}
    </button>
  );
}

function ToggleChip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border font-medium transition-colors ${
        active ? "border-[var(--color-accent-500)] bg-[var(--color-accent-50)] text-[var(--color-accent-900)]" : "border-[var(--color-border)] text-[var(--color-ink-600)]"
      }`}
    >
      {children}
    </button>
  );
}
