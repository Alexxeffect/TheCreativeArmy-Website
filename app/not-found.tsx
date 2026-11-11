import Button from "@/components/Button";
import Container from "@/components/Container";
import Nav from "@/components/Nav";

/**
 * Shown for any address that doesn't exist.
 * ⚠ Wording is a placeholder: there's no 404 design in Figma.
 */
export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="pb-24 pt-[clamp(64px,12vw,180px)]">
        <Container>
          <h1 className="font-display text-h1 uppercase">Page not found</h1>
          <p className="mt-6 max-w-[34ch] text-b1">
            That page doesn’t exist. Head back and have a look at the work.
          </p>
          <div className="mt-8">
            <Button href="/" variant="brand" size="sm">
              Back to home
            </Button>
          </div>
        </Container>
      </main>
    </>
  );
}
