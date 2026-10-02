"use client";

import { useRef } from "react";
import Image from "next/image";
import { courses } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";

export default function Courses() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // Desktop: pin the section and turn vertical scroll into horizontal travel.
      // Mobile and reduced motion keep a native swipeable row instead.
      mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - el.clientWidth;
        const tween = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        gsap.to(".courses__progress-bar", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: true,
          },
        });
        gsap.utils.toArray<HTMLElement>(".course__img").forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -5 },
            {
              xPercent: 5,
              ease: "none",
              scrollTrigger: {
                trigger: img.closest(".course"),
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="courses" id="courses" aria-labelledby="courses-title">
      <div className="courses__head">
        <h2 id="courses-title" className="courses__title">Five of the seven courses</h2>
        <p>The other two stay a surprise. The order below is the order they reach the table.</p>
      </div>

      <ol ref={track} className="courses__track" data-cursor="drag" tabIndex={0} aria-label="Courses, in serving order">
        {courses.map((c, i) => (
          <li key={c.name} className="course">
            <div className="course__frame">
              <Image src={c.src} alt={c.alt} fill sizes="(max-width: 900px) 80vw, 38vw" quality={85} className="cover course__img" />
            </div>
            <div className="course__meta">
              <span className="course__num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="course__name">{c.name}</h3>
                <p>{c.note}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div className="courses__progress" aria-hidden="true">
        <div className="courses__progress-bar" />
      </div>
    </section>
  );
}
