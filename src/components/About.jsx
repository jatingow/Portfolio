import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personalInfo } from "../data/data";
import styles from "./About.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const rightColRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop = window.innerWidth >= 1024;
    if (prefersReducedMotion || !isDesktop || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (rightColRef.current) {
        gsap.fromTo(
          rightColRef.current,
          { y: 35 },
          {
            y: -35,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              end: "bottom 25%",
              scrub: 1.2,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="about">
      {/* Anchor for backward compatibility with intro-overview links */}
      <span id="intro-overview" className={styles.anchorOffset} aria-hidden="true" />

      <div className="container">
        {/* Section Header Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "0px 0px -50px 0px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="section-header-eyebrow"
        >
          <div className="section-tag">
            <span className="section-asterisk">✱</span>
            <span>01 / ABOUT ME</span>
          </div>
        </motion.div>

        {/* ── INTRO OVERVIEW STATEMENT ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "0px 0px -50px 0px" }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className={styles.statementWrapper}
        >
          <p className={styles.statementSub}>{personalInfo.bio}</p>
        </motion.div>

        {/* ── DETAILED PHILOSOPHY & ARCHITECTURAL HIGHLIGHTS ── */}
        <div className={styles.deepDiveWrapper}>
          <div className={styles.grid}>
            {/* Left Column: Manifesto & Long Bio */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "0px 0px -50px 0px" }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className={styles.leftCol}
            >
              <div className={styles.bioTextGroup}>
                {personalInfo.aboutLong.map((para, i) => (
                  <p key={i} className={styles.bioParagraph}>
                    {para}
                  </p>
                ))}
              </div>
            </motion.div>

            {/* Right Column: Architectural Highlight Cards with Scroll Parallax */}
            <div ref={rightColRef} className={styles.rightCol}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "0px 0px -40px 0px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={styles.card}
              >
                <div className={styles.cardHeader}>
                  <span className={styles.cardIndex}>01</span>
                  <span className={styles.cardTag}>PRIMARY FOCUS</span>
                </div>
                <h4 className={styles.cardTitle}>Full-Stack Architecture</h4>
                <p className={styles.cardDesc}>
                  Specializing in React, Next.js, and TypeScript on the frontend, with robust APIs and relational/NoSQL databases on the backend.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "0px 0px -40px 0px" }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={styles.card}
              >
                <div className={styles.cardHeader}>
                  <span className={styles.cardIndex}>02</span>
                  <span className={styles.cardTag}>CORE PRINCIPLE</span>
                </div>
                <h4 className={styles.cardTitle}>Core Web Vitals & Speed</h4>
                <p className={styles.cardDesc}>
                  Obsessed with sub-second page loads, minimal layout shifts, optimal asset compression, and clean modular code architectures.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "0px 0px -40px 0px" }}
                transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className={styles.card}
              >
                <div className={styles.cardHeader}>
                  <span className={styles.cardIndex}>03</span>
                  <span className={styles.cardTag}>CURRENT STATUS</span>
                </div>
                <h4 className={styles.cardTitle}>CS Student & Open Source</h4>
                <p className={styles.cardDesc}>
                  Pursuing B.E. in Computer Science in India, bridging theoretical DSA/OS fundamentals with hands-on open source contributions.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
