import { motion } from "framer-motion";
import { SectionHeader } from "../components/ui/SectionHeader";
import { ToptalTalentBadge } from "../components/ui/ToptalTalentBadge";
import { profile } from "../data/portfolio";
import { getRevealProps, revealItem, sequenceContainer } from "../lib/animation";

type ContactSectionProps = {
  reduceMotion: boolean;
};

export function ContactSection({ reduceMotion }: ContactSectionProps) {
  const contactLinks = [
    {
      href: profile.linkedinUrl,
      brand: "linkedin",
      label: "LinkedIn",
      logoSrc: "https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg",
      value: "Ali Abdullah Azhar",
      external: true,
    },
    {
      href: profile.emailUrl,
      brand: "gmail",
      label: "Gmail",
      logoSrc: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg",
      value: profile.email,
      external: false,
    },
    {
      href: profile.githubUrl,
      brand: "github",
      label: "GitHub",
      logoSrc: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",
      value: "ali139713",
      external: true,
    },
    {
      href: profile.whatsappUrl,
      brand: "whatsapp",
      label: "WhatsApp",
      logoSrc: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
      value: profile.whatsapp,
      external: true,
    },
  ];

  return (
    <section className="section contact-section" id="contact">
      <motion.div className="portfolio-container contact-container" {...getRevealProps(reduceMotion, 0.24)}>
        <SectionHeader number="05" label="Contact" title="Let's build something exceptional." align="center" />
        <motion.p className="contact-subtext" variants={revealItem}>
          Available for senior full-stack builds, React Native delivery, SaaS architecture,
          performance repair, AI-integrated product systems, and engineering leadership through Toptal.
        </motion.p>
        <motion.div className="contact-cards" variants={sequenceContainer}>
          <motion.div className="contact-toptal-slot" variants={revealItem}>
            <ToptalTalentBadge />
          </motion.div>
          {contactLinks.map((link) => (
            <motion.a
              aria-label={
                link.external ? `${link.label}: ${link.value} (opens in a new tab)` : `${link.label}: ${link.value}`
              }
              className="contact-card"
              href={link.href}
              key={link.label}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer" : undefined}
              variants={revealItem}
            >
              <img
                alt=""
                aria-hidden="true"
                className={`contact-brand-logo contact-brand-logo-${link.brand}`}
                loading="lazy"
                src={link.logoSrc}
              />
              <span>{link.label}</span>
              <strong>{link.value}</strong>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
      <footer className="site-footer">
        <span>{profile.name}</span>
        <span>{profile.role}</span>
        <span>{profile.specialties}</span>
      </footer>
    </section>
  );
}
