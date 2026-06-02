import { AnimatePresence, motion, useScroll, useSpring, type Variants } from "framer-motion";
import { ArrowUpRight, ChevronRight, Globe2 } from "lucide-react";
import { useRef, useState } from "react";
import { SectionHeader } from "../components/ui/SectionHeader";
import { ToptalTalentBadge } from "../components/ui/ToptalTalentBadge";
import { experienceEntries, type ExperienceLogo } from "../data/portfolio";
import { getRevealProps, getScrollItemProps } from "../lib/animation";

type ExperienceSectionProps = {
  reduceMotion: boolean;
};

const dropdownEase = [0.22, 1, 0.36, 1] as const;

const detailsContainer: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delayChildren: 0.04,
      duration: 0.28,
      ease: dropdownEase,
      staggerChildren: 0.055,
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: 0.14, ease: [0.4, 0, 1, 1] },
  },
};

const detailItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: dropdownEase },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: { duration: 0.12, ease: [0.4, 0, 1, 1] },
  },
};

export function ExperienceSection({ reduceMotion }: ExperienceSectionProps) {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const [expandedEntries, setExpandedEntries] = useState<Record<string, boolean>>({});
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 72%", "end 42%"],
  });
  const fillProgress = useSpring(scrollYProgress, {
    stiffness: 72,
    damping: 28,
    mass: 0.55,
    restDelta: 0.001,
  });

  return (
    <section className="section experience-section" id="experience">
      <motion.div className="portfolio-container narrow-container" {...getRevealProps(reduceMotion, 0.18)}>
        <SectionHeader
          number="02"
          label="Work Experience"
          title="Work experience."
          text="Ali's full career timeline, roles, outcomes, and technologies."
          align="center"
        />
        <div className="timeline" ref={timelineRef}>
          <motion.div
            className="timeline-progress"
            style={{ scaleY: reduceMotion ? 1 : fillProgress }}
            aria-hidden="true"
          />
          {experienceEntries.map((entry, index) => {
            const entryKey = `${entry.company}-${entry.period}`;
            const isExpanded = Boolean(expandedEntries[entryKey]);
            const preview = entry.summary ?? entry.bullets?.[0] ?? entry.groups?.[0]?.bullets[0];

            return (
              <motion.article
                className={isExpanded ? "timeline-entry timeline-entry-expanded" : "timeline-entry"}
                custom={index}
                key={entryKey}
                {...getScrollItemProps(reduceMotion, 0.12)}
              >
                <motion.span
                  className="timeline-dot"
                  aria-hidden="true"
                  initial={reduceMotion ? false : { scale: 0.85, opacity: 0.6 }}
                  whileInView={reduceMotion ? undefined : { scale: 1, opacity: 1 }}
                  viewport={reduceMotion ? undefined : { once: true, amount: 0.2, margin: "0px 0px 12% 0px" }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                />
                <div className="timeline-entry-card">
                  <button
                    className="timeline-entry-toggle"
                    type="button"
                    aria-expanded={isExpanded}
                    aria-label={`${isExpanded ? "Collapse" : "Expand"} ${entry.company}`}
                    onClick={() =>
                      setExpandedEntries((current) => ({
                        ...current,
                        [entryKey]: !current[entryKey],
                      }))
                    }
                  >
                    <div>
                      <span className="timeline-date">{entry.period}</span>
                      <div className="timeline-company-row">
                        <h3>{entry.company}</h3>
                        {entry.logo && <TimelineLogo logo={entry.logo} />}
                        {entry.showToptalBadge && <ToptalTalentBadge focusable={false} size="small" />}
                      </div>
                      <div className="timeline-role-row">
                        <strong>{entry.role}</strong>
                        <span>
                          <Globe2 size={13} />
                          {entry.location}
                        </span>
                      </div>
                    </div>
                    <motion.span
                      className="timeline-chevron"
                      animate={{ rotate: isExpanded ? 90 : 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.28, ease: dropdownEase }}
                    >
                      <ChevronRight size={19} />
                    </motion.span>
                  </button>

                  {entry.websiteUrl && (
                    <TimelineSiteLink label={entry.company} url={entry.websiteUrl} />
                  )}

                  <AnimatePresence initial={false}>
                    {!isExpanded && preview && (
                      <motion.p
                        className="timeline-preview"
                        initial={reduceMotion ? false : { height: 0, marginTop: 0, opacity: 0, y: -4 }}
                        animate={{ height: "auto", marginTop: 15, opacity: 1, y: 0 }}
                        exit={reduceMotion ? undefined : { height: 0, marginTop: 0, opacity: 0, y: -4 }}
                        transition={{ duration: reduceMotion ? 0 : 0.2, ease: dropdownEase }}
                      >
                        {preview}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        className="timeline-entry-details"
                        initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1, transitionEnd: { overflow: "visible" } }}
                        exit={reduceMotion ? undefined : { height: 0, opacity: 0, overflow: "hidden" }}
                        transition={{ duration: reduceMotion ? 0 : 0.42, ease: dropdownEase }}
                      >
                        <motion.div
                          className="timeline-entry-details-inner"
                          initial={reduceMotion ? false : "hidden"}
                          animate="visible"
                          exit={reduceMotion ? undefined : "exit"}
                          variants={detailsContainer}
                        >
                          {entry.summary && (
                            <motion.p className="timeline-summary" variants={detailItem}>
                              {entry.summary}
                            </motion.p>
                          )}
                          {entry.clientLogos && (
                            <motion.div className="timeline-client-logos" variants={detailItem}>
                              <small>Featured client</small>
                              <div>
                                {entry.clientLogos.map((logo) => (
                                  <TimelineLogo key={logo.alt} logo={logo} variant="client" />
                                ))}
                              </div>
                            </motion.div>
                          )}
                          {entry.bullets && <OutcomeList bullets={entry.bullets} />}
                          {entry.groups?.map((group) => (
                            <motion.section className="timeline-client-group" key={group.title} variants={detailItem}>
                              <div className="timeline-client-group-heading">
                                <h4>{group.title}</h4>
                                {(group.logo || group.websiteUrl) && (
                                  <div className="timeline-client-group-meta">
                                    {group.logo && <TimelineLogo logo={group.logo} variant="client" />}
                                    {group.websiteUrl && <TimelineSiteLink label={group.title} url={group.websiteUrl} />}
                                  </div>
                                )}
                              </div>
                              <OutcomeList bullets={group.bullets} animate={false} />
                            </motion.section>
                          ))}
                          <motion.div
                            className="timeline-tech"
                            aria-label={`${entry.company} technologies`}
                            variants={detailItem}
                          >
                            {entry.technologies.map((tech, techIndex) => (
                              <small key={`${tech}-${techIndex}`}>{tech}</small>
                            ))}
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

function TimelineSiteLink({ label, url }: { label: string; url: string }) {
  return (
    <a className="timeline-site-link" href={url} target="_blank" rel="noreferrer" aria-label={`Visit ${label} site`}>
      Visit site
      <ArrowUpRight size={14} aria-hidden="true" />
    </a>
  );
}

function TimelineLogo({
  logo,
  variant = "company",
}: {
  logo: ExperienceLogo;
  variant?: "client" | "company";
}) {
  return (
    <span
      className={`timeline-logo-frame timeline-logo-frame-${variant} timeline-logo-format-${logo.format ?? "wide"} timeline-logo-surface-${logo.surface ?? "dark"}`}
    >
      <img alt={`${logo.alt} logo`} className="timeline-logo" loading="lazy" src={logo.src} />
    </span>
  );
}

function OutcomeList({ animate = true, bullets }: { animate?: boolean; bullets: string[] }) {
  return (
    <motion.ul variants={animate ? detailItem : undefined}>
      {bullets.map((bullet) => (
        <li key={bullet}>
          <span aria-hidden="true">›</span>
          {bullet}
        </li>
      ))}
    </motion.ul>
  );
}
