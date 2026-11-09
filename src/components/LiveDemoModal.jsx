import { useState, useEffect, useRef } from "react";
import styles from "./LiveDemoModal.module.css";

export default function LiveDemoModal({ project, isOpen, onClose }) {
  const [device, setDevice] = useState("desktop");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);
  const modalRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Reset loading state when project changes or reload key increments
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
    }
  }, [project, reloadKey, isOpen]);

  if (!isOpen || !project) return null;

  const liveUrl = project.live || project.link || "";
  const isRenderBackend = liveUrl.includes("onrender.com");

  const handleReload = () => {
    setIsLoading(true);
    setReloadKey((prev) => prev + 1);
  };

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const frameClass =
    device === "mobile"
      ? styles.frameMobile
      : device === "tablet"
      ? styles.frameTablet
      : styles.frameDesktop;

  return (
    <div
      className={styles.overlay}
      onClick={handleBackdropClick}
      data-lenis-prevent="true"
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-modal-title"
    >
      <div
        ref={modalRef}
        className={`${styles.modalContainer} ${isFullscreen ? styles.fullscreen : ""}`}
      >
        {/* Top Browser Chrome Bar */}
        <div className={styles.chromeBar}>
          <div className={styles.chromeLeft}>
            <div className={styles.windowDots}>
              <button
                className={`${styles.dot} ${styles.dotClose}`}
                onClick={onClose}
                aria-label="Close demo"
                title="Close (Esc)"
              />
              <button
                className={`${styles.dot} ${styles.dotMinimize}`}
                onClick={() => setDevice("tablet")}
                aria-label="Tablet mode"
                title="Tablet size"
              />
              <button
                className={`${styles.dot} ${styles.dotExpand}`}
                onClick={() => setIsFullscreen((prev) => !prev)}
                aria-label="Toggle fullscreen"
                title="Fullscreen"
              />
            </div>

            <div className={styles.projectInfo}>
              <span id="demo-modal-title" className={styles.projectTitle}>
                {project.title}
              </span>
              <span className={styles.liveBadge}>
                <span className={styles.livePulse} />
                LIVE
              </span>
            </div>
          </div>

          {/* Center: Device Switcher & URL Bar */}
          <div className={styles.chromeCenter}>
            <div className={styles.deviceSelector} role="group" aria-label="Device Viewport">
              <button
                className={`${styles.deviceBtn} ${device === "desktop" ? styles.active : ""}`}
                onClick={() => setDevice("desktop")}
                type="button"
                title="Desktop View"
              >
                <span>💻</span>
                <span>Desktop</span>
              </button>
              <button
                className={`${styles.deviceBtn} ${device === "tablet" ? styles.active : ""}`}
                onClick={() => setDevice("tablet")}
                type="button"
                title="Tablet View (iPad)"
              >
                <span>📱</span>
                <span>Tablet</span>
              </button>
              <button
                className={`${styles.deviceBtn} ${device === "mobile" ? styles.active : ""}`}
                onClick={() => setDevice("mobile")}
                type="button"
                title="Mobile View (iPhone)"
              >
                <span>📲</span>
                <span>Mobile</span>
              </button>
            </div>

            <div className={styles.urlBar} title={liveUrl}>
              <span className={styles.lockIcon} aria-hidden="true">🔒</span>
              <span className={styles.urlText}>{liveUrl}</span>
            </div>
          </div>

          {/* Right: Actions */}
          <div className={styles.chromeRight}>
            <button
              className={styles.actionBtn}
              onClick={handleReload}
              aria-label="Reload demo"
              title="Reload frame"
              type="button"
            >
              🔄
            </button>

            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.actionBtn}
              aria-label="Open in new window"
              title="Open full page in new tab"
            >
              ↗
            </a>

            <button
              className={styles.actionBtn}
              onClick={() => setIsFullscreen((prev) => !prev)}
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              title="Toggle fullscreen"
              type="button"
            >
              {isFullscreen ? "⊡" : "⛶"}
            </button>

            <button
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Close live demo"
              title="Close (Esc)"
              type="button"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Helpful Banner (e.g. for Render sleep or iframe fallback) */}
        {isRenderBackend && (
          <div className={styles.helperBanner}>
            <div className={styles.helperText}>
              <span>⚡</span>
              <span>
                <strong>Render Free-Tier Notice:</strong> If this service was asleep, it may take 20–30s to initialize.
              </span>
            </div>
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.helperLink}
            >
              Open directly in new tab ↗
            </a>
          </div>
        )}

        {/* Stage / Device Viewport Area */}
        <div className={styles.stage}>
          <div className={frameClass}>
            {device === "mobile" && (
              <>
                <div className={styles.mobileNotch}>
                  <div className={styles.notchCamera} />
                  <div className={styles.notchSpeaker} />
                </div>
                <div className={styles.mobileHomeBar} />
              </>
            )}

            {/* Spinner Loading State */}
            {isLoading && (
              <div className={styles.loadingOverlay}>
                <div className={styles.spinner} />
                <span className={styles.loadingText}>
                  Loading live preview for {project.title}...
                </span>
              </div>
            )}

            {/* Live Sandbox Iframe */}
            <iframe
              key={reloadKey}
              src={liveUrl}
              title={`${project.title} live preview`}
              className={styles.iframe}
              loading="eager"
              onLoad={() => setIsLoading(false)}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

