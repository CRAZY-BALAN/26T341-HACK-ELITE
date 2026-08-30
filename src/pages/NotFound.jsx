import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 text-center">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <p className="font-display text-[64px] text-gradient leading-none mb-2">404</p>
        <p className="font-display text-[20px] mb-2">This page didn't come along.</p>
        <p className="text-[14px] text-[var(--color-ink-600)] mb-6 max-w-sm mx-auto">
          The page you're looking for isn't part of this experience yet.
        </p>
        <Button as="link" to="/">Back to Inclusa</Button>
      </motion.div>
    </div>
  );
}
