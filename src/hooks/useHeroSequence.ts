import { useEffect, useState } from "react";

export function useHeroSequence(segments: string[], reduceMotion: boolean) {
  const [parts, setParts] = useState(() => (reduceMotion ? segments : segments.map(() => "")));
  const [activeIndex, setActiveIndex] = useState(reduceMotion ? -1 : 0);
  const [done, setDone] = useState(reduceMotion);

  useEffect(() => {
    if (reduceMotion) {
      setParts(segments);
      setActiveIndex(-1);
      setDone(true);
      return;
    }

    let cancelled = false;
    let timeoutId = 0;
    const sleep = (delay: number) =>
      new Promise<void>((resolve) => {
        timeoutId = window.setTimeout(resolve, delay);
      });

    const charDelay = (segmentIndex: number, char: string) => {
      if (segmentIndex === 3) {
        return char === " " ? 5 : 3;
      }

      if (segmentIndex === 2) {
        return char === " " ? 12 : char === "," || char === "." ? 45 : 8;
      }

      return char === " " ? 18 : char === "·" ? 52 : 12;
    };

    setParts(segments.map(() => ""));
    setActiveIndex(0);
    setDone(false);

    const run = async () => {
      await sleep(180);

      for (let segmentIndex = 0; segmentIndex < segments.length; segmentIndex += 1) {
        const segment = segments[segmentIndex];
        setActiveIndex(segmentIndex);

        for (let charIndex = 1; charIndex <= segment.length; charIndex += 1) {
          if (cancelled) {
            return;
          }

          setParts((current) =>
            current.map((part, index) => (index === segmentIndex ? segment.slice(0, charIndex) : part)),
          );
          await sleep(charDelay(segmentIndex, segment[charIndex] ?? ""));
        }

        setParts((current) =>
          current.map((part, index) => (index === segmentIndex ? segment : part)),
        );

        if (segmentIndex < segments.length - 1) {
          await sleep(segmentIndex === 1 ? 120 : 70);
        }
      }

      if (!cancelled) {
        setParts(segments);
        setActiveIndex(-1);
        setDone(true);
      }
    };

    void run();

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [reduceMotion, segments]);

  return { activeIndex, done, parts };
}
