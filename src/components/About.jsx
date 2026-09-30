import { motion } from "framer-motion";
import { personalInfo } from "../data/data";
import styles from "./About.module.css";

const SPECIALIZATIONS = [
  { icon: "⚡", label: "Core Web Vitals & Speed" },
  { icon: "⚛", label: "React & Next.js Architecture" },
  { icon: "✦", label: "Visceral Micro-Animations" },
  { icon: "⚙", label: "Scalable Full-Stack Systems" },
];

export default function About() {
  return (
    <section className={styles.section} id="about">
      {/* Anchor for backward compatibility with intro-overview links */}
      <span id="intro-overview" className={styles.anchorOffset} aria-hidden="true" />

      <div className="container">
        {/* Section Header Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
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
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className={styles.statementWrapper}
        >
          <p className={styles.statementSub}>{personalInfo.bio}</p>
        </motion.div>

        {/* Specialization Interactive Pills */}
        <div className={styles.pillsRow}>
          {SPECIALIZATIONS.map((spec, i) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: 0.12 + i * 0.07 }}
              whileHover={{ y: -3, scale: 1.03 }}
              className={styles.specPill}
            >
              <span className={styles.specIcon}>{spec.icon}</span>
              <span className={styles.specLabel}>{spec.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Key Stats Strip */}
        <div className={styles.statsGrid}>
          {personalInfo.stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: 0.15 + idx * 0.08,
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              className={styles.statCard}
            >
              <span className={styles.statNumber}>{stat.value}</span>
              <span className={styles.statCaption}>{stat.label}</span>
            </motion.div>
          ))}
        </div>

        {/* ── DETAILED PHILOSOPHY & ARCHITECTURAL HIGHLIGHTS ── */}
        <div className={styles.deepDiveWrapper}>
          <div className={styles.grid}>
            {/* Left Column: Manifesto & Long Bio */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
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

            {/* Right Column: Architectural Highlight Cards */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className={styles.rightCol}
            >
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardIndex}>01</span>
                  <span className={styles.cardTag}>PRIMARY FOCUS</span>
                </div>
                <h4 className={styles.cardTitle}>Full-Stack Architecture</h4>
                <p className={styles.cardDesc}>
                  Specializing in React, Next.js, and TypeScript on the frontend, with robust APIs and relational/NoSQL databases on the backend.
                </p>
              </div>

              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardIndex}>02</span>
                  <span className={styles.cardTag}>CORE PRINCIPLE</span>
                </div>
                <h4 className={styles.cardTitle}>Core Web Vitals & Speed</h4>
                <p className={styles.cardDesc}>
                  Obsessed with sub-second page loads, minimal layout shifts, optimal asset compression, and clean modular code architectures.
                </p>
              </div>

              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardIndex}>03</span>
                  <span className={styles.cardTag}>CURRENT STATUS</span>
                </div>
                <h4 className={styles.cardTitle}>CS Student & Open Source</h4>
                <p className={styles.cardDesc}>
                  Pursuing B.E. in Computer Science in India, bridging theoretical DSA/OS fundamentals with hands-on open source contributions.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
