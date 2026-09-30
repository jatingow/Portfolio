import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/data";
import styles from "./Projects.module.css";

export default function Projects() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeProject = projects[activeIdx];
  const cardRef = useRef(null);

  // Subtle interactive 3D card tilt effect on mouse move
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <section className={styles.section} id="projects">
      <div className="container">
        {/* Section Header Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="section-header-eyebrow"
        >
          <div className="section-tag">
            <span className="section-asterisk">✱</span>
            <span>02 / SELECTED WORKS</span>
          </div>
          <span className={styles.countIndicator}>
            (0{activeIdx + 1} / 0{projects.length})
          </span>
        </motion.div>

        {/* Section Title & Tabs Row */}
        <div className={styles.headerRow}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-main-heading">CRAFTED WITH PRECISION</h2>
            <p className="section-subtext">
              Real-world web applications built with a focus on performance, clean architecture, and delightful user interaction.
            </p>
          </motion.div>

          {/* Interactive Project Switcher Tabs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={styles.tabButtons}
          >
            {projects.map((proj, i) => (
              <button
                key={proj.id}
                onClick={() => setActiveIdx(i)}
                className={`${styles.tabBtn} ${activeIdx === i ? styles.tabBtnActive : ""}`}
                aria-label={`View project ${proj.title}`}
              >
                <span className={styles.tabIndex}>0{i + 1}</span>
                <span className={styles.tabTitle}>{proj.title}</span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Interactive Selected Project Showcase Card */}
        <div className={styles.showcaseWrapper}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={styles.projectCard}
            >
              {/* Media Preview Column */}
              <div className={styles.mediaColumn}>
                <div className={styles.mockupFrame}>
                  <div className={styles.frameHeader}>
                    <div className={styles.windowDots}>
                      <span className={`${styles.dot} ${styles.dotRed}`} />
                      <span className={`${styles.dot} ${styles.dotYellow}`} />
                      <span className={`${styles.dot} ${styles.dotGreen}`} />
                    </div>
                    <div className={styles.frameAddressBar}>
                      https://{activeProject.title.toLowerCase()}.jatin.dev
                    </div>
                  </div>

                  <div className={styles.imageContainer}>
                    <img
                      src={activeProject.image}
                      alt={`${activeProject.title} project preview`}
                      className={styles.mockupImage}
                      loading="lazy"
                    />
                    <div className={styles.imageOverlayGradient} />
                  </div>
                </div>
              </div>

              {/* Information & Action Column */}
              <div className={styles.infoColumn}>
                <div className={styles.metaRow}>
                  <span className={styles.typeBadge}>{activeProject.type}</span>
                  <span className={styles.yearBadge}>{activeProject.year}</span>
                </div>

                <h3 className={styles.projectTitle}>
                  {activeProject.title}
                  <span className={styles.titleSub}> — {activeProject.subtitle}</span>
                </h3>

                <p className={styles.description}>{activeProject.desc}</p>

                {activeProject.metrics && (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={styles.metricsBox}
                  >
                    <span className={styles.metricsIcon}>⚡</span>
                    <span className={styles.metricsText}>{activeProject.metrics}</span>
                  </motion.div>
                )}

                {/* Tech Tags */}
                <div className={styles.tagList}>
                  {activeProject.tags.map((tag) => (
                    <span key={tag} className={styles.tagPill}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className={styles.actionsRow}>
                  <motion.a
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    href={activeProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.viewProjectBtn}
                  >
                    <span>EXPLORE PROJECT</span>
                    <span className={styles.btnArrow}>↗</span>
                  </motion.a>

                  <motion.a
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    href={activeProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.githubBtn}
                  >
                    <span>SOURCE CODE</span>
                    <span>⌨</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Quick List Overview at Bottom */}
        <div className={styles.allProjectsList}>
          {projects.map((proj, idx) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ x: 6 }}
              className={`${styles.miniRow} ${activeIdx === idx ? styles.miniRowActive : ""}`}
              onClick={() => setActiveIdx(idx)}
              role="button"
              tabIndex={0}
            >
              <div className={styles.miniLeft}>
                <span className={styles.miniId}>0{idx + 1}</span>
                <span className={styles.miniName}>{proj.title}</span>
                <span className={styles.miniType}>/ {proj.type}</span>
              </div>
              <div className={styles.miniRight}>
                <span className={styles.miniArrow}>
                  {activeIdx === idx ? "ACTIVE SELECTION ●" : "SWITCH TO PROJECT →"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
