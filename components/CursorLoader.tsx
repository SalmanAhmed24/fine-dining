"use client";

import dynamic from "next/dynamic";

// The cursor is decorative and desktop-only, so it never blocks first load.
const Cursor = dynamic(() => import("./Cursor"), { ssr: false });

export default function CursorLoader() {
  return <Cursor />;
}
