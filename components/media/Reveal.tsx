import type { ReactNode } from "react";

/**
 * Subtle fade + 8px rise as the element enters the viewport.
 * CSS scroll-driven animation (see .reveal in globals.css): no JavaScript,
 * content stays visible in browsers without support and with reduced motion.
 */
export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}
