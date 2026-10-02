import type Lenis from "lenis";

// A tiny module-level store so any component can scroll through Lenis
// (smooth) or fall back to native scrolling when Lenis is disabled.
let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};

export function scrollToTarget(target: string | HTMLElement) {
  const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
  if (!el) return;
  if (instance) {
    instance.scrollTo(el, { offset: 0, duration: 1.4 });
  } else {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }
  // Move focus for keyboard and screen reader users.
  if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
}

export function scrollToTop(immediate = false) {
  if (instance) instance.scrollTo(0, { immediate, duration: 1.4 });
  else window.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" });
}

/** After a client-side navigation, jump to the hash target or the top. */
export function resetScroll(hash: string) {
  const el = hash ? document.getElementById(hash.slice(1)) : null;
  if (instance) {
    instance.resize();
    if (el) instance.scrollTo(el, { immediate: true });
    else instance.scrollTo(0, { immediate: true });
  } else if (el) {
    el.scrollIntoView();
  } else {
    window.scrollTo(0, 0);
  }
}
