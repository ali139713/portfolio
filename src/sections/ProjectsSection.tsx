import { motion } from "framer-motion";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { SectionHeader } from "../components/ui/SectionHeader";
import { featuredProjects } from "../data/portfolio";
import { getRevealProps, revealItem, sequenceContainer } from "../lib/animation";

type ProjectsSectionProps = {
  reduceMotion: boolean;
};

export function ProjectsSection({ reduceMotion }: ProjectsSectionProps) {
  return (
    <section className="section projects-section" id="projects">
      <motion.div className="portfolio-container" {...getRevealProps(reduceMotion)}>
        <SectionHeader
          number="03"
          label="Projects"
          title="Products built for real-world scale."
          text="Selected platforms across AI, mobile, healthcare, security, and enterprise systems."
        />

        <motion.div className="featured-projects" variants={sequenceContainer}>
          {featuredProjects.map((project, index) => (
            <motion.article
              className={index % 2 === 1 ? "featured-project featured-project-reverse" : "featured-project"}
              key={project.title}
              variants={revealItem}
            >
              <div className="featured-copy">
                <span className="project-number" aria-hidden="true">
                  {project.number}
                </span>
                <span className="project-category">{project.category}</span>
                <div className="project-title-row">
                  <h3>{project.title}</h3>
                  {project.logo && <img src={project.logo.src} alt={`${project.logo.alt} logo`} />}
                </div>
                <p>{project.description}</p>
                <div className="tech-pills" aria-label={`${project.title} technologies`}>
                  {project.tech.map((tech) => (
                    <small key={tech}>{tech}</small>
                  ))}
                </div>
                <div className="project-actions">
                  <a className="button button-primary" href={project.websiteUrl} target="_blank" rel="noreferrer">
                    Visit project
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.aside className="projects-disclaimer" variants={revealItem}>
          <ShieldCheck size={20} aria-hidden="true" />
          <p>
            Ali Abdullah Azhar has contributed to more than a hundred projects. This section highlights a small
            selection because client confidentiality, company policies, and privacy restrictions prevent many
            engagements from being showcased publicly.
          </p>
        </motion.aside>
      </motion.div>
    </section>
  );
}
