import { useEffect, useState } from "react";
import CometDial from "./CometDial";
import styles from "./LoadingScreen.module.css";

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [statusText, setStatusText] = useState("");

  useEffect(() => {
    // Lock body scroll while loader is active
    document.body.style.overflow = "hidden";

    let current = 0;
    const interval = setInterval(() => {
      // Natural non-linear easing towards 100%
      let increment = 1;
      if (current < 30) {
        increment = Math.floor(Math.random() * 4) + 2;
      } else if (current < 70) {
        increment = Math.floor(Math.random() * 3) + 1;
      } else if (current < 90) {
        increment = Math.floor(Math.random() * 2) + 1;
      } else {
        increment = 2;
      }

      current = Math.min(100, current + increment);
      setProgress(current);

      // if (current < 35) {
      //   setStatusText("INITIALIZING CREATIVE ENGINE");
      // } else if (current < 75) {
      //   setStatusText("LOADING ASSETS & ARCHITECTURE");
      // } else if (current < 100) {
      //   setStatusText("FINALIZING INTERFACE");
      // } else {
      //   setStatusText("EXPERIENCE READY");
      // }

      if (current >= 100) {
        clearInterval(interval);
        // Hold briefly at 100% so user registers completion
        setTimeout(() => {
          setIsExiting(true);
          // Wait for smooth exit transition to finish
          setTimeout(() => {
            document.body.style.overflow = "";
            onComplete?.();
          }, 700);
        }, 350);
      }
    }, 32);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <div
      className={`${styles.overlay} ${isExiting ? styles.exiting : ""}`}
      // aria-label="Loading portfo"
      role="status"
    >
      {/* Background ambient glow */}
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={styles.content}>
        {/* Minimalist Top Brand Header
        <div className={styles.topBrand}>
          <span className={styles.brandName}>JATIN KUMAR</span>
          <span className={styles.brandDivider}>/</span>
          <span className={styles.brandSub}>PORTFOLIO</span>
        </div> */}

        {/* The React Bits CometDial */}
        <div className={styles.dialContainer}>
          <CometDial
            value={progress}
            min={0}
            max={100}
            step={1}
            unit="%"
            // label="Loading Progress"
            accent="#38bdf8"
            ink="#ffffff"
            size={240}
            sweep={320}
            thickness={5}
            speed={40}
            tapBounce={0.15}
            flickBounce={0.1}
            momentum={1}
            cometReach={180}
            cometWidth={12}
            disabled={false}
          />
        </div>

        {/* Status indicator readout */}
        <div className={styles.statusBlock}>
          <span className={styles.statusDot} />
          <span className={styles.statusText}>{statusText}</span>
        </div>
      </div>
    </div>
  );
}
