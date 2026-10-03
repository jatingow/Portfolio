import { motion } from "framer-motion";
import { certifications } from "../data/data";
import styles from "./Certifications.module.css";

export default function Certifications() {
  return (
    <section className={styles.section} id="certifications">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-eyebrow">
          <div className="section-tag">
            {/* <span className="section-asterisk">✱</span> */}
            <span>CREDENTIALS</span>
          </div>
        </div>

        <div className={styles.headerRow}>
          <h2 className="section-main-heading">CERTIFICATIONS</h2>
          <p className="section-subtext">
            Formal recognition and rigorous training in artificial intelligence, neural networks, and cloud architecture.
          </p>
        </div>

        <div className={styles.grid}>
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className={styles.card}
            >
              <div className={styles.cardTop}>
                <span className={styles.cardId}>{cert.id}</span>
                <span className={styles.badge}>{cert.badge}</span>
              </div>

              <div className={styles.orgRow}>
                <span className={styles.orgName}>{cert.org}</span>
                <span className={styles.year}>{cert.year}</span>
              </div>

              <h3 className={styles.certName}>{cert.name}</h3>
              <p className={styles.desc}>{cert.desc}</p>

              <div className={styles.cardFooter}>
                <span className={styles.verifiedIcon}>✓ Verified Credential</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
