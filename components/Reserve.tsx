"use client";

import { useId, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, LayoutGroup, m, useReducedMotion } from "framer-motion";
import { site, tasting } from "@/lib/content";
import Magnetic from "./Magnetic";

const ease = [0.22, 1, 0.36, 1] as const;

function Rolling({ value }: { value: string }) {
  // Numbers roll vertically when they change.
  return (
    <span className="rolling">
      <AnimatePresence mode="popLayout" initial={false}>
        <m.span
          key={value}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease }}
        >
          {value}
        </m.span>
      </AnimatePresence>
    </span>
  );
}

function minDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

export default function Reserve() {
  const reduce = useReducedMotion();
  const uid = useId();
  const [photo, setPhoto] = useState(0);
  const [tab, setTab] = useState(tasting.tabs[0].id);
  const [seating, setSeating] = useState(tasting.seatings[0]);
  const [guests, setGuests] = useState(2);
  const [wine, setWine] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");

  const total = useMemo(() => guests * (tasting.price + (wine ? tasting.wine : 0)), [guests, wine]);
  const activeTab = tasting.tabs.find((t) => t.id === tab)!;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      setError("Add your name, a valid email and a date from tomorrow onwards.");
      form.reportValidity();
      return;
    }
    setError("");
    setStatus("sending");
    // Replace with a call to your booking provider or a server action.
    window.setTimeout(() => setStatus("sent"), 900);
  };

  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    const n = tasting.tabs.length;
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % n;
    if (e.key === "ArrowLeft") next = (i - 1 + n) % n;
    if (next < 0) return;
    e.preventDefault();
    setTab(tasting.tabs[next].id);
    document.getElementById(`${uid}-tab-${tasting.tabs[next].id}`)?.focus();
  };

  return (
    <section className="reserve" id="reserve" aria-labelledby="reserve-title">
      <h2 id="reserve-title" className="reserve__title">
        Reserve a table
      </h2>

      <div className="reserve__grid">
        <div className="reserve__gallery">
          <div className="reserve__photo">
            <AnimatePresence initial={false}>
              <m.div
                key={photo}
                className="reserve__photo-inner"
                initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 0 100%)" }}
                animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0 0%)" }}
                exit={{ opacity: 1 }}
                transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
              >
                <Image
                  src={tasting.gallery[photo].src}
                  alt={tasting.gallery[photo].alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 40vw"
                  quality={85}
                  className="cover"
                />
              </m.div>
            </AnimatePresence>
          </div>
          <div className="reserve__thumbs" role="group" aria-label="Photos of the room">
            {tasting.gallery.map((g, i) => (
              <button
                key={g.src}
                type="button"
                className={`thumb ${i === photo ? "is-active" : ""}`}
                aria-pressed={i === photo}
                aria-label={`Show photo ${i + 1}: ${g.alt}`}
                onClick={() => setPhoto(i)}
              >
                <Image src={g.src} alt="" fill sizes="96px" quality={75} className="cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="reserve__panel">
          <p className="reserve__badge">Wednesday to Sunday</p>
          <h3 className="reserve__name">{tasting.title}</h3>
          <p className="reserve__desc">{tasting.description}</p>

          <AnimatePresence mode="wait" initial={false}>
            {status === "sent" ? (
              <m.div
                key="sent"
                className="reserve__done"
                role="status"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease }}
              >
                <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
                  <m.circle
                    cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="1.5"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, ease }}
                  />
                  <m.path
                    d="M15 25l6 6 12-13" fill="none" stroke="currentColor" strokeWidth="1.5"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.6, ease }}
                  />
                </svg>
                <p className="reserve__done-title">Request sent</p>
                <p>
                  We&rsquo;ll confirm your {seating} table for {guests} by email within a day. Questions? Call{" "}
                  <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`}>{site.phone}</a>.
                </p>
                <button type="button" className="linkish" onClick={() => setStatus("idle")}>
                  Make another request
                </button>
              </m.div>
            ) : (
              <m.form
                key="form"
                className="reserve__form"
                noValidate
                onSubmit={onSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <fieldset className="field">
                  <legend>Seating</legend>
                  <LayoutGroup id="seating">
                    <div className="pills">
                      {tasting.seatings.map((s) => (
                        <label key={s} className={`pill ${seating === s ? "is-on" : ""}`}>
                          <input
                            type="radio"
                            name="seating"
                            value={s}
                            checked={seating === s}
                            onChange={() => setSeating(s)}
                          />
                          {seating === s && <m.span layoutId="pill-bg" className="pill__bg" transition={{ duration: 0.45, ease }} />}
                          <span className="pill__text">{s}</span>
                        </label>
                      ))}
                    </div>
                  </LayoutGroup>
                </fieldset>

                <div className="row">
                  <div className="field">
                    <label htmlFor={`${uid}-date`}>Date</label>
                    <input id={`${uid}-date`} name="date" type="date" required min={minDate()} />
                  </div>
                  <div className="field">
                    <span className="field__label" id={`${uid}-guests`}>Guests</span>
                    <div className="stepper" role="group" aria-labelledby={`${uid}-guests`}>
                      <button type="button" aria-label="Remove a guest" disabled={guests <= 1} onClick={() => setGuests((g) => g - 1)}>
                        −
                      </button>
                      <output aria-live="polite">
                        <Rolling value={String(guests)} />
                      </output>
                      <button type="button" aria-label="Add a guest" disabled={guests >= 8} onClick={() => setGuests((g) => g + 1)}>
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="field">
                    <label htmlFor={`${uid}-name`}>Name</label>
                    <input id={`${uid}-name`} name="name" type="text" autoComplete="name" required />
                  </div>
                  <div className="field">
                    <label htmlFor={`${uid}-email`}>Email</label>
                    <input id={`${uid}-email`} name="email" type="email" autoComplete="email" required />
                  </div>
                </div>

                <label className="check">
                  <input type="checkbox" checked={wine} onChange={(e) => setWine(e.target.checked)} />
                  <span className="check__box" aria-hidden="true" />
                  Add the wine pairing ({site.currency}{tasting.wine} per guest)
                </label>

                <div className="reserve__total">
                  <span>Estimated total</span>
                  <strong>
                    {site.currency}
                    <Rolling value={total.toLocaleString("en-US")} />
                  </strong>
                </div>

                {error && (
                  <p className="form-error" role="alert">
                    {error}
                  </p>
                )}

                <Magnetic type="submit" variant="dark" className="reserve__submit" disabled={status === "sending"}>
                  {status === "sending" ? "Sending request…" : "Request table"}
                </Magnetic>
              </m.form>
            )}
          </AnimatePresence>

          <div className="tabs">
            <LayoutGroup id="tabs">
              <div role="tablist" aria-label="Menu details" className="tabs__list">
                {tasting.tabs.map((t, i) => (
                  <button
                    key={t.id}
                    id={`${uid}-tab-${t.id}`}
                    role="tab"
                    type="button"
                    aria-selected={tab === t.id}
                    aria-controls={`${uid}-panel`}
                    tabIndex={tab === t.id ? 0 : -1}
                    className="tabs__tab"
                    onClick={() => setTab(t.id)}
                    onKeyDown={(e) => onTabKey(e, i)}
                  >
                    {t.label}
                    {tab === t.id && <m.span layoutId="tab-line" className="tabs__line" transition={{ duration: 0.45, ease }} />}
                  </button>
                ))}
              </div>
            </LayoutGroup>
            <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${tab}`} className="tabs__panel" tabIndex={0}>
              <AnimatePresence mode="wait" initial={false}>
                <m.ul
                  key={activeTab.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease }}
                >
                  {activeTab.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </m.ul>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
