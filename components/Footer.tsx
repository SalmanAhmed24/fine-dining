"use client";

import { useRef } from "react";
import { site } from "@/lib/content";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import SplitChars from "./SplitChars";

export default function Footer() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(".footer__mark .split-char", { y: 0, yPercent: 105 }, {
          yPercent: 0,
          duration: 1.4,
          ease: "expo.out",
          stagger: { each: 0.05, from: "center" },
          scrollTrigger: { trigger: ".footer__mark", start: "top 95%" },
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <footer ref={root} className="footer">
      <div className="footer__cols">
        <div>
          <h2 className="footer__h">Find us</h2>
          <address>
            {site.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </address>
        </div>
        <div>
          <h2 className="footer__h">Hours</h2>
          <dl>
            {site.hours.map((h) => (
              <div key={h.days}>
                <dt>{h.days}</dt>
                <dd>{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <h2 className="footer__h">Contact</h2>
          <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}>{site.phone}</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </div>
      </div>

      <p className="footer__mark">
        <span className="sr-only">{site.name}</span>
        <SplitChars text={site.name} />
      </p>

      <div className="footer__base">
        <p>© {new Date().getFullYear()} {site.name}.</p>
        <p>Private dining for up to 16 guests on request.</p>
      </div>
    </footer>
  );
}
