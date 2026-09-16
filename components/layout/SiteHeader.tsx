"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { mainNav, secondaryNav } from "@/content/navigation";
import { Wordmark } from "./Wordmark";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) buttonRef.current?.focus();
  }, []);

  // Close on Escape, trap focus, lock scroll while the menu is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusables = () =>
      Array.from(menuRef.current?.querySelectorAll<HTMLElement>("a, button") ?? []);
    menuRef.current?.querySelector<HTMLElement>("nav a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab") {
        const list = focusables();
        if (!list.length) return;
        const first = list[0];
        const last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <header className="relative z-40 border-b border-line bg-ivory">
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-6 md:px-10 lg:h-24 xl:px-16">
        <Wordmark className="text-[1.25rem] lg:text-[1.625rem]" />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7 xl:gap-9">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`group relative flex flex-col items-center pt-4 pb-2 text-[0.9375rem] transition-colors ${active ? "font-medium text-navy" : "text-slate hover:text-navy"}`}
                  >
                    <span>{item.label}</span>
                    <span aria-hidden className={`mt-2 flex h-1.5 items-center transition-opacity duration-200 ${active ? "opacity-100" : "opacity-0 group-hover:opacity-60"}`}>
                      <span className="h-px w-3 bg-cyan" />
                      <span className="size-1.5 rounded-full bg-cyan" />
                      <span className="h-px w-3 bg-cyan" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          ref={buttonRef}
          type="button"
          className="flex min-h-11 items-center gap-2.5 px-1 font-mono text-xs tracking-[0.14em] text-navy uppercase lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span>Menu</span>
          <svg aria-hidden width="22" height="10" viewBox="0 0 22 10" fill="none" stroke="currentColor" strokeWidth="1.3">
            <path d="M0 1h22M8 9h14" />
          </svg>
        </button>
      </div>

      {/* Mobile / tablet menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!open}
        className="menu-panel fixed inset-0 z-50 overflow-y-auto bg-ivory lg:hidden"
      >
        <div aria-hidden className="absolute top-16 right-0 h-56 w-24 bg-mist" />
        <div className="relative flex h-16 items-center justify-between border-b border-line px-6 md:px-10">
          <span onClickCapture={() => close(false)}>
            <Wordmark className="text-[1.25rem]" />
          </span>
          <button
            type="button"
            onClick={() => close()}
            className="flex min-h-11 items-center gap-2.5 px-1 font-mono text-xs tracking-[0.14em] text-navy uppercase"
          >
            <span>Close</span>
            <svg aria-hidden width="22" height="10" viewBox="0 0 22 10" fill="none" stroke="currentColor" strokeWidth="1.3">
              <path d="m6 0 10 10M16 0 6 10" />
            </svg>
          </button>
        </div>
        <nav aria-label="Mobile" className="relative px-6 pt-8 pb-12 md:px-10">
          <ol className="border-t border-line">
            {mainNav.map((item, i) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href} className="border-b border-line">
                  <Link
                    href={item.href}
                    onClick={() => close(false)}
                    aria-current={active ? "page" : undefined}
                    className="flex min-h-14 items-baseline gap-5 py-3"
                  >
                    <span className={`w-6 font-mono text-xs ${active ? "text-link" : "text-slate"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-serif text-[1.75rem] leading-tight">{item.label}</span>
                    {active && <span aria-hidden className="ml-auto size-1.5 self-center rounded-full bg-cyan" />}
                  </Link>
                </li>
              );
            })}
          </ol>
          <ul className="mt-8 flex flex-col gap-1">
            {secondaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={() => close(false)} className="label flex min-h-11 items-center hover:text-navy">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
