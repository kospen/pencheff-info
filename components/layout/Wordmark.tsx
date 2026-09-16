import Link from "next/link";
import { site } from "@/content/site";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${site.domain} — home`}
      className={`inline-flex items-baseline font-serif font-medium tracking-[0.01em] text-navy ${className}`}
    >
      <span>{site.wordmark.primary}</span>
      {/* Logotype: signature cyan (logotypes are exempt from WCAG text contrast) */}
      <span className="text-cyan">{site.wordmark.accent}</span>
    </Link>
  );
}
