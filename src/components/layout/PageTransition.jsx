import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { pageTransition } from "../../animations/variants";

export default function PageTransition({ children }) {
  const { pathname } = useLocation();
  return (
    <motion.div
      key={pathname}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      {children}
    </motion.div>
  );
}
