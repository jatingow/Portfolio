import { useEffect } from "react";
import { personalInfo, stack, projects, experience, certifications } from "../data/data";
import styles from "./ResumeModal.module.css";

export default function ResumeModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      data-lenis-prevent="true"
      role="dialog"
      aria-modal="true"
      aria-label="Resume View"
    >
      <div className={styles.modal}>
        {/* Header Bar */}
        <div className={styles.modalHeader}>
          <div className={styles.headerTitleGroup}>
            <span className={styles.headerTag}>DOCUMENT</span>
            <span className={styles.headerTitle}>Jatin Kumar — Resume</span>
          </div>
          <div className={styles.headerActions}>
            <button
              onClick={handlePrint}
              className={styles.printBtn}
              type="button"
              title="Print or Save as PDF"
            >
              <span>🖨</span>
              <span>PRINT / SAVE PDF</span>
            </button>
            <button
              onClick={onClose}
              className={styles.closeBtn}
              aria-label="Close resume"
              type="button"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Resume Sheet */}
        <div className={styles.resumeBody}>
          <div className={styles.resumePaper}>
            {/* Document Header */}
            <header className={styles.docHeader}>
              <h1 className={styles.name}>{personalInfo.name}</h1>
              <div className={styles.role}>
                {personalInfo.title} · {personalInfo.role}
              </div>
              <div className={styles.contactLine}>
                <span>📍 {personalInfo.location}</span>
                <span>
                  ✉{" "}
                  <a href="mailto:jatinofficial1305@gmail.com">
                    jatinofficial1305@gmail.com
                  </a>
                </span>
                <span>
                  ⌨{" "}
                  <a
                    href="https://github.com/jatingow"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    github.com/jatingow
                  </a>
                </span>
                <span>💼 Open for Full-Time & Freelance Roles</span>
              </div>
            </header>

            {/* Summary */}
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>Summary</h2>
              <p className={styles.itemDesc}>{personalInfo.bioLead}</p>
              {personalInfo.bioDetails.map((para, i) => (
                <p key={i} className={styles.itemDesc} style={{ marginTop: "6px" }}>
                  {para}
                </p>
              ))}
            </section>

            {/* Technical Skills */}
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>Technical Skills</h2>
              <div className={styles.skillGroup}>
                <span className={styles.skillLabel}>Frontend: </span>
                <span className={styles.skillList}>{stack.Frontend.join(", ")}</span>
              </div>
              <div className={styles.skillGroup}>
                <span className={styles.skillLabel}>Languages: </span>
                <span className={styles.skillList}>{stack.Languages.join(", ")}</span>
              </div>
              <div className={styles.skillGroup}>
                <span className={styles.skillLabel}>Backend & Databases: </span>
                <span className={styles.skillList}>{stack.Backend_DB.join(", ")}</span>
              </div>
              <div className={styles.skillGroup}>
                <span className={styles.skillLabel}>Tools & DevOps: </span>
                <span className={styles.skillList}>{stack.Tools_DevOps.join(", ")}</span>
              </div>
            </section>

            {/* Featured Projects */}
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>Featured Projects</h2>
              {projects.map((proj) => (
                <div key={proj.id} className={styles.item}>
                  <div className={styles.itemHeader}>
                    <span className={styles.itemTitle}>
                      {proj.title} — {proj.subtitle}
                    </span>
                    <span className={styles.itemDate}>{proj.year}</span>
                  </div>
                  <div className={styles.itemDesc}>{proj.desc}</div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      color: "var(--accent-cyan)",
                      marginTop: "4px",
                    }}
                  >
                    Tech: {proj.tags.join(" · ")}
                  </div>
                </div>
              ))}
            </section>

            {/* Experience & Education */}
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>Experience & Education</h2>
              {experience.map((exp) => (
                <div key={exp.id} className={styles.item}>
                  <div className={styles.itemHeader}>
                    <div>
                      <span className={styles.itemTitle}>{exp.role}</span>
                      <span className={styles.itemOrg}> — {exp.org}</span>
                    </div>
                    <span className={styles.itemDate}>{exp.period}</span>
                  </div>
                  <p className={styles.itemDesc}>{exp.desc}</p>
                  <ul className={styles.bullets}>
                    {exp.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            {/* Certifications */}
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>Certifications</h2>
              {certifications.map((cert) => (
                <div key={cert.id} className={styles.item} style={{ marginBottom: "10px" }}>
                  <div className={styles.itemHeader}>
                    <span className={styles.itemTitle}>{cert.name}</span>
                    <span className={styles.itemDate}>{cert.year}</span>
                  </div>
                  <div className={styles.itemOrg}>
                    {cert.org} · {cert.badge}
                  </div>
                  <p className={styles.itemDesc}>{cert.desc}</p>
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

