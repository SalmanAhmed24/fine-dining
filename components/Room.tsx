"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import Magnetic from "./Magnetic";

export default function Room() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>(".room__parallax").forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: -7 },
            {
              yPercent: 7,
              ease: "none",
              scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
            }
          );
        });
        // The wide frame opens up as it reaches the middle of the screen.
        gsap.fromTo(
          ".room__wide",
          { clipPath: "inset(12% 10% 12% 10% round 4px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 4px)",
            ease: "none",
            scrollTrigger: { trigger: ".room__wide", start: "top 95%", end: "center 55%", scrub: true },
          }
        );
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="room section" id="room" aria-labelledby="room-title">
      <div className="room__grid">
        <article className="room__feature">
          <div className="room__media">
            <Image
              src="/images/signature.jpg"
              alt=""
              fill
              sizes="(max-width: 800px) 100vw, 48vw"
              quality={60}
              className="cover room__parallax"
            />
          </div>
          <div className="room__veil" aria-hidden="true" />
          <div className="room__copy">
            <p className="room__kicker">Chef&rsquo;s counter</p>
            <h2 id="room-title" className="room__title">Eight seats at the hearth</h2>
            <p>Watch every course leave the fire. Counter seats are released 30 days ahead.</p>
            <Magnetic href="#reserve" variant="dark">
              Book the counter
            </Magnetic>
          </div>
        </article>

        <figure className="room__tall">
          <div className="room__media">
            <Image
              src="/images/pass.jpg"
              alt="Two copper-handled pans resting at the pass"
              fill
              sizes="(max-width: 800px) 100vw, 48vw"
              quality={60}
              className="cover room__parallax"
            />
          </div>
        </figure>

        <figure className="room__wide">
          <div className="room__media">
            <Image
              src="/images/hearth.jpg"
              alt="A shallow copper pan of roasted vegetables on the stone counter"
              fill
              sizes="100vw"
              quality={60}
              className="cover room__parallax"
            />
          </div>
        </figure>
      </div>
    </section>
  );
}
