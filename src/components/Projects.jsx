import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/data";
import OptionWheel from "./OptionWheel";
import styles from "./Projects.module.css";

export default function Projects() {
  const [activeIdx, setActiveIdx] = useState(0);

  const activeProject = projects[activeIdx] || projects[0];
  const projectTitles = useMemo(() => projects.map((p) => p.title), []);

  const handleWheelChange = (index) => {
    if (index !== activeIdx && index >= 0 && index < projects.length) {
      setActiveIdx(index);
    }
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
            <span>PROJECTS</span>
          </div>
          <span className={styles.countIndicator}>
            (0{activeIdx + 1} / 0{projects.length} · SCROLL WHEEL TO EXPLORE)
          </span>
        </motion.div>
      </div>

      {/* Main Showcase Layout: Wheel on left, Project Showcase on right */}
      <div className={styles.showcaseWrapper}>
        {/* ── LEFT: OptionWheel at the very left end of screen ── */}
        <div className={styles.wheelLeftSection} data-lenis-prevent="true">
          <OptionWheel
            items={projectTitles}
            defaultSelected={activeIdx}
            textColor="#71717a"
            activeColor="#ffffff"
            side="left"
            fontSize={3.4}
            spacing={1.6}
            curve={1.25}
            tilt={13}
            blur={2.25}
            fade={0.26}
            smoothing={200}
            inset={0}
            loop={false}
            draggable
            onChange={handleWheelChange}
          />
        </div>

        {/* ── RIGHT: Project Showcase (Clickable Image on Left, Details on Right) ── */}
        <div className={styles.projectMainSection}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={styles.projectCard}
            >
              {/* Clickable Image (Redirects to project link anywhere on the image) */}
              <a
                href={activeProject.live || activeProject.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.imageContainer}
                aria-label={`Visit live project for ${activeProject.title}`}
                title={`Visit live project: ${activeProject.title}`}
              >
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className={styles.projectImage}
                  loading="eager"
                  draggable="false"
                />

                <div className={styles.imageOverlay} />

                {/* Corner Tag */}
                <div className={styles.imageCornerTag}>
                  <span className={styles.cornerDot} />
                  <span className={styles.cornerIndex}>0{activeIdx + 1}</span>
                  <span className={styles.cornerTitle}>{activeProject.title}</span>
                </div>

                {/* Hover Visit Prompt */}
                <div className={styles.visitPrompt}>
                  <span>VISIT PROJECT</span>
                  <span className={styles.visitArrow}>↗</span>
                </div>
              </a>

              {/* Project Details Panel (Shown on the Right Side of Image) */}
              <div className={styles.detailsPanel}>
                {/* Header Row: Meta Badges */}
                <div className={styles.detailsHeader}>
                  <div className={styles.metaPills}>
                    <span className={styles.typeBadge}>
                      {activeProject.type}
                    </span>
                    <span className={styles.yearBadge}>
                      {activeProject.year}
                    </span>
                  </div>
                  <span className={styles.projectIndexBadge}>
                    0{activeIdx + 1} / 0{projects.length}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <div className={styles.titleGroup}>
                  <h3 className={styles.projectTitle}>
                    {activeProject.title}
                  </h3>
                  <p className={styles.projectSubtitle}>
                    {activeProject.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className={styles.description}>
                  {activeProject.desc}
                </p>

                {/* Tech Tags */}
                <div className={styles.tagList}>
                  {activeProject.tags.map((tag) => (
                    <span key={tag} className={styles.tagPill}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions Row */}
                <div className={styles.actionsRow}>
                  <a
                    href={activeProject.live || activeProject.demo || activeProject.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.viewProjectBtn}
                  >
                    <span>EXPLORE PROJECT</span>
                    <span className={styles.btnArrow}>↗</span>
                  </a>

                  <a
                    href={activeProject.github || activeProject.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.githubBtn}
                  >
                    <span>SOURCE CODE</span>
                    <span>⌨</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
