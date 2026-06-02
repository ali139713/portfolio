import { AnimatePresence, useReducedMotion } from "framer-motion";
import { lazy, Suspense, useMemo, useState } from "react";
import { Header } from "./components/layout/Header";
import { MobileDrawer } from "./components/layout/MobileDrawer";
import { Sidebar } from "./components/layout/Sidebar";
import { SkipLink } from "./components/layout/SkipLink";
import { BackToTop } from "./components/ui/BackToTop";
import { ScrollProgress } from "./components/ui/ScrollProgress";
import { sections, type SectionId } from "./data/portfolio";
import { useActiveSection } from "./hooks/useActiveSection";
import { useBodyScrollLock } from "./hooks/useBodyScrollLock";
import { useGlassHover } from "./hooks/useGlassHover";
import { useHashNavigation } from "./hooks/useHashNavigation";
import { useScrollProgress } from "./hooks/useScrollProgress";
import { useScrollState } from "./hooks/useScrollState";
import { useSectionSearchShortcut } from "./hooks/useSectionSearchShortcut";
import { scrollToSection } from "./lib/navigation";
import { AboutSection } from "./sections/AboutSection";
import { ContactSection } from "./sections/ContactSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { HeroSection } from "./sections/HeroSection";
import { ImpactSection } from "./sections/ImpactSection";
import { ProjectsSection } from "./sections/ProjectsSection";

const NeuralCanvas = lazy(() => import("./components/NeuralCanvas"));

function App() {
  const [query, setQuery] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const activeSection = useActiveSection();
  const isScrolled = useScrollState();
  const scrollProgress = useScrollProgress();
  const reduceMotion = Boolean(useReducedMotion());

  useGlassHover();
  useSectionSearchShortcut();
  useHashNavigation(reduceMotion);
  useBodyScrollLock(drawerOpen);

  const searchResults = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return [];
    }

    return sections
      .filter((section) =>
        `${section.label} ${section.keywords}`.toLowerCase().includes(normalized),
      )
      .slice(0, 5);
  }, [query]);

  const handleNavigate = (id: SectionId) => {
    scrollToSection(id, { reduceMotion });
    setQuery("");
    setDrawerOpen(false);
  };

  return (
    <div className="app-shell">
      <SkipLink />
      <ScrollProgress progress={scrollProgress} />

      <div className="global-canvas" aria-hidden="true">
        <Suspense fallback={null}>
          <NeuralCanvas />
        </Suspense>
      </div>

      <Header
        drawerOpen={drawerOpen}
        isScrolled={isScrolled}
        onDrawerToggle={() => setDrawerOpen((value) => !value)}
        onNavigate={handleNavigate}
        query={query}
        searchResults={searchResults}
        setQuery={setQuery}
      />
      <Sidebar activeSection={activeSection} onNavigate={handleNavigate} />

      <main className="main-content" id="main-content" tabIndex={-1}>
        <HeroSection onNavigate={handleNavigate} reduceMotion={reduceMotion} />
        <AboutSection reduceMotion={reduceMotion} />
        <ExperienceSection reduceMotion={reduceMotion} />
        <ProjectsSection reduceMotion={reduceMotion} />
        <ImpactSection reduceMotion={reduceMotion} />
        <ContactSection reduceMotion={reduceMotion} />
      </main>

      <BackToTop
        visible={isScrolled}
        onClick={() => handleNavigate("home")}
      />

      <AnimatePresence>
        {drawerOpen && (
          <MobileDrawer
            activeSection={activeSection}
            onClose={() => setDrawerOpen(false)}
            onNavigate={handleNavigate}
            query={query}
            searchResults={searchResults}
            setQuery={setQuery}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
