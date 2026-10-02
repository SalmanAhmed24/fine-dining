"use client";

import { useRef } from "react";
import { getImageProps } from "next/image";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import SplitChars from "./SplitChars";
import Magnetic from "./Magnetic";

const HERO_ALT = "Beef tenderloin with pomme purée and red wine on a table in the dining room";

const {
  props: { srcSet: wide },
} = getImageProps({ src: "/images/hero.jpg", alt: HERO_ALT, width: 3840, height: 1350, quality: 85, sizes: "100vw" });
const { props: tall } = getImageProps({
  src: "/images/hero-mobile.jpg",
  alt: HERO_ALT,
  width: 1114,
  height: 1980,
  quality: 85,
  sizes: "100vw",
});

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
          {/* Art direction: a portrait crop for tall screens so the photo is
              never stretched past its real resolution on phones. */}
          <picture>
            <source media="(min-aspect-ratio: 4/5)" srcSet={wide} sizes="100vw" />
            <img {...tall} alt={HERO_ALT} className="hero__img" fetchPriority="high" loading="eager" decoding="async" />
          </picture>
        </div>
        <div className="hero__scrim" aria-hidden="true" />
      </div>

      <div className="hero__content">
        <h1 id="hero-title" className="hero__title" aria-label="Slow embers">
          <SplitChars text="Slow" className="hero__line hero__line--1" />
          <SplitChars text="Embers" className="hero__line hero__line--2" />
        </h1>
        <div className="hero__aside">
          <p>A 24-seat tasting room. Meat and seafood are cooked over oak, and every plate is finished by hand.</p>
          <Magnetic href="#reserve" variant="solid">
            Book a table
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
