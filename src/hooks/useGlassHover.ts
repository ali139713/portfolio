import { useEffect } from "react";

const glassSurfaceSelector = [
  ".skill-card",
  ".featured-project",
  ".work-engagement-card",
  ".compact-project-card",
  ".metric-tile",
  ".contact-card",
  ".avatar-card",
  ".sidebar-card",
  ".hero-stats",
  ".project-mockup",
  ".profile-detail-card",
  ".timeline-entry-card",
].join(",");

export function useGlassHover() {
  useEffect(() => {
    let activeGlassSurface: HTMLElement | null = null;

    const clearActiveGlassSurface = () => {
      activeGlassSurface?.classList.remove("is-glass-hovered");
      activeGlassSurface = null;
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!(event.target instanceof Element)) {
        clearActiveGlassSurface();
        return;
      }

      const glassSurface = event.target.closest<HTMLElement>(glassSurfaceSelector);
      if (!glassSurface) {
        clearActiveGlassSurface();
        return;
      }

      const rect = glassSurface.getBoundingClientRect();
      glassSurface.style.setProperty("--glass-x", `${event.clientX - rect.left}px`);
      glassSurface.style.setProperty("--glass-y", `${event.clientY - rect.top}px`);

      if (activeGlassSurface !== glassSurface) {
        clearActiveGlassSurface();
        activeGlassSurface = glassSurface;
        activeGlassSurface.classList.add("is-glass-hovered");
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", clearActiveGlassSurface);
    window.addEventListener("scroll", clearActiveGlassSurface, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", clearActiveGlassSurface);
      window.removeEventListener("scroll", clearActiveGlassSurface);
    };
  }, []);
}
