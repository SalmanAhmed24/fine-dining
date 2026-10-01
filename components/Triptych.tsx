"use client";

import { useRef } from "react";
import Image from "next/image";
import { details } from "@/lib/content";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

const WORD = "Verdigris";

/**
 * Three image windows that share one giant word. Each window holds its own
 * copy of the word, offset so the three copies line up into one continuous
 * line. Scrolling slides the word through all three windows at once.
 */
export default function Triptych() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          ".trip__word-inner",
          { xPercent: 22 },
          {
            xPercent: -22,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.6 },
          }
        );
        gsap.utils.toArray<HTMLElement>(".trip__img").forEach((img, i) => {
          gsap.fromTo(
            img,
            { yPercent: -8, scale: 1.18 },
            {
              yPercent: 8,
              scale: 1.1,
              ease: "none",
              scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
            }
          );
          gsap.from(img.closest(".trip__card"), {
            clipPath: "inset(100% 0% 0% 0%)",
            duration: 1.4,
            delay: i * 0.12,
            ease: "expo.inOut",
            scrollTrigger: { trigger: root.current, start: "top 80%" },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="trip" aria-label="How we cook">
      <ul className="trip__grid">
        {details.map((d, i) => (
          <li key={d.src} className="trip__item" style={{ "--i": i } as React.CSSProperties}>
            <figure>
              <div className="trip__card">
                <Image
                  src={d.src}
                  alt={d.alt}
                  fill
                  sizes="(max-width: 700px) 33vw, 30vw"
                  quality={60}
                  className="cover trip__img"
                />
                <div className="trip__word" aria-hidden="true">
                  <span className="trip__word-inner">{WORD}</span>
                </div>
              </div>
              <figcaption>{d.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
