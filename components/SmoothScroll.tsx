"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { resetScroll, setLenis } from "@/lib/scroll";

export default function SmoothScroll() {
  const pathname = usePathname();
  const first = useRef(true);

  // On client-side navigation: reset scroll (or jump to #hash) once the new
  // page has painted, then let ScrollTrigger re-measure everything.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const id = requestAnimationFrame(() => {
      resetScroll(window.location.hash);
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.9 });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
