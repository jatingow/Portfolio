import { motion } from "framer-motion";
import { experience } from "../data/data";
import styles from "./Experience.module.css";

export default function Experience() {
  return (
    <section className={styles.section} id="experience">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "0px 0px -50px 0px" }}
          transition={{ duration: 0.6 }}
          className="section-header-eyebrow"
        >
          <div className="section-tag">
            <span className="section-asterisk">✱</span>
            <span>EXPERIENCE</span>
          </div>
          <span className={styles.counterText}>0{experience.length} ENTRIES</span>
        </motion.div>


        {/* Interactive Timeline list */}
        <div className={styles.timeline}>
          {experience.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 35, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, margin: "0px 0px -40px 0px" }}
              transition={{
                duration: 0.55,
                delay: idx * 0.15,
                type: "spring",
                stiffness: 240,
                damping: 24,
              }}
              whileHover={{ x: 4 }}
              className={styles.item}
            >
              <div className={styles.itemLeft}>
                <span className={styles.indexNum}>{item.id}</span>
                <span className={styles.periodPill}>{item.period}</span>
                <span className={styles.typeTag}>{item.type}</span>
              </div>

              <div className={styles.itemContent}>
                <div className={styles.titleRow}>
                  <div>
                    <h3 className={styles.roleTitle}>{item.role}</h3>
                    <p className={styles.organization}>{item.org}</p>
                  </div>
                </div>

                <p className={styles.description}>{item.desc}</p>

                {item.highlights && (
                  <ul className={styles.highlightsList}>
                    {item.highlights.map((h, i) => (
                      <motion.li
                        key={i}
                        whileHover={{ x: 3 }}
                        className={styles.highlightItem}
                      >
                        <span className={styles.bulletSymbol}>→</span>
                        <span>{h}</span>
                      </motion.li>
                    ))}
                  </ul>
                )}

                <div className={styles.tagsRow}>
                  {item.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
