"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, m, useMotionValue, useSpring } from "framer-motion";
import { fullMenu, site, tasting } from "@/lib/content";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

/**
 * The full tasting menu as a typographic list. On desktop, hovering a course
 * floats its photo beside the pointer (Framer Motion springs).
 */
export default function MenuList() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [hoverable, setHoverable] = useState(false);
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 28, mass: 0.6 });
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 28, mass: 0.6 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 900px) and (prefers-reduced-motion: no-preference)");
    const update = () => setHoverable(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(".menu-row", { autoAlpha: 0, y: 40 }, {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ".menu-list__rows", start: "top 80%" },
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!hoverable) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  const current = active !== null ? fullMenu[active] : null;

  return (
    <section ref={root} className="menu-list section" id="menu" aria-labelledby="menu-title">
      <div className="menu-list__head">
        <h2 id="menu-title" className="section-title">Tonight&rsquo;s seven courses</h2>
        <p>
          {site.currency}
          {tasting.price} per guest · wine pairing {site.currency}
          {tasting.wine}. Two courses stay a surprise until they reach the table.
        </p>
      </div>

      <div className="menu-list__wrap" onPointerMove={onMove} onPointerLeave={() => setActive(null)}>
      <ol className="menu-list__rows">
        {fullMenu.map((c, i) => (
          <li
            key={c.name}
            className={`menu-row ${c.surprise ? "menu-row--surprise" : ""} ${active === i ? "is-active" : ""}`}
            onPointerEnter={() => setActive(i)}
          >
            <span className="menu-row__num" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="menu-row__main">
              <h3 className="menu-row__name">{c.surprise ? "Kept a surprise" : c.name}</h3>
              <p className="menu-row__note">{c.surprise ? "Ask us, or simply wait and see." : c.note}</p>
            </div>
            <p className="menu-row__wine">
              <span className="sr-only">Wine pairing: </span>
              {c.wine}
            </p>
          </li>
        ))}
      </ol>

        {hoverable && (
          <m.div className="menu-preview" style={{ x, y }} aria-hidden="true">
            <AnimatePresence mode="popLayout">
              {current?.src && (
                <m.div
                  key={current.src}
                  className="menu-preview__card"
                  initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotate: 3 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image src={current.src} alt="" fill sizes="280px" quality={85} className="cover" />
                </m.div>
              )}
            </AnimatePresence>
          </m.div>
        )}
      </div>
    </section>
  );
}
