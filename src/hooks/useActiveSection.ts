import { useEffect, useState } from "react";
import { sections, type SectionId } from "../data/portfolio";

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<SectionId>("home");

  useEffect(() => {
    let frame = 0;

    const updateActiveSection = () => {
      const anchor = window.innerHeight * 0.36;
      let nextSection: SectionId = "home";

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= anchor) {
          nextSection = section.id;
        }
      }

      setActiveSection(nextSection);
    };

    const handleScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return activeSection;
}
