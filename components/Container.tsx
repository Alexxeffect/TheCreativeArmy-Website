import type { ReactNode } from "react";

/**
 * Keeps page content inside the design's width (1512px, the Figma frame) with
 * the standard side margin. Coloured bands (like the orange offer panel) sit
 * OUTSIDE a Container so they can run edge to edge.
 */
export default function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-page px-gutter ${className}`}>{children}</div>;
}
