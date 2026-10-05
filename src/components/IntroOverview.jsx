import { motion } from "framer-motion";
import { personalInfo } from "../data/data";
import styles from "./IntroOverview.module.css";

const SPECIALIZATIONS = [
  { icon: "⚡", label: "Core Web Vitals & Speed" },
  { icon: "⚛", label: "React & Next.js Architecture" },
  { icon: "✦", label: "Visceral Micro-Animations" },
  { icon: "⚙", label: "Scalable Full-Stack Systems" },
];

export default function IntroOverview() {
  return (
    <section className={styles.section} id="intro-overview">
      <div className="container">
        {/* Section Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "0px 0px -50px 0px" }}
          transition={{ duration: 0.6 }}
          className="section-header-eyebrow"
        >
          <div className="section-tag">
            <span className="section-asterisk">✱</span>
            <span>01 / OVERVIEW & STATEMENT</span>
          </div>
        </motion.div>

        {/* Big Editorial Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "0px 0px -50px 0px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className={styles.statementWrapper}
        >
          <p className={styles.statementSub}>
            {personalInfo.bio}
          </p>
        </motion.div>

        {/* Interactive Specialization Pills that pop up */}
        <div className={styles.pillsRow}>
          {SPECIALIZATIONS.map((spec, i) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false, margin: "0px 0px -40px 0px" }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
              whileHover={{ y: -3, scale: 1.03 }}
              className={styles.specPill}
            >
              <span className={styles.specIcon}>{spec.icon}</span>
              <span className={styles.specLabel}>{spec.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Stats Strip with Spring Pop-Up */}
        <div className={styles.statsGrid}>
          {personalInfo.stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "0px 0px -40px 0px" }}
              transition={{
                duration: 0.5,
                delay: 0.2 + idx * 0.1,
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
      </div>
    </section>
  );
}
