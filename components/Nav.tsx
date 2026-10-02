"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m, useMotionValueEvent, useScroll, useReducedMotion } from "framer-motion";
import { bookingHref, nav, site } from "@/lib/content";
import { usePathname } from "next/navigation";
import { useGo } from "@/lib/useGo";
import Magnetic from "./Magnetic";

export default function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const goTo = useGo();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollY, "change", (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(v > 40);
    setHidden(!open && v > 400 && v > prev);
  });

  useEffect(() => {
    if (!open) return;
    document.documentElement.classList.add("is-locked");
    const first = menuRef.current?.querySelector<HTMLElement>("a");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && menuRef.current) {
        const items = Array.from(menuRef.current.querySelectorAll<HTMLElement>("a, button"));
        items.push(toggleRef.current!);
        const i = items.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && i <= 0) {
          e.preventDefault();
          items[items.length - 1].focus();
        } else if (!e.shiftKey && i === items.length - 1) {
          e.preventDefault();
          items[0].focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("is-locked");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const go = (href: string) => (e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    setOpen(false);
    // Let the overlay start closing before we move.
    goTo(href, open ? 350 : 0);
  };
  // Home and Contact both have the booking form; other pages link to Contact.
  const bookHref = pathname === "/" || pathname === "/contact" ? "#reserve" : bookingHref;
  const current = (href: string) => (href === pathname ? "page" : undefined);

  // Close the overlay whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <m.header
        className={`nav ${solid ? "nav--solid" : ""}`}
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <a href="/" className="nav__logo" onClick={go("/")} aria-label={`${site.name}, back to top`}>
          <svg viewBox="0 0 40 40" width="34" height="34" aria-hidden="true">
            <circle cx="20" cy="20" r="19" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M11 12h5.5l3.5 13 3.5-13H29l-6.5 17h-5z" fill="currentColor" />
          </svg>
          <span>{site.name}</span>
        </a>

        <nav aria-label="Primary" className="nav__links">
          <ul>
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} onClick={go(n.href)} className="nav__link" aria-current={current(n.href)}>
                  <span data-text={n.label}>{n.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav__cta">
          <Magnetic href={bookHref} variant="ghost">
            Book a table
          </Magnetic>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className={`nav__toggle ${open ? "is-open" : ""}`}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </m.header>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            ref={menuRef}
            className="menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reduce ? 0 : 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul>
              {[{ label: "Home", href: "/" }, ...nav, { label: "Book a table", href: bookHref }].map((n, i) => (
                <li key={n.href} className="menu__item">
                  <m.a
                    href={n.href}
                    onClick={go(n.href)}
                    aria-current={current(n.href)}
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "110%" }}
                    transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : 0.15 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {n.label}
                  </m.a>
                </li>
              ))}
            </ul>
            <m.div
              className="menu__meta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              exit={{ opacity: 0 }}
            >
              <p>{site.address.join(", ")}</p>
              <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}>{site.phone}</a>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
