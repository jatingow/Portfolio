import styles from "./Marquee.module.css";

const MARQUEE_ROW_1 = [
  { name: "REACT.JS", category: "FRONTEND", rgb: "56, 189, 248" },
  { name: "NEXT.JS 15", category: "FULL-STACK", rgb: "168, 85, 247" },
  { name: "TYPESCRIPT", category: "LANG", rgb: "96, 165, 250" },
  { name: "JAVASCRIPT", category: "CORE", rgb: "250, 204, 21" },
  { name: "PYTHON", category: "AI & BACKEND", rgb: "52, 211, 153" },
  { name: "C++", category: "SYSTEMS", rgb: "244, 63, 94" },
  { name: "TAILWIND / CSS", category: "STYLING", rgb: "45, 212, 191" },
  { name: "FRAMER MOTION", category: "CREATIVE", rgb: "236, 72, 153" },
];

const MARQUEE_ROW_2 = [
  { name: "SYSTEM DESIGN", category: "ARCHITECTURE", rgb: "239, 68, 68" },
  { name: "POSTGRESQL", category: "DATABASE", rgb: "56, 189, 248" },
  { name: "MONGODB", category: "DATABASE", rgb: "34, 197, 94" },
  { name: "REST APIS", category: "BACKEND", rgb: "251, 146, 60" },
  { name: "LINUX / BASH", category: "DEVOPS", rgb: "234, 179, 8" },
  { name: "GIT & GITHUB", category: "WORKFLOW", rgb: "248, 113, 113" },
  { name: "CORE WEB VITALS", category: "PERF", rgb: "16, 185, 129" },
  { name: "NODE.JS", category: "RUNTIME", rgb: "132, 204, 22" },
];

export default function Marquee() {
  // Duplicate arrays for smooth seamless infinite looping
  const row1Items = [...MARQUEE_ROW_1, ...MARQUEE_ROW_1, ...MARQUEE_ROW_1];
  const row2Items = [...MARQUEE_ROW_2, ...MARQUEE_ROW_2, ...MARQUEE_ROW_2];

  return (
    <div className={styles.marqueeSection} aria-hidden="true">
      {/* Ambient RGB lighting backdrop */}
      <div className={styles.ambientGlow} />

      {/* Track 1: Moving Left */}
      <div className={styles.trackWrapper}>
        <div className={styles.trackLeft}>
          {row1Items.map((item, index) => (
            <div
              key={`r1-${index}`}
              className={styles.badge}
              style={{
                "--item-rgb": item.rgb,
              }}
            >
              <span className={styles.rgbDot} />
              <span className={styles.badgeName}>{item.name}</span>
              <span className={styles.categoryTag}>{item.category}</span>
              <span className={styles.rgbAsterisk}>✱</span>
            </div>
          ))}
        </div>
      </div>

      {/* Track 2: Moving Right (Reverse) */}
      <div className={styles.trackWrapper}>
        <div className={styles.trackRight}>
          {row2Items.map((item, index) => (
            <div
              key={`r2-${index}`}
              className={styles.badge}
              style={{
                "--item-rgb": item.rgb,
              }}
            >
              <span className={styles.rgbDot} />
              <span className={styles.badgeName}>{item.name}</span>
              <span className={styles.categoryTag}>{item.category}</span>
              <span className={styles.rgbAsterisk}>✱</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
