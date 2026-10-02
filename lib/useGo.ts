"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { scrollToTarget, scrollToTop } from "./scroll";

/**
 * One handler for every internal link:
 *  - "#reserve" or "/contact#reserve" while already on /contact → smooth scroll
 *  - "#reserve" on a page without that section → go to the booking page
 *  - "/about" → client-side navigation
 */
export function useGo() {
  const router = useRouter();
  const pathname = usePathname();

  return useCallback(
    (href: string, delay = 0) => {
      const [rawPath, hash] = href.split("#");
      const path = rawPath || pathname;
      const run = () => {
        if (path === pathname) {
          if (hash && document.getElementById(hash)) scrollToTarget(`#${hash}`);
          else if (hash) router.push(`/contact#${hash}`);
          else scrollToTop();
        } else {
          router.push(href);
        }
      };
      if (delay) window.setTimeout(run, delay);
      else run();
    },
    [pathname, router]
  );
}
