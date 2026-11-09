import { useState, useEffect } from "react";
import "./AccordionGallery.css";

const DEFAULT_ITEMS = [
  { image: "https://picsum.photos/id/1015/900/1200", label: "Canyon", link: "#" },
  { image: "https://picsum.photos/id/1018/900/1200", label: "Ridgeline", link: "#" },
  { image: "https://picsum.photos/id/1039/900/1200", label: "Falls", link: "#" },
  { image: "https://picsum.photos/id/1043/900/1200", label: "Harbour", link: "#" },
  { image: "https://picsum.photos/id/1044/900/1200", label: "Skyline", link: "#" },
];

export default function AccordionGallery({
  items = DEFAULT_ITEMS,
  defaultIndex = 2,
  expandRatio = 0.52,
  trigger = "hover",
  accentColor = "#0392ab",
  overlayColor = "#000000",
  onOpenLiveDemo,
  className = "",
  style = {},
}) {
  const safeDefaultIndex = Math.max(
    0,
    Math.min(items.length - 1, defaultIndex ?? 0)
  );
  const [activeIndex, setActiveIndex] = useState(safeDefaultIndex);

  // Keep activeIndex within bounds if items change
  useEffect(() => {
    setActiveIndex((prev) =>
      Math.max(0, Math.min(items.length - 1, prev ?? safeDefaultIndex))
    );
  }, [items.length, safeDefaultIndex]);

  const total = items.length || 1;
  const collapsedRatio = total > 1 ? (1 - expandRatio) / (total - 1) : 1;

  const handleItemInteract = (idx) => {
    if (idx !== activeIndex && idx >= 0 && idx < total) {
      setActiveIndex(idx);
    }
  };

  return (
    <div
      className={`accordionGalleryContainer ${className}`}
      style={style}
      role="region"
      aria-label="Project Accordion Gallery"
      data-lenis-prevent="true"
    >
      {items.map((item, idx) => {
        const isActive = activeIndex === idx;
        const flexValue = isActive ? expandRatio : collapsedRatio;
        const liveUrl = item.live || item.link;

        return (
          <div
            key={idx}
            className={`accordionItem ${isActive ? "active" : "collapsed"}`}
            style={{
              flex: flexValue,
              borderColor: isActive ? accentColor : "var(--border)",
            }}
            onClick={() => handleItemInteract(idx)}
            onMouseEnter={() => {
              if (trigger === "hover") handleItemInteract(idx);
            }}
            onFocus={() => handleItemInteract(idx)}
            tabIndex={0}
            role="tab"
            aria-selected={isActive}
            aria-label={item.label || item.title || `Project ${idx + 1}`}
          >
            {/* Background Image Wrapper */}
            <div className="accordionImageWrapper">
              <img
                src={item.image || item.src}
                alt={item.label || item.title || "Project screenshot"}
                className="accordionImage"
                loading="eager"
                draggable="false"
              />

              {/* Base Dimming Overlay */}
              <div
                className="accordionOverlay"
                style={{
                  backgroundColor: overlayColor,
                }}
              />

              {/* Expanded Bottom Gradient */}
              <div
                className="expandedBackdropGradient"
                style={{
                  background: `linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.4) 35%, ${overlayColor} 100%)`,
                }}
              />
            </div>

            {/* ── Collapsed Vertical Label Spine ── */}
            <div className="collapsedLabel">
              <div className="collapsedTop">
                <span className="collapsedIndex">0{idx + 1}</span>
              </div>
              <div className="collapsedBottom">
                <span className="verticalText">
                  {item.label || item.title}
                </span>
              </div>
            </div>

            {/* ── Expanded Full Project Details Card ── */}
            <div className="expandedContent">
              {/* Header Badges */}
              <div className="expandedHeader">
                <div
                  className="accentBar"
                  style={{ backgroundColor: accentColor }}
                />
                <span className="expandedIndexBadge">0{idx + 1}</span>
                {item.type && (
                  <span className="expandedTypeBadge">{item.type}</span>
                )}
              </div>

              {/* Title & Subtitle */}
              <h3 className="expandedTitle">
                {item.label || item.title}
              </h3>
              {item.subtitle && (
                <p className="expandedSubtitle" style={{ color: accentColor }}>
                  {item.subtitle}
                </p>
              )}

              {/* Description */}
              {item.desc && (
                <p className="expandedDesc">{item.desc}</p>
              )}

              {/* Tech Stack Pills */}
              {item.tags && item.tags.length > 0 && (
                <div className="expandedTags">
                  {item.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="techTag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Buttons Row */}
              <div className="expandedActions">
                {/* Live Demo Modal Trigger Button */}
                {liveUrl && (
                  <button
                    type="button"
                    className="liveDemoBtn"
                    style={{ backgroundColor: accentColor }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onOpenLiveDemo) {
                        onOpenLiveDemo(item.project || item);
                      } else {
                        window.open(liveUrl, "_blank", "noopener,noreferrer");
                      }
                    }}
                    aria-label={`Open Live Demo for ${item.label || item.title}`}
                  >
                    <span className="liveDotPulse" />
                    <span>LIVE DEMO</span>
                  </button>
                )}

                {/* External Link */}
                {liveUrl && liveUrl !== "#" && (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="externalLinkBtn"
                    onClick={(e) => e.stopPropagation()}
                    aria-label="Open external project in new tab"
                  >
                    <span>VISIT</span>
                    <span>↗</span>
                  </a>
                )}

                {/* GitHub Source Code */}
                {item.github && (
                  <a
                    href={item.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="githubBtn"
                    onClick={(e) => e.stopPropagation()}
                    aria-label="Open GitHub repository"
                  >
                    <span>CODE</span>
                    <span>⌨</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

