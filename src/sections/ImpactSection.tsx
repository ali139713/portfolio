import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "../components/ui/SectionHeader";
import { metrics } from "../data/portfolio";
import { getRevealProps, revealItem, sequenceContainer } from "../lib/animation";

type ImpactSectionProps = {
  reduceMotion: boolean;
};

export function ImpactSection({ reduceMotion }: ImpactSectionProps) {
  return (
    <section className="section impact-section" id="impact">
      <motion.div className="portfolio-container" {...getRevealProps(reduceMotion, 0.18)}>
        <SectionHeader
          number="04"
          label="Impact"
          title="Verified impact signals."
          text="Delivery numbers, adoption milestones, performance gains, and business outcomes from the supplied profile."
          align="center"
        />
        <motion.div className="metrics-grid" variants={sequenceContainer}>
          {metrics.map((metric) => (
            <MetricTile
              key={metric.label}
              label={metric.label}
              reduceMotion={reduceMotion}
              suffix={metric.suffix}
              value={metric.value}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

type MetricTileProps = {
  label: string;
  reduceMotion: boolean;
  suffix: string;
  value: number;
};

function MetricTile({ label, reduceMotion, suffix, value }: MetricTileProps) {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.45 });
  const [displayValue, setDisplayValue] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (!inView || reduceMotion) {
      if (reduceMotion) {
        setDisplayValue(value);
      }
      return;
    }

    let frame = 0;
    const start = performance.now();
    const duration = 1200;

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
  }, [inView, reduceMotion, value]);

  const formattedValue = new Intl.NumberFormat("en-US").format(displayValue);
  const valueClassName = value >= 10000 ? "metric-value metric-value-long" : "metric-value";

  return (
    <motion.article className="metric-tile" ref={ref} variants={revealItem}>
      <strong className={valueClassName}>
        {formattedValue}
        {suffix}
      </strong>
      <span>{label}</span>
    </motion.article>
  );
}
