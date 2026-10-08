import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "../data/data";
import styles from "./About.module.css";

const PHOTO_CANDIDATES = [
  "/jatin.jpg",
  "/jatin.png",
  "/jatin.jpeg",
  "/profile.jpg",
  "/profile.png",
];

export default function About() {
  const sectionRef = useRef(null);
  const [showPhoto, setShowPhoto] = useState(false);
  const [photoCandidateIdx, setPhotoCandidateIdx] = useState(0);
  const [hasBeenHovered, setHasBeenHovered] = useState(false);

  const handleImageError = () => {
    if (photoCandidateIdx < PHOTO_CANDIDATES.length - 1) {
      setPhotoCandidateIdx((prev) => prev + 1);
    } else {
      setPhotoCandidateIdx(-1); // All candidates attempted; show styled placeholder
    }
  };

  const currentPhotoSrc =
    photoCandidateIdx >= 0 ? PHOTO_CANDIDATES[photoCandidateIdx] : null;

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
          <p className={styles.statementLead}>
            Hey everyone, I'm{" "}
            <span className={styles.nameWrapper}>
              <span
                className={`${styles.nameHighlight} ${!hasBeenHovered ? styles.bouncy : ""}`}
                onMouseEnter={() => {
                  setShowPhoto(true);
                  setHasBeenHovered(true);
                }}
                onMouseLeave={() => setShowPhoto(false)}
                onFocus={() => {
                  setShowPhoto(true);
                  setHasBeenHovered(true);
                }}
                onBlur={() => setShowPhoto(false)}
                tabIndex={0}
                role="button"
                aria-label="Jatin Kumar (hover to view photo)"
              >
                Jatin Kumar
              </span>

              <AnimatePresence>
                {showPhoto && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.88, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.88, y: -10 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className={styles.photoPopup}
                  >
                    <span className={styles.photoFrame}>
                      {currentPhotoSrc ? (
                        <img
                          src={currentPhotoSrc}
                          alt="Jatin Kumar"
                          className={styles.photoImg}
                          onError={handleImageError}
                        />
                      ) : (
                        <span className={styles.photoPlaceholder}>
                          <span className={styles.avatarInitials}>JK</span>
                          <span className={styles.uploadPrompt}>
                            Drop photo into:<br />
                            <strong>public/jatin.jpg</strong>
                          </span>
                        </span>
                      )}
                    </span>
                    <span className={styles.photoCaption}>
                      <span className={styles.captionDot} />
                      Jatin Kumar · CS Student
                    </span>
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
            . A 3rd year CS student. I have been learning how to program for about 3 years now.
          </p>

          {/* Minimal additional info */}
          <div className={styles.detailsList}>
            {personalInfo.bioDetails.map((paragraph, idx) => (
              <p key={idx} className={styles.detailParagraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
