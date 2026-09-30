import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { stack, hotSkills } from "../data/data";
import styles from "./Stack.module.css";

const CATEGORY_NAMES = {
  All: "All Capabilities",
  Frontend: "Frontend Architecture",
  Languages: "Core Languages",
  Backend_DB: "Backend & Databases",
  Tools_DevOps: "Systems, Git & DevOps",
};

export default function Stack() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...Object.keys(stack)];

  // Filter skills based on selected category
  const filteredCategories =
    activeCategory === "All"
      ? Object.entries(stack)
      : [[activeCategory, stack[activeCategory]]];

  return (
    <section className={styles.section} id="stack">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="section-header-eyebrow"
        >
          <div className="section-tag">
            <span className="section-asterisk">✱</span>
            <span>03 / TECH CAPABILITIES</span>
          </div>
        </motion.div>

        <div className={styles.headerRow}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-main-heading">SYSTEMS & TOOLS</h2>
            <p className="section-subtext">
              A comprehensive toolbox refined through academic coursework, personal architectures, and open-source contributions.
            </p>
          </motion.div>

          {/* Interactive Category Filter Pills */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={styles.filterPills}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterBtnActive : ""}`}
                aria-label={`Filter by ${cat}`}
              >
                {cat === "Backend_DB" ? "Backend" : cat === "Tools_DevOps" ? "DevOps" : cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Dynamic Grid with AnimatePresence */}
        <motion.div layout className={styles.grid}>
          <AnimatePresence mode="popLayout">
            {filteredCategories.map(([categoryKey, items], idx) => (
              <motion.div
                key={categoryKey}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: -20 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={styles.stackCard}
              >
                <div className={styles.cardTop}>
                  <span className={styles.cardCategoryIndex}>0{idx + 1}</span>
                  <span className={styles.cardCategoryTitle}>
                    {CATEGORY_NAMES[categoryKey] || categoryKey}
                  </span>
                </div>

                <div className={styles.badgesWrapper}>
                  {items.map((tech) => {
                    const isHot = hotSkills.includes(tech);
                    return (
                      <motion.div
                        key={tech}
                        whileHover={{ y: -3, scale: 1.05 }}
                        whileTap={{ scale: 0.96 }}
                        className={`${styles.techBadge} ${isHot ? styles.techBadgeHot : ""}`}
                      >
                        {isHot && <span className={styles.hotDot} />}
                        <span className={styles.techName}>{tech}</span>
                        {isHot && <span className={styles.hotTag}>PRO</span>}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Performance & Quality Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className={styles.performanceBanner}
        >
          <div className={styles.bannerLeft}>
            <span className={styles.bannerIcon}>⚡</span>
            <div>
              <h4 className={styles.bannerTitle}>Performance-First Philosophy</h4>
              <p className={styles.bannerDesc}>
                Targeting green Core Web Vitals, accessible semantic markup, and predictable state transitions across all projects.
              </p>
            </div>
          </div>
          <div className={styles.scorePill}>
            <span className={styles.scoreNum}>95+</span>
            <span className={styles.scoreLabel}>LIGHTHOUSE SCORE</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
