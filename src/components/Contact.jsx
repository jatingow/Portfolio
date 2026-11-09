import { motion } from "framer-motion";
import { contactLinks } from "../data/data";
import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <section className={styles.section} id="contact">
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
            <span>GET IN TOUCH</span>
          </div>
        </motion.div>

        {/* Links Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "0px 0px -40px 0px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className={styles.socialsGrid}
        >
          {contactLinks.map((link, idx) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialCard}
            >
              <div className={styles.socialTop}>
                <span className={styles.socialIndex}>0{idx + 1}</span>
                <span className={styles.socialArrow}>↗</span>
              </div>
              <div>
                <h4 className={styles.socialLabel}>{link.label}</h4>
                <span className={styles.socialHandle}>{link.handle}</span>
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
