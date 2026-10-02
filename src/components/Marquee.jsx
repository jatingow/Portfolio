import styles from "./Marquee.module.css";

const MARQUEE_ROW_1 = [
  { name: "REACT.JS", rgb: "56, 189, 248" },
  { name: "NEXT.JS 15", rgb: "168, 85, 247" },
  { name: "TYPESCRIPT", rgb: "96, 165, 250" },
  { name: "JAVASCRIPT", rgb: "250, 204, 21" },
  { name: "PYTHON", rgb: "52, 211, 153" },
  { name: "C++", rgb: "244, 63, 94" },
  { name: "TAILWIND / CSS", rgb: "45, 212, 191" },
  { name: "FRAMER MOTION", rgb: "236, 72, 153" },
];

const MARQUEE_ROW_2 = [
  { name: "SYSTEM DESIGN", rgb: "239, 68, 68" },
  { name: "POSTGRESQL", rgb: "56, 189, 248" },
  { name: "MONGODB", rgb: "34, 197, 94" },
  { name: "REST APIS", rgb: "251, 146, 60" },
  { name: "LINUX / BASH", rgb: "234, 179, 8" },
  { name: "GIT & GITHUB", rgb: "248, 113, 113" },
  { name: "CORE WEB VITALS", rgb: "16, 185, 129" },
  { name: "NODE.JS", rgb: "132, 204, 22" },
];

