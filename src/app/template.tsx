"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Re-mounts on every navigation, giving each route a soft fade-in.
 * Opacity only: a transform or filter here would become the containing block for the
 * fixed header and break the sticky hero.
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
