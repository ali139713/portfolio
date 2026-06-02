type ScrollProgressProps = {
  progress: number;
};

export function ScrollProgress({ progress }: ScrollProgressProps) {
  return (
    <div
      aria-hidden="true"
      className="scroll-progress"
      style={{ transform: `scaleX(${progress})` }}
    />
  );
}
