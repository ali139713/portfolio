import type { CSSProperties } from "react";
import type { SimpleIcon } from "simple-icons";

type SimpleIconMarkProps = {
  className?: string;
  icon: SimpleIcon;
  label: string;
  tone?: string;
};

export function SimpleIconMark({ className = "", icon, label, tone = `#${icon.hex}` }: SimpleIconMarkProps) {
  return (
    <span
      className={`simple-icon-mark ${className}`.trim()}
      style={{ "--logo-tone": tone } as CSSProperties}
      aria-hidden="true"
      title={label}
    >
      <svg viewBox="0 0 24 24" role="img">
        <path d={icon.path} />
      </svg>
    </span>
  );
}
