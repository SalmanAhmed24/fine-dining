"use client";

import { useRef } from "react";
import { m, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { scrollToTarget } from "@/lib/scroll";

type Props = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "ghost" | "solid" | "dark";
  className?: string;
  disabled?: boolean;
};

/** A pill button that leans toward the pointer. Renders <a> for in-page links. */
export default function Magnetic({ children, href, onClick, type = "button", variant = "ghost", className = "", disabled }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 });

  const move = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.4);
  };
  const leave = () => {
    x.set(0);
    y.set(0);
  };

  const cls = `btn btn--${variant} ${className}`;
  const inner = (
    <>
      <span className="btn__fill" aria-hidden="true" />
      <span className="btn__label">{children}</span>
    </>
  );

  if (href) {
    return (
      <m.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={cls}
        style={{ x, y }}
        onPointerMove={move}
        onPointerLeave={leave}
        data-cursor="link"
        onClick={(e) => {
          if (href.startsWith("#")) {
            e.preventDefault();
            scrollToTarget(href);
          }
          onClick?.();
        }}
      >
        {inner}
      </m.a>
    );
  }
  return (
    <m.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      className={cls}
      style={{ x, y }}
      onPointerMove={move}
      onPointerLeave={leave}
      onClick={onClick}
      disabled={disabled}
      data-cursor="link"
      whileTap={reduce ? undefined : { scale: 0.97 }}
    >
      {inner}
    </m.button>
  );
}
