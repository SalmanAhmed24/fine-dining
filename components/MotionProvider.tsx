"use client";

import { LazyMotion } from "framer-motion";

// Framer Motion's animation features load in a separate chunk after first
// paint, which keeps the initial JavaScript small (better TBT / INP).
const loadFeatures = () => import("@/lib/motion-features").then((mod) => mod.default);

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
