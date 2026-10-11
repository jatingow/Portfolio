import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/data";
import OptionWheel from "./OptionWheel";
import styles from "./Projects.module.css";

export default function Projects() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const activeProject = projects[activeIdx] || projects[0];
  const projectTitles = useMemo(() => projects.map((p) => p.title), []);

  const handleWheelChange = (index) => {
    if (index !== activeIdx && index >= 0 && index < projects.length) {
      setActiveIdx(index);
      setIsFlipped(false);
    }
  };

  const handlePrev = () => {
    const prevIdx = Math.max(0, activeIdx - 1);
    setActiveIdx(prevIdx);
    setIsFlipped(false);
  };

  const handleNext = () => {
    const nextIdx = Math.min(projects.length - 1, activeIdx + 1);
    setActiveIdx(nextIdx);
    setIsFlipped(false);
  };

  const toggleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <section className={styles.section} id="projects">
      <div className="container">
        {/* Section Header Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "0px 0px -50px 0px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="section-header-eyebrow"
        >
          <div className="section-tag">
            <span className="section-asterisk">✱</span>
            <span>PROJECTS</span>
          </div>
          <span className={styles.countIndicator}>
            (0{activeIdx + 1} / 0{projects.length} · SCROLL WHEEL TO SWITCH)
          </span>
        </motion.div>

        {/* Main Showcase Layout: Left Flip Card + Right OptionWheel */}
        <div className={styles.showcaseGrid}>
          {/* ── LEFT: Single Interactive 3D Flip Card ── */}
          <div className={styles.cardColumn}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className={styles.cardContainer}
                onClick={toggleFlip}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleFlip();
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`Project card for ${activeProject.title}. Showing ${
                  isFlipped ? "details" : "image preview"
                }. Click or press Enter to flip.`}
                aria-pressed={isFlipped}
              >
                <div
                  className={`${styles.cardInner} ${
                    isFlipped ? styles.isFlipped : ""
                  }`}
                >
                  {/* ── FRONT FACE (Only the project image is seen) ── */}
                  <div className={`${styles.cardFace} ${styles.cardFront}`}>
                    <img
                      src={activeProject.image}
                      alt={activeProject.title}
                      className={styles.frontImage}
                      loading="eager"
                      draggable="false"
                    />

                    {/* Gradient overlay for contrast */}
                    <div className={styles.frontOverlay} />

                    {/* Hover Prompt */}
                    <div className={styles.flipPrompt}>
                      <span className={styles.flipPromptIcon}>↻</span>
                      <span className={styles.flipPromptText}>
                        Click to flip for details
                      </span>
                    </div>

                    {/* Corner Tag */}
                    <div className={styles.frontCornerTag}>
                      <span className={styles.cornerDot} />
                      <span className={styles.cornerIndex}>
                        0{activeProject.id}
                      </span>
                      <span className={styles.cornerTitle}>
                        {activeProject.title}
                      </span>
                    </div>
                  </div>

                  {/* ── BACK FACE (Details of that project) ── */}
                  <div className={`${styles.cardFace} ${styles.cardBack}`}>
                    {/* Top Meta Row */}
                    <div className={styles.backHeader}>
                      <div className={styles.metaPills}>
                        <span className={styles.typeBadge}>
                          {activeProject.type}
                        </span>
                        <span className={styles.yearBadge}>
                          {activeProject.year}
                        </span>
                      </div>

                      <button
                        type="button"
                        className={styles.flipBackBtn}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFlip();
                        }}
                        aria-label="Flip back to project image"
                        title="Flip back to project image"
                      >
                        <span className={styles.flipBackIcon}>↺</span>
                        <span className={styles.flipBackLabel}>Flip back</span>
                      </button>
                    </div>

                    {/* Content Body */}
                    <div className={styles.backBody}>
                      <div className={styles.titleGroup}>
                        <h3 className={styles.projectTitle}>
                          {activeProject.title}
                        </h3>
                        <p className={styles.projectSubtitle}>
                          {activeProject.subtitle}
                        </p>
                      </div>

                      <p className={styles.description}>
                        {activeProject.desc}
                      </p>

                      {activeProject.metrics && (
                        <div className={styles.metricsBox}>
                          <span className={styles.metricsIcon}>⚡</span>
                          <span className={styles.metricsText}>
                            {activeProject.metrics}
                          </span>
                        </div>
                      )}

                      {/* Tech Tags */}
                      <div className={styles.tagList}>
                        {activeProject.tags.map((tag) => (
                          <span key={tag} className={styles.tagPill}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className={styles.backFooter}>
                      <div className={styles.actionsRow}>
                        <a
                          href={activeProject.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.viewProjectBtn}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>EXPLORE PROJECT</span>
                          <span className={styles.btnArrow}>↗</span>
                        </a>

                        <a
                          href={activeProject.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.githubBtn}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>SOURCE CODE</span>
                          <span>⌨</span>
                        </a>
                      </div>

                      <span className={styles.flipBackHint}>
                        Click card to flip back
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── RIGHT: OptionWheel Interactive Selector Panel ── */}
          <div className={styles.wheelColumn}>
            <div className={styles.wheelPanel}>
              <div className={styles.wheelHeader}>
                <div className={styles.wheelBadge}>
                  <span className={styles.wheelDot} />
                  <span>SELECT PROJECT</span>
                </div>
                <span className={styles.wheelHint}>⇅ Scroll or drag</span>
              </div>

              {/* React Bits <OptionWheel /> */}
              <div className={styles.wheelContainer}>
                <OptionWheel
                  items={projectTitles}
                  defaultSelected={activeIdx}
                  textColor="var(--tx-muted)"
                  activeColor="var(--accent-cyan)"
                  side="right"
                  fontSize={2.8}
                  spacing={1.6}
                  curve={1.25}
                  tilt={13}
                  blur={2.25}
                  fade={0.26}
                  smoothing={200}
                  inset={54}
                  loop={false}
                  draggable
                  onChange={handleWheelChange}
                />
              </div>

              {/* Wheel Controls Footer */}
              <div className={styles.wheelFooter}>
                <button
                  type="button"
                  className={styles.stepBtn}
                  onClick={handlePrev}
                  disabled={activeIdx === 0}
                  aria-label="Previous project"
                >
                  ↑ PREV
                </button>

                <span className={styles.projectPillCount}>
                  0{activeIdx + 1} / 0{projects.length}
                </span>

                <button
                  type="button"
                  className={styles.stepBtn}
                  onClick={handleNext}
                  disabled={activeIdx === projects.length - 1}
                  aria-label="Next project"
                >
                  NEXT ↓
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
