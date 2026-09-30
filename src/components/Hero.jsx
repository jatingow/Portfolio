import { motion } from "framer-motion";
import { personalInfo } from "../data/data";
import styles from "./Hero.module.css";

export default function Hero({ theme, toggleTheme, onToggleSidebar }) {
  const scrollToNext = () => {
    const nextSection =
      document.getElementById("about") ||
      document.getElementById("intro-overview") ||
      document.getElementById("projects");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className={styles.heroSection} id="hero">
      {/* Background subtle radial spotlight */}
      <div className={styles.ambientSpotlight} aria-hidden="true" />

      <div className={styles.heroContainer}>
        {/* Top Canvas Bar: Jatin Kumar (Left) & Controls (Right) */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={styles.heroTopRow}
        >
          <a href="#hero" className={styles.heroBrand} aria-label="Jatin Kumar Portfolio">
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

        {/* Main Title Left-Aligned */}
        <div className={styles.titleArea}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={styles.titleWrapper}
          >
            <h1 className={styles.heroTitle}>
              <span className={styles.titleLine}>FULL-STACK</span>
              <span className={styles.titleLine}>DEVELOPER</span>
            </h1>
          </motion.div>
        </div>

        {/* Bottom Controls Row: Scroll Down Badge (Left) & Open To Work (Right) */}
        <div className={styles.heroBottomRow}>
          {/* Bottom Left: Circular Rotating "SCROLL DOWN" Stamp */}
          <motion.button
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={scrollToNext}
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
