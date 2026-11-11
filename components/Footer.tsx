import { site } from "@/content/site";

/**
 * Orange band with the giant studio wordmark, as in Figma.
 * (Figma shows nothing else here: no copyright line, no socials.)
 */
export default function Footer() {
  return (
    <footer className="flex justify-center bg-brand pb-[clamp(12px,1.9vw,29px)] pt-[clamp(32px,13.8vw,209px)]">
      <p className="font-display text-wordmark uppercase text-paper">{site.name}</p>
    </footer>
  );
}
