import { useEffect, useState, useRef } from "react";
import MagicRings from "./MagicRings";
import styles from "./LoadingScreen.module.css";

export default function LoadingScreen({ onFocusStart, onComplete }) {
  const [isFocusing, setIsFocusing] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const hasFinishedRef = useRef(false);

  // Speed: 1.5, Shader CYCLE = 3.45.
  // Exactly 1 cycle duration = 3.45 / 1.5 = 2.30s (2300ms)
  const speed = 1.5;
  const cycleDurationMs = (3.45 / speed) * 1000;
  // Hero focus begins exactly 2 seconds before the cycle ends:
  const focusLeadMs = 2000;
  const focusStartDelayMs = Math.max(50, cycleDurationMs - focusLeadMs);

  const handleFinish = () => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    setIsExiting(true);
    setTimeout(() => {
      document.body.style.overflow = "";
      onComplete?.();
    }, 150);
  };

  useEffect(() => {
    // Lock body scroll while loader is active
    document.body.style.overflow = "hidden";

    // Exactly 2 seconds before rings end, trigger hero focus-in
    const focusTimer = setTimeout(() => {
      setIsFocusing(true);
      onFocusStart?.();
    }, focusStartDelayMs);

    // Fallback safeguard timer matching the 1 cycle duration
    const fallbackTimer = setTimeout(() => {
      handleFinish();
    }, cycleDurationMs + 100);

    return () => {
      clearTimeout(focusTimer);
      clearTimeout(fallbackTimer);
      document.body.style.overflow = "";
    };
  }, [focusStartDelayMs, cycleDurationMs, onFocusStart]);

  return (
    <div
      className={styles.overlay}
      role="status"
      aria-label="Loading portfolio"
    >
      {/* Dark background layer that smoothly fades to transparent 2s before rings end */}
      <div
        className={`${styles.backdropLayer} ${isFocusing ? styles.focusing : ""}`}
        aria-hidden="true"
      />

      {/* Subtle ambient center glow */}
      <div
        className={`${styles.ambientGlow} ${isFocusing ? styles.focusing : ""}`}
        aria-hidden="true"
      />

      {/* Fullscreen MagicRings canvas running for exactly one cycle */}
      <div className={`${styles.ringsFullscreen} ${isExiting ? styles.exiting : ""}`}>
        <MagicRings
          color="#0e36b0"
          colorTwo="#42fcff"
          ringCount={6}
          speed={speed}
          attenuation={10}
          lineThickness={2}
          baseRadius={0.35}
          radiusStep={0.1}
          scaleRate={0.1}
          opacity={1}
          blur={0}
          noiseAmount={0.1}
          rotation={0}
          ringGap={1.5}
          fadeIn={0.7}
          fadeOut={0.5}
          followMouse={false}
          mouseInfluence={0.2}
          hoverScale={1.2}
          parallax={0.05}
          clickBurst={false}
          oneCycle={true}
          onCycleComplete={handleFinish}
        />
      </div>
    </div>
  );
}
