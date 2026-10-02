"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import Magnetic from "./Magnetic";

export default function CtaBand({
  title = "Come and sit by the fire",
  text = "Tables are released 60 days ahead. The counter opens 30 days ahead.",
  href = "/contact#reserve",
  label = "Book a table",
}: { title?: string; text?: string; href?: string; label?: string }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(".cta__title .reveal-line > span", {
          yPercent: 110,
          duration: 1.3,
          ease: "expo.out",
          scrollTrigger: { trigger: root.current, start: "top 80%" },
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="cta" aria-labelledby="cta-title">
      <h2 id="cta-title" className="cta__title">
        <span className="reveal-line">
          <span>{title}</span>
        </span>
      </h2>
      <p>{text}</p>
      <Magnetic href={href} variant="solid">
        {label}
      </Magnetic>
    </section>
  );
}
