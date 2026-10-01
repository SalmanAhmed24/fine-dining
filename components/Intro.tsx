"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import Magnetic from "./Magnetic";

export default function Intro() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(".intro__title .reveal-line > span", {
          yPercent: 110,
          duration: 1.3,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        });
        gsap.from(".intro__body > *", {
          autoAlpha: 0,
          y: 20,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".intro__body", start: "top 85%" },
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="intro section" id="menu" aria-labelledby="intro-title">
      <h2 id="intro-title" className="intro__title">
        <span className="reveal-line">
          <span>The autumn menu</span>
        </span>
        <span className="reveal-line intro__sub">
          <span>seven courses, one fire, no shortcuts.</span>
        </span>
      </h2>
      <div className="intro__body">
        <p>
          We light the hearth at noon and cook until the last table leaves. Vegetables come from two farms
          within an hour of the kitchen, meat is aged in-house, and the menu changes when the produce does —
          usually every five or six weeks.
        </p>
        <Magnetic href="#courses" variant="ghost">
          See the courses
        </Magnetic>
      </div>
    </section>
  );
}
