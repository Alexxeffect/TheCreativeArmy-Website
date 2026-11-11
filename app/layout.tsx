import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { site } from "@/content/site";

export const metadata: Metadata = {
  // ⚠ [placeholder] title/description: draft copy until Alex confirms.
  title: site.meta.title,
  description: site.meta.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Adobe Fonts kit: provides "redaction" (headlines) and
            "neue-haas-grotesk-text" (everything else). Same kit as the
            personal portfolio site. */}
        <link rel="stylesheet" href="https://use.typekit.net/urt4kvy.css" />
      </head>
      {/* The nav is added per page (not here) because case study pages show an
          extra "Work" link that the landing page doesn't. */}
      <body>
        {children}
        {/* Vercel Analytics: records page views once the site is deployed on Vercel. */}
        <Analytics />
      </body>
    </html>
  );
}
