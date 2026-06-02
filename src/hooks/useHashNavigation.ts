import { useEffect } from "react";
import { sections, type SectionId } from "../data/portfolio";
import { scrollToSection } from "../lib/navigation";

function isSectionId(value: string): value is SectionId {
  return sections.some((section) => section.id === value);
}

export function useHashNavigation(reduceMotion: boolean) {
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!isSectionId(hash)) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      scrollToSection(hash, { updateHash: false, reduceMotion });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [reduceMotion]);
}
