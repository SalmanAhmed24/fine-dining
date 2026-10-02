"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import SplitChars from "./SplitChars";

type Props = {
  kicker: string;
  lines: [string, string];
  intro: string;
  image: { src: string; alt: string };
  children?: React.ReactNode;
};

/** Inner-page header: split title on the left, tall framed photo on the right. */
export default function PageHero({ kicker, lines, intro, image, children }: Props) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.fromTo(".phero__title .split-char", { y: 0, yPercent: 105 }, { yPercent: 0, duration: 1.4, stagger: 0.04 }, 0.1)
          .fromTo(".phero__frame", { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut" }, 0)
          .fromTo(".phero__img", { scale: 1.25 }, { scale: 1, duration: 2.2 }, 0.2);
        gsap.to(".phero__img-wrap", {
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="phero" id="top" aria-labelledby="page-title">
      <div className="phero__text">
        <p className="phero__kicker">{kicker}</p>
        <h1 id="page-title" className="phero__title" aria-label={lines.join(" ")}>
          <SplitChars text={lines[0]} className="phero__line" />
          <SplitChars text={lines[1]} className="phero__line phero__line--2" />
        </h1>
        <p className="phero__intro">{intro}</p>
        {children}
      </div>
      <div className="phero__frame">
        <div className="phero__img-wrap">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            quality={85}
            sizes="(max-width: 860px) 100vw, 42vw"
            className="cover phero__img"
          />
        </div>
      </div>
    </section>
  );
}
