"use client";

import { useRef } from "react";
import { contact, site } from "@/lib/content";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";

export default function ContactInfo() {
  const root = useRef<HTMLElement>(null);
  const tel = `tel:${site.phone.replace(/[^+\d]/g, "")}`;
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address.join(", "))}`;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(".cinfo__card", { autoAlpha: 0, y: 40 }, {
          autoAlpha: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: root.current, start: "top 80%" },
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="cinfo section" id="visit" aria-labelledby="visit-title">
      <h2 id="visit-title" className="sr-only">Visit and contact</h2>
      <div className="cinfo__grid">
        <article className="cinfo__card">
          <h3 className="cinfo__h">Visit</h3>
          <address>
            {site.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </address>
          <a href={maps} target="_blank" rel="noopener noreferrer" className="ulink">
            Get directions<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </article>
        <article className="cinfo__card">
          <h3 className="cinfo__h">Hours</h3>
          <dl>
            {site.hours.map((h) => (
              <div key={h.days}>
                <dt>{h.days}</dt>
                <dd>{h.time}</dd>
              </div>
            ))}
            <div>
              <dt>Monday and Tuesday</dt>
              <dd>Closed</dd>
            </div>
          </dl>
        </article>
        <article className="cinfo__card">
          <h3 className="cinfo__h">Talk to us</h3>
          <a href={tel} className="cinfo__big ulink">{site.phone}</a>
          <a href={`mailto:${site.email}`} className="cinfo__big ulink">{site.email}</a>
          <p className="cinfo__note">We answer the phone from 2 pm, Wednesday to Sunday.</p>
        </article>
      </div>

      <ul className="cinfo__dirs">
        {contact.directions.map((d) => (
          <li key={d.label}>
            <h3 className="cinfo__h">{d.label}</h3>
            <p>{d.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
