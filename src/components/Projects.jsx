import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../data/data";
import styles from "./Projects.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeProject = projects[activeIdx];
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const parallaxImgRef = useRef(null);

  // Smooth mouse tilt via RAF with lerp
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;
    let rafId = null;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      targetRotX = ((y - centerY) / centerY) * -5;
      targetRotY = ((x - centerX) / centerX) * 5;
    };

    const handleMouseLeave = () => {
      targetRotX = 0;
      targetRotY = 0;
    };

    const render = () => {
      currentRotX += (targetRotX - currentRotX) * 0.1;
      currentRotY += (targetRotY - currentRotY) * 0.1;

      if (cardRef.current) {
        cardRef.current.style.transform = `perspective(1000px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg)`;
      }

      rafId = requestAnimationFrame(render);
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);
    rafId = requestAnimationFrame(render);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [activeIdx]);

  // GSAP ScrollTrigger parallax on project media
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (parallaxImgRef.current) {
        gsap.fromTo(
          parallaxImgRef.current,
          { yPercent: -6, scale: 1.08 },
          {
            yPercent: 6,
            scale: 1.02,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "bottom 20%",
              scrub: 1,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [activeIdx]);

  return (
    <section ref={sectionRef} className={styles.section} id="projects">
      <div className="container">
        {/* Section Header Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
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
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
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
              initial={{ opacity: 0, y: 24, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.985 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className={styles.projectCard}
            >
              {/* Media Preview Column with View Cursor */}
              <div className={styles.mediaColumn}>
                <a
                  href={activeProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mockupFrame}
                  data-cursor-view="true"
                  aria-label={`Open live project for ${activeProject.title}`}
                >
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
                      ref={parallaxImgRef}
                      src={activeProject.image}
                      alt={`${activeProject.title} project preview`}
                      className={styles.mockupImage}
                      loading="lazy"
                    />
                    <div className={styles.imageOverlayGradient} />
                  </div>
                </a>
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
                    whileHover={{ scale: 1.03 }}
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
                    whileHover={{ scale: 1.03 }}
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
              transition={{ duration: 0.4, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ x: 6 }}
              className={`${styles.miniRow} ${activeIdx === idx ? styles.miniRowActive : ""}`}
              onClick={() => setActiveIdx(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setActiveIdx(idx);
                }
              }}
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
