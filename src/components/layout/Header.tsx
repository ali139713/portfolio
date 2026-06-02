import { ArrowUpRight, ChevronRight, Menu, Search, X } from "lucide-react";
import { useEffect, useState, type KeyboardEvent } from "react";
import { SimpleIconMark } from "../ui/SimpleIconMark";
import { ToptalInfoCopy, ToptalTalentBadge } from "../ui/ToptalTalentBadge";
import { profile, type SectionId, type SectionLink } from "../../data/portfolio";
import { useProfileClock } from "../../hooks/useProfileClock";
import { brandIcons } from "../../lib/icons";

type HeaderProps = {
  drawerOpen: boolean;
  isScrolled: boolean;
  onDrawerToggle: () => void;
  onNavigate: (id: SectionId) => void;
  query: string;
  searchResults: SectionLink[];
  setQuery: (query: string) => void;
};

export function Header({
  drawerOpen,
  isScrolled,
  onDrawerToggle,
  onNavigate,
  query,
  searchResults,
  setQuery,
}: HeaderProps) {
  const profileTime = useProfileClock();
  const [searchIndex, setSearchIndex] = useState(0);

  useEffect(() => {
    setSearchIndex(0);
  }, [query, searchResults.length]);

  const handleSearchKeydown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (searchResults.length === 0) {
      if (event.key === "Escape") {
        event.currentTarget.blur();
        setQuery("");
      }
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSearchIndex((index) => (index + 1) % searchResults.length);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setSearchIndex((index) => (index - 1 + searchResults.length) % searchResults.length);
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      onNavigate(searchResults[searchIndex]?.id ?? searchResults[0].id);
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setQuery("");
      event.currentTarget.blur();
    }
  };

  return (
    <header className={isScrolled ? "topbar topbar-scrolled" : "topbar"}>
      <button
        className="brand"
        type="button"
        onClick={() => onNavigate("home")}
        aria-describedby="brand-tooltip"
        aria-label="Go to home"
      >
        <span className="brand-mark" aria-hidden="true">
          <span className="brand-initials">AA</span>
          <span className="brand-status-dot" />
        </span>
        <span className="brand-tooltip" id="brand-tooltip" role="tooltip">
          <strong>{profile.name}</strong>
          <small>{profile.role}</small>
        </span>
      </button>

      <nav className="topnav" aria-label="Primary navigation">
        <a
          className="topnav-brand-link"
          href={profile.linkedinUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn profile (opens in a new tab)"
        >
          <SimpleIconMark icon={brandIcons.LinkedIn} label="LinkedIn" />
          <span>LET'S CONNECT</span>
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
        <div className="topnav-toptal">
          <button
            className="topnav-brand-link"
            type="button"
            aria-describedby="toptal-nav-popover"
            aria-label="About Ali's Toptal profile"
          >
            <SimpleIconMark icon={brandIcons.Toptal} label="Toptal" />
            <span>TOPTAL</span>
          </button>
          <div className="toptal-nav-popover" id="toptal-nav-popover" role="tooltip">
            <ToptalTalentBadge showInfo={false} size="small" />
            <div>
              <ToptalInfoCopy />
            </div>
          </div>
        </div>
      </nav>

      <div className="top-actions">
        <div className="search-wrap">
          <Search size={15} aria-hidden="true" />
          <input
            id="section-search"
            aria-autocomplete="list"
            aria-controls={searchResults.length > 0 ? "section-search-listbox" : undefined}
            aria-expanded={searchResults.length > 0}
            aria-activedescendant={
              searchResults.length > 0 ? `section-search-option-${searchResults[searchIndex]?.id}` : undefined
            }
            aria-label="Search sections"
            placeholder="Search sections…"
            role="combobox"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleSearchKeydown}
          />
          <kbd>/</kbd>
          {searchResults.length > 0 && (
            <div className="search-menu" id="section-search-listbox" role="listbox">
              {searchResults.map((result, index) => (
                <button
                  aria-selected={index === searchIndex}
                  className={index === searchIndex ? "is-active" : ""}
                  id={`section-search-option-${result.id}`}
                  key={result.id}
                  role="option"
                  type="button"
                  onClick={() => onNavigate(result.id)}
                  onMouseEnter={() => setSearchIndex(index)}
                >
                  <span>{result.label}</span>
                  <ChevronRight size={15} aria-hidden="true" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="profile-clock-wrap">
          <div className="profile-clock" aria-describedby="profile-clock-tooltip" tabIndex={0}>
            <span className="pulse-dot" aria-hidden="true" />
            <time dateTime={profileTime}>{profileTime}</time>
          </div>
          <div className="profile-clock-tooltip" id="profile-clock-tooltip" role="tooltip">
            <strong>Ali's local time</strong>
            <span>Lahore, Pakistan · PKT</span>
          </div>
        </div>

        <button
          className="icon-button menu-button"
          type="button"
          onClick={onDrawerToggle}
          aria-label={drawerOpen ? "Close menu" : "Open menu"}
        >
          {drawerOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
}
