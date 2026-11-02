"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  x?: number;
  blur?: number;
  duration?: number;
};

/** Blur-to-sharp entrance used for headings, cards and the CTA band (as seen in the reference). */
export function Reveal({
  delay = 0,
  y = 24,
  x = 0,
  blur = 12,
  duration = 0.9,
  children,
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y, x, filter: `blur(${blur}px)` }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export { EASE };
