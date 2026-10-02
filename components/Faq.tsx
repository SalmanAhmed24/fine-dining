"use client";

import { useId, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { contact } from "@/lib/content";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();
  const reduce = useReducedMotion();

  return (
    <section className="faq section" aria-labelledby="faq-title">
      <h2 id="faq-title" className="section-title">Before you come</h2>
      <ul className="faq__list">
        {contact.faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <li key={f.q} className={`faq__item ${isOpen ? "is-open" : ""}`}>
              <h3>
                <button
                  type="button"
                  className="faq__q"
                  aria-expanded={isOpen}
                  aria-controls={`${uid}-a${i}`}
                  id={`${uid}-q${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{f.q}</span>
                  <span className="faq__icon" aria-hidden="true" />
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <m.div
                    id={`${uid}-a${i}`}
                    role="region"
                    aria-labelledby={`${uid}-q${i}`}
                    className="faq__a"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: reduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p>{f.a}</p>
                  </m.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
