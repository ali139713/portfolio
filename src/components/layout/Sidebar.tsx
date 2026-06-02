import { ChevronRight } from "lucide-react";
import { sections, type SectionId } from "../../data/portfolio";
import { SidebarAvailabilityCard } from "./SidebarAvailabilityCard";

type SidebarProps = {
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
};

export function Sidebar({ activeSection, onNavigate }: SidebarProps) {
  return (
    <aside className="sidebar" aria-label="Section navigation">
      <span className="sidebar-label">Sections</span>
      <nav>
        {sections.map((section) => (
          <button
            aria-current={activeSection === section.id ? "page" : undefined}
            className={activeSection === section.id ? "active" : ""}
            key={section.id}
            title={section.label}
            type="button"
            onClick={() => onNavigate(section.id)}
          >
            <span className="sidebar-index">{section.number}</span>
            <span className="sidebar-text">{section.label}</span>
            <ChevronRight size={16} />
          </button>
        ))}
      </nav>

      <SidebarAvailabilityCard />
    </aside>
  );
}
