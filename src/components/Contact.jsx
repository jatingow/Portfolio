import { useState } from "react";
import { motion } from "framer-motion";
import { contactLinks, personalInfo } from "../data/data";
import styles from "./Contact.module.css";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("jatin@email.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

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
            <span className="section-asterisk">✱</span>
            <span>06 / GET IN TOUCH</span>
          </div>
        </motion.div>

        <div className={styles.contactWrapper}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "0px 0px -50px 0px" }}
            transition={{ duration: 0.6 }}
            className={styles.headerBlock}
          >
            <h2 className={styles.bigTitle}>
              LET'S BUILD <br />
              <span className={styles.accentText}>SOMETHING EXTRAORDINARY.</span>
            </h2>
            <p className={styles.subtext}>
              Available for full-time engineering opportunities, freelance projects, and open source collaborations.
            </p>
          </motion.div>

          {/* Giant Copy Email Interactive Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "0px 0px -50px 0px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className={styles.emailCtaCard}
          >
            <div className={styles.emailInfo}>
              <span className={styles.emailLabel}>DIRECT CONTACT</span>
              <a href="mailto:jatin@email.com" className={styles.emailAddress}>
                jatin@email.com
              </a>
            </div>

            <div className={styles.ctaButtonRow}>
              <button
                onClick={handleCopyEmail}
                className={styles.copyBtn}
                aria-label="Copy email address"
              >
                <span>{copied ? "COPIED TO CLIPBOARD! ✓" : "COPY EMAIL ADDRESS"}</span>
                <span className={styles.btnIcon}>{copied ? "✨" : "📋"}</span>
              </button>

              <a
                href="mailto:jatin@email.com"
                className={styles.sendEmailBtn}
              >
                <span>WRITE AN EMAIL</span>
                <span className={styles.sendArrow}>↗</span>
              </a>
            </div>
          </motion.div>

          {/* Social Links Grid */}
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
      </div>
    </section>
  );
}
