import { useEffect, useState, useRef } from "react";
import MagicRings from "./MagicRings";
import styles from "./LoadingScreen.module.css";

export default function LoadingScreen({ onFocusStart, onComplete }) {
  const [ringsDisappeared, setRingsDisappeared] = useState(false);
  const [backdropRevealed, setBackdropRevealed] = useState(false);
  const hasFinishedRef = useRef(false);

  // Speed: 1.5, Shader CYCLE = 3.45.
  // Single cycle completes around 3.25 / 1.5 = ~2.16s (2160ms)
  const speed = 1.5;
  const cycleDurationMs = (3.25 / speed) * 1000;

  const handleCycleComplete = () => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;

    // Immediately fade rings, reveal backdrop, and focus the hero page without any time gap
    setRingsDisappeared(true);
    setBackdropRevealed(true);
    onFocusStart?.();

    // Clean up loading screen overlay swiftly
    setTimeout(() => {
      document.body.style.overflow = "";
      onComplete?.();
    }, 200);
  };

  useEffect(() => {
    // Lock body scroll while loader is active
    document.body.style.overflow = "hidden";

    // Fallback safeguard timer matching the 1 cycle duration
    const fallbackTimer = setTimeout(() => {
      handleCycleComplete();
    }, cycleDurationMs + 100);

    return () => {
      clearTimeout(fallbackTimer);
      document.body.style.overflow = "";
    };
  }, [cycleDurationMs]);

  return (
    <div
      className={styles.overlay}
      role="status"
      aria-label="Loading portfolio"
    >
      {/* Dark background layer that remains opaque until rings have completely disappeared */}
      <div
        className={`${styles.backdropLayer} ${backdropRevealed ? styles.revealed : ""}`}
        aria-hidden="true"
      />

      {/* Subtle ambient center glow */}
      <div
        className={`${styles.ambientGlow} ${ringsDisappeared ? styles.fading : ""}`}
        aria-hidden="true"
      />

      {/* Fullscreen MagicRings canvas running for exactly one cycle */}
      <div className={`${styles.ringsFullscreen} ${ringsDisappeared ? styles.disappeared : ""}`}>
        <MagicRings
          color="#edeff5ff"
          colorTwo="#a6feffff"
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
          onCycleComplete={handleCycleComplete}
        />
      </div>
    </div>
  );
}
