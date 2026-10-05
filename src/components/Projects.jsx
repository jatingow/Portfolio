import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../data/data";
import styles from "./Projects.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const activeProject = projects[activeIdx];
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const parallaxImgRef = useRef(null);
  const sliderRef = useRef(null);

  // Mouse drag-to-scroll state
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollStartLeftRef = useRef(0);
  const dragDistanceRef = useRef(0);

  // Normalize project images list
  const projectImages =
    activeProject.images && activeProject.images.length > 0
      ? activeProject.images
      : [
          {
            src: activeProject.image,
            title: activeProject.title,
            tag: activeProject.type,
            desc: activeProject.subtitle,
          },
        ];

  // Reset slider position and index when active project changes
  useEffect(() => {
    setCurrentImgIdx(0);
    if (sliderRef.current) {
      sliderRef.current.scrollTo({ left: 0, behavior: "instant" });
    }
  }, [activeIdx]);

  const scrollToSlide = (idx) => {
    if (!sliderRef.current) return;
    const clampedIdx = Math.max(0, Math.min(projectImages.length - 1, idx));
    const targetLeft = clampedIdx * sliderRef.current.clientWidth;
    sliderRef.current.scrollTo({
      left: targetLeft,
      behavior: "smooth",
    });
    setCurrentImgIdx(clampedIdx);
  };

  const handleSliderScroll = () => {
    if (!sliderRef.current || isDraggingRef.current) return;
    const { scrollLeft, clientWidth } = sliderRef.current;
    if (clientWidth > 0) {
      const idx = Math.round(scrollLeft / clientWidth);
      if (idx !== currentImgIdx && idx >= 0 && idx < projectImages.length) {
        setCurrentImgIdx(idx);
      }
    }
  };

  const handlePrevSlide = (e) => {
    e.preventDefault();
    e.stopPropagation();
    scrollToSlide(currentImgIdx - 1);
  };

  const handleNextSlide = (e) => {
    e.preventDefault();
    e.stopPropagation();
    scrollToSlide(currentImgIdx + 1);
  };

  const handleMouseDown = (e) => {
    if (e.button !== 0 || !sliderRef.current) return;
    isDraggingRef.current = true;
    dragDistanceRef.current = 0;
    startXRef.current = e.pageX;
    scrollStartLeftRef.current = sliderRef.current.scrollLeft;
    sliderRef.current.style.scrollSnapType = "none";
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current || !sliderRef.current) return;
    const walk = e.pageX - startXRef.current;
    dragDistanceRef.current = Math.abs(walk);
    sliderRef.current.scrollLeft = scrollStartLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (!isDraggingRef.current || !sliderRef.current) return;
    isDraggingRef.current = false;
    sliderRef.current.style.scrollSnapType = "x mandatory";
    const { scrollLeft, clientWidth } = sliderRef.current;
    if (clientWidth > 0) {
      const idx = Math.round(scrollLeft / clientWidth);
      scrollToSlide(idx);
    }
  };

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
      // Don't tilt violently if dragging image slider
      if (isDraggingRef.current) return;
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
          { yPercent: -4, scale: 1.03 },
          {
            yPercent: 4,
            scale: 1.01,
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
          viewport={{ once: false, margin: "0px 0px -50px 0px" }}
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
            viewport={{ once: false, margin: "0px 0px -50px 0px" }}
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
            viewport={{ once: false, margin: "0px 0px -40px 0px" }}
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "0px 0px -40px 0px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={styles.showcaseWrapper}
        >
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
              {/* Media Preview Column with View Cursor and Sideways Scroll Mockup */}
              <div className={styles.mediaColumn}>
                <div
                  className={styles.mockupFrame}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowLeft") {
                      e.preventDefault();
                      scrollToSlide(currentImgIdx - 1);
                    } else if (e.key === "ArrowRight") {
                      e.preventDefault();
                      scrollToSlide(currentImgIdx + 1);
                    }
                  }}
                  aria-label={`Interactive preview for ${activeProject.title} project. Use arrows or scroll sideways to view screenshots.`}
                >
                  {/* Browser Window Chrome Header */}
                  <div className={styles.frameHeader}>
                    <div className={styles.windowDots}>
                      <span className={`${styles.dot} ${styles.dotRed}`} />
                      <span className={`${styles.dot} ${styles.dotYellow}`} />
                      <span className={`${styles.dot} ${styles.dotGreen}`} />
                    </div>

                    <a
                      href={activeProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.frameAddressBar}
                      title={`Visit ${activeProject.title} repository / live preview`}
                    >
                      <span className={styles.addressText}>
                        https://{activeProject.title.toLowerCase()}.jatin.dev
                      </span>
                      <span className={styles.addressExternalIcon}>↗</span>
                    </a>

                    {projectImages.length > 1 && (
                      <div className={styles.frameSlideCounter} title="Current slide">
                        <span className={styles.counterCurrent}>0{currentImgIdx + 1}</span>
                        <span className={styles.counterDivider}>/</span>
                        <span className={styles.counterTotal}>0{projectImages.length}</span>
                      </div>
                    )}
                  </div>

                  {/* Horizontal Scrollable Image Gallery Viewport */}
                  <div className={styles.imageContainer} ref={parallaxImgRef}>
                    <div
                      ref={sliderRef}
                      className={styles.sliderTrack}
                      onScroll={handleSliderScroll}
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUpOrLeave}
                      onMouseLeave={handleMouseUpOrLeave}
                      data-cursor-view="true"
                    >
                      {projectImages.map((imgObj, idx) => (
                        <div key={idx} className={styles.slide}>
                          <img
                            src={imgObj.src}
                            alt={`${activeProject.title} - ${imgObj.title || `Screenshot ${idx + 1}`}`}
                            className={styles.mockupImage}
                            loading={idx === 0 ? "eager" : "lazy"}
                            draggable="false"
                          />
                          <div className={styles.imageOverlayGradient} />
                        </div>
                      ))}
                    </div>

                    {/* Left & Right Interactive Navigation Controls */}
                    {projectImages.length > 1 && (
                      <>
                        <button
                          type="button"
                          className={`${styles.sliderNavBtn} ${styles.sliderNavPrev}`}
                          onClick={handlePrevSlide}
                          disabled={currentImgIdx === 0}
                          aria-label="Previous screenshot (Scroll Left)"
                          title="Previous screenshot (Scroll Left)"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="15 18 9 12 15 6" />
                          </svg>
                        </button>

                        <button
                          type="button"
                          className={`${styles.sliderNavBtn} ${styles.sliderNavNext}`}
                          onClick={handleNextSlide}
                          disabled={currentImgIdx === projectImages.length - 1}
                          aria-label="Next screenshot (Scroll Right)"
                          title="Next screenshot (Scroll Right)"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </button>

                        {/* Carousel Bottom Control Bar: Active Caption & Pagination Dots */}
                        <div className={styles.carouselBottomBar}>
                          <div className={styles.captionTag}>
                            <span className={styles.captionDot} />
                            <span className={styles.captionTitle}>
                              {projectImages[currentImgIdx]?.title || `Screen 0${currentImgIdx + 1}`}
                            </span>
                            {projectImages[currentImgIdx]?.tag && (
                              <span className={styles.captionCategory}>
                                · {projectImages[currentImgIdx].tag}
                              </span>
                            )}
                          </div>

                          <div
                            className={styles.paginationDots}
                            role="tablist"
                            aria-label="Screenshots pagination"
                          >
                            {projectImages.map((_, dotIdx) => (
                              <button
                                key={dotIdx}
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  scrollToSlide(dotIdx);
                                }}
                                className={`${styles.dotIndicator} ${
                                  currentImgIdx === dotIdx ? styles.dotIndicatorActive : ""
                                }`}
                                aria-label={`View screenshot ${dotIdx + 1}`}
                                aria-selected={currentImgIdx === dotIdx}
                                role="tab"
                              />
                            ))}
                          </div>
                        </div>

                        {/* Sideways Scroll Hint Badge */}
                        <div className={styles.scrollHintBadge}>
                          <span className={styles.scrollHintIcon}>⇄</span>
                          <span>Scroll sideways</span>
                        </div>
                      </>
                    )}
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
        </motion.div>

        {/* Quick List Overview at Bottom */}
        <div className={styles.allProjectsList}>
          {projects.map((proj, idx) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "0px 0px -30px 0px" }}
              transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
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
