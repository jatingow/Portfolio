import { useState, useEffect, useRef } from "react";
import { useSmoothScroll } from "../context/SmoothScrollContext";
import styles from "./Sidebar.module.css";

const NAV_LINKS = [
  { num: "01", label: "ABOUT", href: "#about" },
  { num: "02", label: "PROJECTS", href: "#projects" },
  { num: "03", label: "STACK", href: "#stack" },
  { num: "04", label: "TIMELINE", href: "#experience" },
];

export default function Sidebar({ theme, toggleTheme, isOpen, setIsOpen }) {
  const { scrollTo } = useSmoothScroll();
  const [isHovered, setIsHovered] = useState(false);
  const sidebarRef = useRef(null);

  const active = isOpen || isHovered;

  // Keyboard accessibility: close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && (isOpen || isHovered)) {
        setIsOpen(false);
        setIsHovered(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isHovered, setIsOpen]);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    setIsHovered(false);
    scrollTo(href, { offset: 0 });
  };

  return (
    <>
      {/* Mobile-only backdrop overlay (hidden on desktop via CSS) */}
      {isOpen && (
        <div
          className={styles.backdrop}
          onClick={() => {
            setIsOpen(false);
            setIsHovered(false);
          }}
          aria-hidden="true"
        />
      )}

      <aside
        ref={sidebarRef}
        className={`${styles.sidebarWrapper} ${active ? styles.open : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Side Navigation"
      >
        {/* Subtle Right-Edge Trigger Handle */}
        <button
          className={styles.triggerHandle}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={active ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={active}
          type="button"
        >
          <span className={styles.triggerBar} />
          <span className={styles.triggerLabel}>
            {active ? "CLOSE" : "MENU"}
          </span>
        </button>

        {/* Sidebar Panel Container */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <span className={styles.panelTag}>NAVIGATION</span>
            <button
              className={styles.closeBtn}
              onClick={() => {
                setIsOpen(false);
                setIsHovered(false);
              }}
              aria-label="Close navigation menu"
              type="button"
            >
              ✕
            </button>
          </div>

          {/* Navigation Links */}
          <nav className={styles.nav} aria-label="Main Navigation">
            <ul className={styles.navList}>
              {NAV_LINKS.map((link) => (
                <li key={link.label} className={styles.navItem}>
                  <a
                    href={link.href}
                    className={styles.navLink}
                    onClick={(e) => handleLinkClick(e, link.href)}
                  >
                    <span className={styles.navNum}>{link.num}</span>
                    <span className={styles.navLabel}>{link.label}</span>
                    <span className={styles.navArrow} aria-hidden="true">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.divider} />

          {/* Action & Controls */}
          <div className={styles.panelFooter}>
            {/* Contact Pill CTA */}
            <a
              href="#contact"
              className={styles.contactBtn}
              onClick={(e) => handleLinkClick(e, "#contact")}
            >
              <span>CONTACT</span>
              <span className={styles.contactArrow} aria-hidden="true">→</span>
            </a>

            {/* Theme Toggle Button */}
            <button
              className={styles.themeToggleBtn}
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              type="button"
            >
              {theme === "dark" ? (
                <>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                  <span>LIGHT MODE</span>
                </>
              ) : (
                <>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                  <span>DARK MODE</span>
                </>
              )}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
