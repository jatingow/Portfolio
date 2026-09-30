import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personalInfo } from "../data/data";
import { useSmoothScroll } from "../context/SmoothScrollContext";
import styles from "./Hero.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ theme, toggleTheme, onToggleSidebar }) {
  const { scrollTo } = useSmoothScroll();
  const heroRef = useRef(null);
  const titleWrapperRef = useRef(null);
  const bottomRowRef = useRef(null);
  const spotlightRef = useRef(null);
  const midgroundRef = useRef(null);

  // Smooth mouse parallax via RAF + lerp (zero React re-renders)
  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFinePointer || prefersReducedMotion) return;

    let mouseTargetX = 0;
    let mouseTargetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = null;

    const handleMouseMove = (e) => {
      const halfWidth = window.innerWidth / 2;
      const halfHeight = window.innerHeight / 2;
      mouseTargetX = (e.clientX - halfWidth) / halfWidth;
      mouseTargetY = (e.clientY - halfHeight) / halfHeight;
    };

    const render = () => {
      // Smooth lerp interpolation
      currentX += (mouseTargetX - currentX) * 0.055;
      currentY += (mouseTargetY - currentY) * 0.055;

      // Layer 1: Title subtle counter-tilt and displacement
      if (titleWrapperRef.current) {
        titleWrapperRef.current.style.transform = `translate3d(${(currentX * 14).toFixed(2)}px, ${(currentY * 10).toFixed(2)}px, 0)`;
      }

      // Layer 2: Midground coordinates & badge parallax
      if (midgroundRef.current) {
        midgroundRef.current.style.transform = `translate3d(${(-currentX * 22).toFixed(2)}px, ${(-currentY * 16).toFixed(2)}px, 0)`;
      }

      // Layer 3: Ambient spotlight tracking
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate(calc(-50% + ${(currentX * 45).toFixed(2)}px), calc(-50% + ${(currentY * 35).toFixed(2)}px))`;
      }

      rafId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // GSAP ScrollTrigger continuous scroll scrub
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !heroRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax scroll on Title: moves down, scales slightly down, fades
      gsap.to(titleWrapperRef.current, {
        y: 120,
        scale: 0.94,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Bottom Row fades out faster on scroll
      gsap.to(bottomRowRef.current, {
        y: 50,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "45% top",
          scrub: 0.8,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToNext = () => {
    scrollTo("#about", { offset: 0 });
  };

  const handleScrollToHero = (e) => {
    e.preventDefault();
    scrollTo("#hero", { offset: 0 });
  };

  return (
    <section ref={heroRef} className={styles.heroSection} id="hero">
      {/* Background subtle radial spotlight with mouse drift */}
      <div ref={spotlightRef} className={styles.ambientSpotlight} aria-hidden="true" />

      {/* Midground Parallax Layer */}
      <div ref={midgroundRef} className={styles.midgroundLayer} aria-hidden="true">
        <div className={styles.coordBadge}>
          <span className={styles.coordDot} />
          <span>28.6139° N, 77.2090° E</span>
        </div>
      </div>

      <div className={styles.heroContainer}>
        {/* Top Canvas Bar: Jatin Kumar (Left) & Controls (Right) */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className={styles.heroTopRow}
        >
          <a
            href="#hero"
            onClick={handleScrollToHero}
            className={styles.heroBrand}
            aria-label="Jatin Kumar Portfolio"
          >
            Jatin Kumar
          </a>

          <div className={styles.heroTopControls}>
            <button
              className={styles.themeToggleBtn}
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              title="Toggle theme"
              type="button"
            >
              {theme === "dark" ? (
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            <button
              className={styles.menuTriggerBtn}
              onClick={onToggleSidebar}
              aria-label="Open navigation menu"
              title="Open navigation"
              type="button"
            >
              <span className={styles.menuBtnText}>MENU</span>
              <span className={styles.menuBars} aria-hidden="true">
                <span className={styles.menuBar} />
                <span className={styles.menuBar} />
              </span>
            </button>
          </div>
        </motion.div>

        {/* Main Title Left-Aligned with Layered Parallax */}
        <div className={styles.titleArea}>
          <div ref={titleWrapperRef} className={styles.titleWrapper}>
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className={styles.heroTitle}>
                <span className={styles.titleLine}>FULL-STACK</span>
                <span className={styles.titleLine}>DEVELOPER</span>
              </h1>
            </motion.div>
          </div>
        </div>

        {/* Bottom Controls Row: Scroll Down Badge (Left) & Open To Work (Right) */}
        <div ref={bottomRowRef} className={styles.heroBottomRow}>
          {/* Bottom Left: Circular Rotating "SCROLL DOWN" Stamp */}
          <motion.button
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={handleScrollToNext}
            className={styles.scrollBadgeBtn}
            aria-label="Scroll down to content"
          >
            <svg viewBox="0 0 100 100" className={styles.scrollSvg}>
              <defs>
                <path
                  id="scrollTextPath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                />
              </defs>
              <text className={styles.scrollSvgText}>
                <textPath xlinkHref="#scrollTextPath" startOffset="0%">
                  SCROLL DOWN ✱ SCROLL DOWN ✱
                </textPath>
              </text>
            </svg>
            <div className={styles.centerAsterisk}>✱</div>
          </motion.button>

          {/* Bottom Right: Open To Work & Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={styles.openToWorkBox}
          >
            <div className={styles.openToWorkHeader}>
              <span className={styles.openToWorkText}>OPEN TO WORK</span>
              <span className={styles.sparkleIcon}>✱</span>
            </div>
            <span className={styles.locationSubtext}>Based in {personalInfo.location}</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
