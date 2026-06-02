import type { CSSProperties } from "react";
import { brandIcons, brandLogoImages } from "../../lib/icons";

type TechLogoProps = {
  name: string;
};

export function TechLogo({ name }: TechLogoProps) {
  const icon = brandIcons[name];
  const image = brandLogoImages[name];

  if (!icon) {
    if (image) {
      return (
        <span
          className="tech-logo"
          style={{ "--logo-tone": image.tone } as CSSProperties}
          title={name}
          aria-label={name}
        >
          <img src={image.src} alt="" loading="lazy" />
          <span>{name}</span>
        </span>
      );
    }

    return (
      <span className="tech-logo tech-logo-text" title={name} aria-label={name}>
        <span>{name}</span>
      </span>
    );
  }

  return (
    <span
      className="tech-logo"
      style={{ "--logo-tone": `#${icon.hex}` } as CSSProperties}
      title={name}
      aria-label={name}
    >
      <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
        <path d={icon.path} />
      </svg>
      <span>{name}</span>
    </span>
  );
}
