import { motion } from "framer-motion";
import { revealItem } from "../../lib/animation";

type SectionHeaderProps = {
  number: string;
  label: string;
  title: string;
  text?: string;
  align?: "left" | "center";
};

export function SectionHeader({ number, label, title, text, align = "left" }: SectionHeaderProps) {
  return (
    <motion.div className={`section-header ${align === "center" ? "section-header-center" : ""}`} variants={revealItem}>
      <span className="ghost-number" aria-hidden="true">
        {number}
      </span>
      <span className="section-label">{label}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </motion.div>
  );
}
