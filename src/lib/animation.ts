import type { MotionProps, Variants, ViewportOptions } from "framer-motion";

export type RevealDirection = "up" | "left" | "right";

/** Smooth deceleration for scroll sequences */
export const scrollEase = [0.16, 1, 0.3, 1] as const;

const itemTransition = {
  duration: 1,
  ease: scrollEase,
};

/** One consistent motion path sitewide — gentle rise into place */
const sequenceMotion = {
  hidden: {
    opacity: 0,
    x: 0,
    y: 18,
    filter: "blur(4px)",
    scale: 0.994,
  },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: itemTransition,
  },
};

/** Start animating slightly before elements reach the fold */
export function scrollViewport(amount = 0.18): ViewportOptions {
  return {
    once: true,
    amount,
    margin: "0px 0px 12% 0px",
  };
}

/** Parent wrapper — children reveal one after another in the same direction */
export const sequenceContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.06,
    },
  },
};

/** @deprecated Use sequenceContainer */
export const revealContainer = sequenceContainer;

/** @deprecated Use sequenceContainer */
export const cardContainer = sequenceContainer;

export function revealFrom(_direction: RevealDirection = "up"): Variants {
  return sequenceMotion;
}

export const revealItem = sequenceMotion;

export const cardItem = sequenceMotion;

export function getRevealProps(reduceMotion: boolean, amount = 0.18): MotionProps {
  if (reduceMotion) {
    return { initial: false };
  }

  return {
    initial: "hidden",
    whileInView: "show",
    viewport: scrollViewport(amount),
    variants: sequenceContainer,
  };
}

/** Single-item scroll reveal — same motion as sequenced children */
export function getScrollItemProps(reduceMotion: boolean, amount = 0.14): MotionProps {
  if (reduceMotion) {
    return { initial: false };
  }

  return {
    initial: "hidden",
    whileInView: "show",
    viewport: scrollViewport(amount),
    variants: revealItem,
  };
}
