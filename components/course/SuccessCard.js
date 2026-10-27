import { useEffect } from "react";
import styles from "../../styles/course.module.scss";

export default function SuccessCard({ title, children, confetti = false }) {
  useEffect(() => {
    if (!confetti) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return undefined;

    let cancelled = false;
    let timer;
    import("canvas-confetti").then(({ default: fire }) => {
      if (cancelled) return;
      const colors = ["#365B6D", "#1F9D63", "#F5B83D", "#E8606D", "#7FB7D6"];
      fire({
        particleCount: 90,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      fire({
        particleCount: 90,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.7 },
        colors,
      });
      timer = setTimeout(
        () =>
          fire({ particleCount: 120, spread: 110, origin: { y: 0.5 }, colors }),
        350,
      );
    });
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [confetti]);

  return (
    <div className={`${styles.card} ${styles.successWrap}`} role="status">
      <svg
        className={styles.successIcon}
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <circle className={styles.successCircle} cx="50" cy="50" r="46" />
        <path className={styles.successTick} d="M30 52 L45 66 L71 36" />
      </svg>
      <h1 className="h3 mb-3">{title}</h1>
      {children}
    </div>
  );
}
