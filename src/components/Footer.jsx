import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./Footer.module.css";

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "0px 0px -20px 0px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={styles.footerInner}
        >
          {/* Copyright & Info */}
          <div className={styles.leftCol}>
            <span className={styles.copyright}>
              © {new Date().getFullYear()} JATIN KUMAR
            </span>
            <span className={styles.divider}>•</span>
            <span className={styles.techCredit}>
              DESIGN INSPIRED BY AWWARDS & MODERN MINIMALISM
            </span>
          </div>

          {/* Local IST Time */}
          <div className={styles.centerCol}>
            <span className={styles.timeLabel}>DELHI, IN (IST):</span>
            <span className={styles.timeValue}>{time || "12:00:00 AM"}</span>
          </div>

          {/* Back to top */}
          <div className={styles.rightCol}>
            <button
              onClick={scrollToTop}
              className={styles.backToTopBtn}
              aria-label="Back to top of page"
            >
              <span>BACK TO TOP</span>
              <span className={styles.topArrow}>↑</span>
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
