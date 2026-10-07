import { useRef } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "../data/data";
import styles from "./About.module.css";

export default function About() {
  const sectionRef = useRef(null);

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
          <div className={`section-tag ${styles.headingTag}`}>
            <span className="section-asterisk">✱</span>
            <span className={styles.headingText}>About Me</span>
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

        {/* ── DETAILED BIO / MANIFESTO ── */}
        <div className={styles.bioWrapper}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "0px 0px -50px 0px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className={styles.bioTextGroup}
          >
            {personalInfo.aboutLong.map((para, i) => (
              <p key={i} className={styles.bioParagraph}>
                {para}
              </p>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
