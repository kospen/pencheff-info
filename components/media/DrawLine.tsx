"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties } from "react";

/** Horizontal line that draws from left to right once (research stages). */
export function DrawLine({ className = "", style }: { className?: string; style?: CSSProperties }) {
  const reduce = useReducedMotion();
  if (reduce) return <span aria-hidden className={className} style={style} />;
  return (
    <motion.span
      aria-hidden
      className={`origin-left ${className}`}
      style={style}
      initial={{ scaleX: 0.001 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}
