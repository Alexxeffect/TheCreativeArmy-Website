"use client";

import { useEffect, useRef } from "react";

/**
 * A muted, looping video that behaves like an animated image.
 *
 * Why this is a "client component": it needs the browser to check whether the
 * visitor asked their device to reduce motion. If they did, we don't autoplay —
 * the still poster image stays on screen instead. (This is the
 * `prefers-reduced-motion` item in the launch checklist.)
 */
export default function LoopVideo({
  src,
  poster,
  label,
  className = "",
}: {
  src: string;
  poster: string;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      video.pause();
    } else {
      video.play().catch(() => {
        /* autoplay blocked: the poster stays visible, which is fine */
      });
    }
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
    />
  );
}
