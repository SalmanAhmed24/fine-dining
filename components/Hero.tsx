"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import SplitChars from "./SplitChars";
import Magnetic from "./Magnetic";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.fromTo(".hero__media", { scale: 1.18 }, { scale: 1, duration: 2.4 }, 0)
          .fromTo(".hero__title .split-char", { y: 0, yPercent: 105 }, { yPercent: 0, duration: 1.4, stagger: 0.045 }, 0.15);

        // Scroll: image drifts slower than the page, title lifts and thins out.
        gsap.to(".hero__media-inner", {
          yPercent: 18,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(".hero__title", {
          yPercent: -35,
          autoAlpha: 0.15,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__media">
        <div className="hero__media-inner">
          <Image
            src="/images/hero.jpg"
            alt="Copper pans and plated dishes on a dark stone table"
            fill
            priority
            fetchPriority="high"
            quality={75}
            sizes="100vw"
            className="cover"
          />
        </div>
        <div className="hero__scrim" aria-hidden="true" />
      </div>

      <div className="hero__content">
        <h1 id="hero-title" className="hero__title" aria-label="Slow embers">
          <SplitChars text="Slow" className="hero__line hero__line--1" />
          <SplitChars text="Embers" className="hero__line hero__line--2" />
        </h1>
        <div className="hero__aside">
          <p>A 24-seat tasting room. Every course is cooked over oak and finished in copper.</p>
          <Magnetic href="#reserve" variant="solid">
            Book a table
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
