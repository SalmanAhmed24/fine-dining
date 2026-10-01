"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

const TEXT =
  "Lit at noon, fed with oak until close, and finished in copper pans that have been on this hearth since the day we opened.";

export default function Statement() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          ".statement__word",
          { color: "#6b7d73" },
          {
            color: "#ece6da",
            stagger: 0.1,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top 75%", end: "bottom 45%", scrub: true },
          }
        );
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="statement section" aria-label="Our hearth">
      <p className="statement__text">
        <span className="sr-only">{TEXT}</span>
        {TEXT.split(" ").map((w, i) => (
          <span key={i} className="statement__word" aria-hidden="true">
            {w}{" "}
          </span>
        ))}
      </p>
    </section>
  );
}
