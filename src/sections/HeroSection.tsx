import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ToptalTalentBadge } from "../components/ui/ToptalTalentBadge";
import { TypeCaret } from "../components/ui/TypeCaret";
import { heroStats, profile, type SectionId } from "../data/portfolio";
import { useHeroSequence } from "../hooks/useHeroSequence";
import { revealContainer, revealItem } from "../lib/animation";

type HeroSectionProps = {
  onNavigate: (id: SectionId) => void;
  reduceMotion: boolean;
};

function HoverLetters({ text }: { text: string }) {
  return (
    <>
      {Array.from(text).map((letter, index) => (
        <span className={letter === " " ? "hero-name-letter hero-name-space" : "hero-name-letter"} key={`${letter}-${index}`}>
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </>
  );
}

type HeroStatProps = {
  label: string;
  reduceMotion: boolean;
  suffix: string;
  value: number;
};

function HeroStat({ label, reduceMotion, suffix, value }: HeroStatProps) {
  const [displayValue, setDisplayValue] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (reduceMotion) {
      setDisplayValue(value);
      return;
    }

    let frame = 0;
    const start = performance.now();
    const duration = 1100;

    const tick = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * eased));

      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [reduceMotion, value]);

  return (
    <div className="hero-stat">
      <strong>
        {displayValue}
        {suffix}
      </strong>
      <span>{label}</span>
    </div>
  );
}

export function HeroSection({ onNavigate, reduceMotion }: HeroSectionProps) {
  const heroBody = profile.bio;
  const heroSegments = useMemo(
    () => [
      "Ali Abdullah",
      "Azhar",
      profile.tagline,
      heroBody,
    ],
    [heroBody],
  );
  const typed = useHeroSequence(heroSegments, reduceMotion);
  const typedPrimaryName = typed.parts[0];
  const typedGivenName = typedPrimaryName.slice(0, Math.min(3, typedPrimaryName.length));
  const middleNameStarted = typedPrimaryName.length > 3;
  const typedMiddleName = middleNameStarted ? typedPrimaryName.slice(4) : "";

  return (
    <section className="section hero-section" id="home">
      <div className="portfolio-container hero-grid">
        <motion.div
          className="hero-copy"
          initial={reduceMotion ? false : "hidden"}
          animate="show"
          variants={revealContainer}
        >
          <motion.div className="hero-eyebrow" variants={revealItem}>
            <span className="pulse-dot" aria-hidden="true" />
            <span>{profile.status}</span>
            <span className="eyebrow-divider" aria-hidden="true" />
            <span>{profile.location}</span>
          </motion.div>
          <motion.div className="hero-name-row" variants={revealItem}>
            <h1 className="hero-name" aria-label={profile.name}>
              <span className="hero-name-line hero-name-given">
                <HoverLetters text={typedGivenName} />
                {typed.activeIndex === 0 && !middleNameStarted && <TypeCaret />}
              </span>
              <span className="hero-name-line hero-name-middle-row">
                <span className="hero-name-middle">
                  <HoverLetters text={typedMiddleName} />
                  {typed.activeIndex === 0 && middleNameStarted && <TypeCaret />}
                </span>
                <span className="hero-toptal-badge">
                  <ToptalTalentBadge size="medium" />
                </span>
              </span>
              <span className="hero-name-line hero-name-accent">
                <HoverLetters text={typed.parts[1]} />
                {typed.activeIndex === 1 && <TypeCaret />}
              </span>
            </h1>
          </motion.div>
          <motion.h2 className="hero-tagline" variants={revealItem} aria-label={profile.tagline}>
            {typed.parts[2]}
            {typed.activeIndex === 2 && <TypeCaret />}
          </motion.h2>
          <motion.p className="hero-body" variants={revealItem} aria-label={heroBody}>
            {typed.parts[3]}
            {typed.activeIndex === 3 && <TypeCaret />}
          </motion.p>
          <motion.div
            className={typed.done ? "hero-actions hero-actions-ready" : "hero-actions"}
            variants={revealItem}
          >
            <button
              className="button button-primary hero-experience-button"
              type="button"
              onClick={() => onNavigate("experience")}
            >
              View Work Experience →
            </button>
            <button
              className="button button-secondary"
              type="button"
              onClick={() => onNavigate("contact")}
            >
              Get in Touch
            </button>
          </motion.div>
          <motion.div className={typed.done ? "hero-stats hero-stats-ready" : "hero-stats"} variants={revealItem}>
            {heroStats.map((stat) => (
              <HeroStat key={stat.label} reduceMotion={reduceMotion} {...stat} />
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="avatar-card"
          initial={reduceMotion ? false : { opacity: 0, y: 20, filter: "blur(6px)", scale: 0.994 }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <img className="avatar-image" src="/1770193094938.jpeg" alt="Ali Abdullah Azhar" />
          <div className="avatar-footer">
            <div className="avatar-verified-icon">
              <BadgeCheck size={21} />
            </div>
            <div>
              <strong>Verified Expert</strong>
              <small>Senior full-stack engineer</small>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
