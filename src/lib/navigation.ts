import type { SectionId } from "../data/portfolio";

type ScrollToSectionOptions = {
  reduceMotion?: boolean;
  updateHash?: boolean;
};

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function scrollToSection(id: SectionId, options: ScrollToSectionOptions = {}) {
  const { reduceMotion = prefersReducedMotion(), updateHash = true } = options;
  const behavior = reduceMotion ? "auto" : "smooth";

  document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });

  if (!updateHash) {
    return;
  }

  const nextUrl = id === "home" ? `${window.location.pathname}${window.location.search}` : `#${id}`;
  window.history.replaceState(null, "", nextUrl);
}
