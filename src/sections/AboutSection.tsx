import { motion } from "framer-motion";
import { SectionHeader } from "../components/ui/SectionHeader";
import { aboutParagraphs, profile, profileDetails } from "../data/portfolio";
import { getRevealProps, revealItem, sequenceContainer } from "../lib/animation";

type AboutSectionProps = {
  reduceMotion: boolean;
};

export function AboutSection({ reduceMotion }: AboutSectionProps) {
  return (
    <section className="section about-section" id="about">
      <motion.div className="portfolio-container about-layout" {...getRevealProps(reduceMotion, 0.24)}>
        <SectionHeader
          number="01"
          label="About"
          title="Verified expert in engineering."
          text="Senior full-stack ownership across SaaS platforms, mobile apps, AI-integrated products, and enterprise systems."
          align="center"
        />
        <motion.div className="about-content" variants={sequenceContainer}>
          <motion.div className="about-narrative" variants={revealItem}>
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <blockquote>{profile.amazingThing}</blockquote>
          </motion.div>

          <motion.div className="profile-detail-grid" variants={sequenceContainer}>
            {profileDetails.map((detail) => (
              <motion.article className="profile-detail-card" key={detail.label} variants={revealItem}>
                <span>{detail.label}</span>
                <strong>{detail.value}</strong>
                {detail.detail && <p>{detail.detail}</p>}
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
