import { motion } from "framer-motion";
import { ArrowUpRight, ChevronRight, Search } from "lucide-react";
import { useEffect, useRef } from "react";
import { SimpleIconMark } from "../ui/SimpleIconMark";
import { ToptalInfoCopy, ToptalTalentBadge } from "../ui/ToptalTalentBadge";
import { profile, sections, type SectionId, type SectionLink } from "../../data/portfolio";
import { useProfileClock } from "../../hooks/useProfileClock";
import { brandIcons } from "../../lib/icons";
import { SidebarAvailabilityCard } from "./SidebarAvailabilityCard";

type MobileDrawerProps = {
  activeSection: SectionId;
  onClose: () => void;
  onNavigate: (id: SectionId) => void;
  query: string;
  searchResults: SectionLink[];
  setQuery: (query: string) => void;
};

export function MobileDrawer({
  activeSection,
  onClose,
  onNavigate,
  query,
  searchResults,
  setQuery,
}: MobileDrawerProps) {
  const panelRef = useRef<HTMLElement | null>(null);
  const profileTime = useProfileClock();

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeydown);
    panelRef.current?.focus();

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [onClose]);

  return (
    <motion.div
      className="drawer-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.aside
        ref={panelRef}
        className="drawer-panel"
        initial={{ x: -28, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -28, opacity: 0 }}
        transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="drawer-body">
          <div className="drawer-search">
            <Search size={15} aria-hidden="true" />
            <input
              aria-label="Search sections"
              placeholder="Search sections…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && searchResults[0]) {
                  onNavigate(searchResults[0].id);
                }
              }}
            />
          </div>

          {searchResults.length > 0 && (
            <div className="drawer-search-results" role="listbox" aria-label="Search results">
              {searchResults.map((result) => (
                <button
                  key={result.id}
                  role="option"
                  type="button"
                  onClick={() => onNavigate(result.id)}
                >
                  <span>{result.label}</span>
                  <ChevronRight size={15} aria-hidden="true" />
                </button>
              ))}
            </div>
          )}

          <span className="drawer-label">Sections</span>
          <nav aria-label="Mobile section navigation">
            {sections.map((section) => (
              <button
                aria-current={activeSection === section.id ? "page" : undefined}
                className={activeSection === section.id ? "active" : ""}
                key={section.id}
                type="button"
                onClick={() => onNavigate(section.id)}
              >
                <span className="sidebar-index">{section.number}</span>
                <span className="sidebar-text">{section.label}</span>
                <ChevronRight size={16} aria-hidden="true" />
              </button>
            ))}
          </nav>

          <div className="drawer-divider" aria-hidden="true" />

          <span className="drawer-label">Connect</span>
          <div className="drawer-links">
            <a
              className="drawer-link"
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile (opens in a new tab)"
            >
              <SimpleIconMark icon={brandIcons.LinkedIn} label="LinkedIn" />
              <span>LinkedIn</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <div className="drawer-toptal">
              <div className="drawer-toptal-badge">
                <ToptalTalentBadge focusable={false} showInfo={false} size="small" />
              </div>
              <div className="drawer-toptal-copy">
                <ToptalInfoCopy />
              </div>
            </div>
          </div>

          <div className="drawer-clock" aria-label="Ali's local time">
            <span className="pulse-dot" aria-hidden="true" />
            <div>
              <time dateTime={profileTime}>{profileTime}</time>
              <span>Lahore, Pakistan · PKT</span>
            </div>
          </div>
        </div>

        <div className="drawer-footer">
          <SidebarAvailabilityCard />
        </div>
      </motion.aside>
    </motion.div>
  );
}