function TechIcon({ name }) {
  switch (name) {
    case "REACT.JS":
      return (
        <svg viewBox="-11.5 -10.23174 23 20.46348" fill="none" stroke="currentColor">
          <circle cx="0" cy="0" r="2.05" fill="currentColor" />
          <g strokeWidth="1">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      );
    case "NEXT.JS 15":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10c2.32 0 4.457-.791 6.16-2.123L9.62 8.52V16.5H8V7.5h1.72l9.02 11.53A9.957 9.957 0 0022 12c0-5.523-4.477-10-10-10zm4.5 5.5h1.62v6.62H16.5V7.5z" />
        </svg>
      );
    case "TYPESCRIPT":
      return (
        <svg viewBox="0 0 24 24" fill="none">
          <rect width="22" height="22" x="1" y="1" rx="4" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="1.5" />
          <path d="M5.5 8.5h6M8.5 8.5V17M13.5 14c.7.7 1.6 1.1 2.5 1.1 1 0 1.6-.5 1.6-1.2 0-1.8-4.2-1.1-4.2-3.8 0-1.4 1.1-2.6 3-2.6 1.2 0 2.1.4 2.8 1l-.9 1.4c-.5-.4-1.2-.7-1.9-.7-.8 0-1.3.4-1.3 1 0 1.6 4.2 1 4.2 3.7 0 1.5-1.1 2.7-3.3 2.7-1.4 0-2.6-.5-3.4-1.2l.9-1.4z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "JAVASCRIPT":
      return (
        <svg viewBox="0 0 24 24" fill="none">
          <rect width="22" height="22" x="1" y="1" rx="4" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8.5 11v4.5c0 1.5-.8 2-2 2-.6 0-1.2-.2-1.6-.5l.5-1.4c.3.2.6.4 1 .4.5 0 .8-.2.8-.8V11h1.3zm5.2 3c.7.7 1.6 1.1 2.5 1.1 1 0 1.6-.5 1.6-1.2 0-1.8-4.2-1.1-4.2-3.8 0-1.4 1.1-2.6 3-2.6 1.2 0 2.1.4 2.8 1l-.9 1.4c-.5-.4-1.2-.7-1.9-.7-.8 0-1.3.4-1.3 1 0 1.6 4.2 1 4.2 3.7 0 1.5-1.1 2.7-3.3 2.7-1.4 0-2.6-.5-3.4-1.2l.9-1.4z" fill="currentColor" />
        </svg>
      );
    case "PYTHON":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.91 2c-4.47 0-4.18 1.94-4.18 1.94l.01 2.01h4.25v.6H6.1s-2.85.32-2.85 4.18 2.49 4.04 2.49 4.04h1.49v-2.09s-.08-2.49 2.44-2.49h4.19s2.37.04 2.37-2.34V4.34S16.82 2 11.91 2zm-2.28 1.28a.78.78 0 1 1 0 1.56.78.78 0 0 1 0-1.56zm2.46 18.72c4.47 0 4.18-1.94 4.18-1.94l-.01-2.01h-4.25v-.6h5.89s2.85-.32 2.85-4.18-2.49-4.04-2.49-4.04h-1.49v2.09s.08 2.49-2.44 2.49h-4.19s-2.37-.04-2.37 2.34v3.51s-.59 2.34 4.32 2.34zm2.28-1.28a.78.78 0 1 1 0-1.56.78.78 0 0 1 0 1.56z" />
        </svg>
      );
    case "C++":
      return (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7.8v8.4L12 22l10-5.8V7.8L12 2z" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M9.5 15a3.5 3.5 0 1 1 0-6 3.5 3.5 0 0 1 2.5 1.1l-1.2 1.2a1.8 1.8 0 1 0 0 2.4l1.2 1.2c-.7.7-1.6 1.1-2.5 1.1zM14.5 10.5v3M13 12h3M18.5 10.5v3M17 12h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "TAILWIND / CSS":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
        </svg>
      );
    case "FRAMER MOTION":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
        </svg>
      );
    case "SYSTEM DESIGN":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="6" height="6" rx="1.5" />
          <rect x="16" y="2" width="6" height="6" rx="1.5" />
          <rect x="9" y="16" width="6" height="6" rx="1.5" />
          <path d="M5 8v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8M12 13v3" />
        </svg>
      );
    case "POSTGRESQL":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.06 2C6.73 2 4.25 5.57 4.1 9.4c-.16 4.2 2.12 7.02 4.6 8.35v2.78c0 .8.66 1.47 1.47 1.47h.65a1.47 1.47 0 0 0 1.47-1.47v-1.6c.55.05 1.13.07 1.74.07 4.88 0 7.87-2.6 7.87-7.23C21.9 6.4 18.23 2 12.06 2zm-4.7 9.87c-.82 0-1.48-.66-1.48-1.48 0-.82.66-1.48 1.48-1.48.82 0 1.48.66 1.48 1.48 0 .82-.66 1.48-1.48 1.48zm9.36 0c-.82 0-1.48-.66-1.48-1.48 0-.82.66-1.48 1.48-1.48.82 0 1.48.66 1.48 1.48 0 .82-.66 1.48-1.48 1.48z" />
        </svg>
      );
    case "MONGODB":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 1.5s-6 5.8-6 11.2c0 4.3 3.1 7.8 6 9.3 2.9-1.5 6-5 6-9.3 0-5.4-6-11.2-6-11.2zm.4 18.9c-.3.2-.6.2-.8 0-.2-.1-1.3-.8-2.3-2.1-.2-.2-.2-.5 0-.7.2-.2.5-.2.7 0 .9 1.1 1.9 1.8 2 1.9.3-.2.3-.5.1-.8-.4-.6-1.2-1.7-1.6-3-.2-.5 0-1.1.5-1.3.5-.2 1.1 0 1.3.5.5 1.4 1.4 2.7 1.9 3.4.4.6.4 1.4-.2 1.9-.3.1-.5.2-.9.2z" />
        </svg>
      );
    case "REST APIS":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 14h6m-6 0l3-3m-3 3l3 3m16-4h-6m6 0l-3-3m3 3l-3 3M14 4h6v6M10 20H4v-6" />
        </svg>
      );
    case "LINUX / BASH":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </svg>
      );
    case "GIT & GITHUB":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="6" y1="3" x2="6" y2="15" />
          <circle cx="18" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <path d="M18 9a9 9 0 0 1-9 9" />
        </svg>
      );
    case "CORE WEB VITALS":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v4M4.93 4.93l2.83 2.83M2 12h4M4.93 19.07l2.83-2.83M12 22v-4M19.07 19.07l-2.83-2.83M22 12h-4M19.07 4.93l-2.83 2.83" />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      );
    case "NODE.JS":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L3 7.5v9L12 22l9-5.5v-9L12 2z" />
          <path d="M12 8v8M8.5 10l7 4" />
        </svg>
      );
    default:
      return null;
  }
}

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
              <span className={styles.techIcon}>
                <TechIcon name={item.name} />
              </span>
              <span className={styles.badgeName}>{item.name}</span>
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
              <span className={styles.techIcon}>
                <TechIcon name={item.name} />
              </span>
              <span className={styles.badgeName}>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
