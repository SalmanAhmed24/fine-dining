"use client";

import { useRef } from "react";
import Image from "next/image";
import { about } from "@/lib/content";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

export default function ChefSplit() {
  const root = useRef<HTMLElement>(null);
  const { chef } = about;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          ".chef__img",
          { yPercent: -8 },
          { yPercent: 8, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } }
        );
        gsap.fromTo(".chef__copy > *", { autoAlpha: 0, y: 30 }, {
          autoAlpha: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".chef__copy", start: "top 80%" },
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="chef section" aria-labelledby="chef-title">
      <figure className="chef__frame">
        <div className="chef__media">
          <Image
            src="/images/pass.jpg"
            alt="The signature beef tenderloin with a glass of red wine"
            fill
            quality={85}
            sizes="(max-width: 860px) 100vw, 45vw"
            className="cover chef__img"
          />
        </div>
      </figure>
      <div className="chef__copy">
        <p className="eyebrow">{chef.role}</p>
        <h2 id="chef-title" className="chef__name">{chef.name}</h2>
        <blockquote className="chef__quote">
          <p>&ldquo;{chef.quote}&rdquo;</p>
        </blockquote>
        {chef.bio.map((b) => (
          <p key={b} className="chef__bio">{b}</p>
        ))}
      </div>
    </section>
  );
}
