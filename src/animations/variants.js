export const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

export const staggerContainer = (stagger = 0.08, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

export const cardHover = {
  rest: { y: 0, boxShadow: "0 1px 2px rgba(27,21,8,0.06)" },
  hover: { y: -6, boxShadow: "0 20px 40px -18px rgba(178,86,10,0.35)", transition: { duration: 0.25, ease: "easeOut" } },
};

export const pageTransition = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25, ease: "easeIn" } },
};
