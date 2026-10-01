"use client";

import { useEffect, useState } from "react";
import { m, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

/**
 * A soft brass ring that trails the pointer and swells over interactive
 * elements. The native cursor stays visible; this is only an accent.
 * Disabled for touch devices and reduced-motion users.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<"idle" | "link" | "drag">("idle");
  const [visible, setVisible] = useState(false);
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const x = useSpring(mx, { stiffness: 500, damping: 40, mass: 0.5 });
  const y = useSpring(my, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    const update = () => setEnabled(fine.matches);
    update();
    fine.addEventListener("change", update);
    return () => fine.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      setVisible(true);
      const t = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor], a, button, input, select, textarea, label");
      const m = t?.dataset.cursor === "drag" ? "drag" : t ? "link" : "idle";
      setMode(m);
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled, mx, my]);

  if (!enabled) return null;

  const size = mode === "drag" ? 84 : mode === "link" ? 54 : 18;

  return (
    <m.div
      className="cursor"
      aria-hidden="true"
      style={{ x, y }}
      animate={{ opacity: visible ? 1 : 0 }}
    >
      <m.div
        className="cursor__ring"
        animate={{ width: size, height: size, backgroundColor: mode === "drag" ? "rgba(201,164,106,1)" : "rgba(201,164,106,0)" }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
      >
        <AnimatePresence>
          {mode === "drag" && (
            <m.span
              className="cursor__label"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
            >
              Scroll
            </m.span>
          )}
        </AnimatePresence>
      </m.div>
    </m.div>
  );
}
