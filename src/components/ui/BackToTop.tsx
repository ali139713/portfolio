import { ArrowUp } from "lucide-react";

type BackToTopProps = {
  visible: boolean;
  onClick: () => void;
};

export function BackToTop({ visible, onClick }: BackToTopProps) {
  return (
    <button
      aria-label="Back to top"
      className={visible ? "back-to-top back-to-top-visible" : "back-to-top"}
      type="button"
      onClick={onClick}
    >
      <ArrowUp size={18} aria-hidden="true" />
    </button>
  );
}
