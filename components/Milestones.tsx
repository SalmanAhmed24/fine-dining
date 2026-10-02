"use client";

import { useRef } from "react";
import { about } from "@/lib/content";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

export default function Milestones() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>(".mile").forEach((row) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: "top 85%" } });
          tl.fromTo(row.querySelector(".mile__rule"), { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "expo.inOut" })
            .from(row.querySelector(".mile__year > span"), { yPercent: 110, duration: 1, ease: "expo.out" }, 0.3)
            .from(row.querySelector(".mile__text"), { autoAlpha: 0, x: 20, duration: 0.9, ease: "power3.out" }, 0.45);
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="miles section" aria-labelledby="miles-title">
      <h2 id="miles-title" className="section-title">Ten years at the hearth</h2>
      <ol className="miles__list">
        {about.milestones.map((m) => (
          <li key={m.year} className="mile">
            <span className="mile__rule" aria-hidden="true" />
            <span className="mile__year">
              <span>{m.year}</span>
            </span>
            <p className="mile__text">{m.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
