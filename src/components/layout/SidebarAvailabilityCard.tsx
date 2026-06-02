import { BriefcaseBusiness } from "lucide-react";
import { profile } from "../../data/portfolio";

export function SidebarAvailabilityCard() {
  return (
    <div className="sidebar-card">
      <span className="sidebar-card-icon" aria-hidden="true">
        <BriefcaseBusiness size={17} />
      </span>
      <div className="sidebar-card-copy">
        <span className="sidebar-card-status">
          <span className="pulse-dot" aria-hidden="true" />
          Available for hire
        </span>
        <strong>{profile.name}</strong>
        <span className="sidebar-card-role">{profile.role}</span>
        <small>Let's build something remarkable.</small>
      </div>
    </div>
  );
}
