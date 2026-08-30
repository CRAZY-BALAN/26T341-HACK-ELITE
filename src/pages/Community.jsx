import { useState } from "react";
import { motion } from "framer-motion";
import { ThumbsUp, MessageCircle, Share2 } from "lucide-react";
import { COMMUNITY_POSTS } from "../data/community";
import { useToast } from "../components/common/Toast";
import { staggerContainer, fadeUp } from "../animations/variants";

export default function Community() {
  const [helped, setHelped] = useState(new Set());
  const showToast = useToast();

  const toggleHelpful = (id) => {
    setHelped((s) => {
      const next = new Set(s);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <motion.div initial="hidden" animate="show" variants={staggerContainer(0.06)} className="max-w-2xl mx-auto space-y-4">
      {COMMUNITY_POSTS.map((p) => (
        <motion.div key={p.id} variants={fadeUp} className="rounded-2xl border border-[var(--color-border)] bg-white p-5">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-9 w-9 rounded-full bg-signature-gradient text-white flex items-center justify-center text-[13px] font-semibold">
              {p.name[0]}
            </span>
            <div className="min-w-0">
              <p className="text-[14px] font-semibold leading-tight">{p.name}</p>
              <p className="text-[12px] text-[var(--color-ink-400)]">{p.category} · {p.time}</p>
            </div>
          </div>
          <p className="text-[14.5px] text-[var(--color-ink-700)] leading-relaxed mb-4">{p.text}</p>
          <div className="flex items-center gap-5 text-[13px] font-medium text-[var(--color-ink-500)]">
            <button
              onClick={() => toggleHelpful(p.id)}
              className={`flex items-center gap-1.5 ${helped.has(p.id) ? "text-[var(--color-accent-700)]" : ""}`}
            >
              <ThumbsUp size={15} /> Helpful ({p.helpful + (helped.has(p.id) ? 1 : 0)})
            </button>
            <button onClick={() => showToast("Reply box opened.")} className="flex items-center gap-1.5"><MessageCircle size={15} /> {p.replies} replies</button>
            <button onClick={() => showToast("Link copied to share.")} className="flex items-center gap-1.5"><Share2 size={15} /> Share</button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
