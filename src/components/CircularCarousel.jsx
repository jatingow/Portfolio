import { useRef, useState, useEffect, useCallback } from "react";
import "./CircularCarousel.css";

const DEFAULT_ITEMS = [
  { src: "/images/valley.jpg", alt: "Mist drifting through a valley", title: "Valley", subtitle: "Landscape" },
  { src: "/images/portrait.jpg", alt: "A studio portrait", title: "Portrait", subtitle: "Studio" },
  { src: "/images/towers.jpg", alt: "Glass towers from street level", title: "Towers", subtitle: "Architecture" },
];

export default function CircularCarousel({
  items = DEFAULT_ITEMS,
  preset = "panorama",
  intro = "spin",
  cardWidth = 264,
  aspectRatio = 0.75,
  speed = 14,
  captions = true,
  gap = 22,
  tilt = 0,
  perspective = 1800,
  onOpenLiveDemo,
}) {
  const rootRef = useRef(null);
  const ringRef = useRef(null);

  // Ensure enough items for a full 360-degree cylinder (duplicate if items < 6)
  const displayItems =
    items.length > 0 && items.length < 6
      ? [...items, ...items]
      : items;

  const totalCards = displayItems.length || 1;
  const anglePerCard = 360 / totalCards;

  // Responsive card dimensions for smaller screens
  const [effectiveCardWidth, setEffectiveCardWidth] = useState(cardWidth);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) {
        setEffectiveCardWidth(Math.min(cardWidth, 210));
      } else if (window.innerWidth < 768) {
        setEffectiveCardWidth(Math.min(cardWidth, 235));
      } else {
        setEffectiveCardWidth(cardWidth);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [cardWidth]);

  // Cylinder radius derived from card width + gap
  const cardHeight = Math.round(effectiveCardWidth / aspectRatio);
  const radius = Math.round((effectiveCardWidth + gap) / (2 * Math.tan(Math.PI / totalCards)));

  // Rotation states & physics
  const [rotation, setRotation] = useState(intro === "spin" ? -180 : 0);
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const rotRef = useRef(intro === "spin" ? -180 : 0);
  const targetRotRef = useRef(0);
  const velRef = useRef(0);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const rafRef = useRef(null);
  const isHoveredRef = useRef(false);

  // Intro animation
  useEffect(() => {
    if (intro === "spin") {
      targetRotRef.current = 0;
    }
  }, [intro]);

  // Main animation / physics loop
  useEffect(() => {
    let prevTime = performance.now();

    const loop = (now) => {
      const dt = Math.min((now - prevTime) / 1000, 0.1);
      prevTime = now;

      if (!isDraggingRef.current) {
        // If momentum velocity exists, decay it
        if (Math.abs(velRef.current) > 0.05) {
          rotRef.current += velRef.current * dt * 60;
          velRef.current *= Math.pow(0.92, dt * 60);
        } else {
          velRef.current = 0;
          // Smooth spring to target if a card was clicked or stepped
          if (targetRotRef.current !== null) {
            const diff = targetRotRef.current - rotRef.current;
            if (Math.abs(diff) > 0.05) {
              rotRef.current += diff * Math.min(1, 10 * dt);
            } else {
              rotRef.current = targetRotRef.current;
              targetRotRef.current = null;
            }
          } else if (!isHoveredRef.current && speed > 0) {
            // Auto-drift when not hovering and no momentum
            rotRef.current += speed * dt;
          }
        }
      }

      // Update ring transform directly for smooth 60/120fps performance
      if (ringRef.current) {
        ringRef.current.style.transform = `rotateY(${-rotRef.current}deg) rotateX(${tilt}deg)`;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [speed, tilt]);

  // ── Mouse & Touch Drag Handlers ──
  const handlePointerDown = useCallback((e) => {
    // Only drag with left mouse button or touch
    if (e.button !== undefined && e.button !== 0) return;
    isDraggingRef.current = true;
    setIsDragging(true);
    targetRotRef.current = null;
    velRef.current = 0;

    const clientX = e.clientX ?? (e.touches && e.touches[0].clientX);
    startXRef.current = clientX;
    lastXRef.current = clientX;
    lastTimeRef.current = performance.now();
  }, []);

  const handlePointerMove = useCallback((e) => {
    if (!isDraggingRef.current) return;
    const clientX = e.clientX ?? (e.touches && e.touches[0].clientX);
    const now = performance.now();
    const dt = Math.max((now - lastTimeRef.current) / 1000, 0.001);
    const dx = clientX - lastXRef.current;

    // Convert pixel movement to angle degrees
    const degPerPx = 360 / (radius * 2 * Math.PI);
    const dAngle = -dx * degPerPx * 1.25;

    rotRef.current += dAngle;
    velRef.current = dAngle / (dt * 60);

    lastXRef.current = clientX;
    lastTimeRef.current = now;
  }, [radius]);

  const handlePointerUp = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);
  }, []);

  useEffect(() => {
    const onMove = (e) => handlePointerMove(e);
    const onUp = () => handlePointerUp();

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointercancel", onUp, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  // Rotate to specific card index
  const rotateToIndex = (idx) => {
    const targetAngle = idx * anglePerCard;
    // Find closest rotation offset to avoid spinning around unnecessarily
    const current = rotRef.current;
    const normalizedTarget = Math.round((current - targetAngle) / 360) * 360 + targetAngle;
    targetRotRef.current = normalizedTarget;
    velRef.current = 0;
  };

  const handlePrev = () => {
    targetRotRef.current = (targetRotRef.current ?? rotRef.current) - anglePerCard;
    velRef.current = 0;
  };

  const handleNext = () => {
    targetRotRef.current = (targetRotRef.current ?? rotRef.current) + anglePerCard;
    velRef.current = 0;
  };

  return (
    <div
      ref={rootRef}
      className={`circularCarouselRoot ${isDragging ? "isDragging" : ""}`}
      style={{
        perspective: `${perspective}px`,
      }}
      onPointerDown={handlePointerDown}
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
        setHoveredIdx(null);
      }}
      data-lenis-prevent="true"
      role="region"
      aria-label="3D Projects Carousel"
    >
      <div className="circularCarouselStage">
        <div ref={ringRef} className="circularCarouselRing">
          {displayItems.map((item, idx) => {
            const cardAngle = idx * anglePerCard;
            const isHovered = hoveredIdx === idx;

            // Panorama 3D transform: inward cylinder facing the viewer
            const transform =
              preset === "panorama"
                ? `rotateY(${cardAngle}deg) translateZ(${radius}px) rotateY(180deg) ${
                    isHovered ? "scale(1.08) translateZ(35px)" : ""
                  }`
                : `rotateY(${cardAngle}deg) translateZ(${radius}px) ${
                    isHovered ? "scale(1.08) translateZ(35px)" : ""
                  }`;

            return (
              <div
                key={idx}
                className={`carouselCard ${isHovered ? "isHovered" : ""}`}
                style={{
                  width: `${effectiveCardWidth}px`,
                  height: `${cardHeight}px`,
                  marginLeft: `-${effectiveCardWidth / 2}px`,
                  marginTop: `-${cardHeight / 2}px`,
                  transform,
                }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => {
                  rotateToIndex(idx);
                }}
              >
                <div className="cardMedia">
                  <img
                    src={item.src || item.image}
                    alt={item.alt || item.title}
                    className="cardImg"
                    loading="eager"
                    draggable="false"
                  />

                  {/* Corner Badge */}
                  <div className="cardTopTag">
                    <span className="cardTopDot" />
                    <span>0{(idx % items.length) + 1}</span>
                  </div>

                  {/* Default Caption (hidden on hover) */}
                  {captions && (
                    <div className="defaultCaption">
                      <span className="captionTitle">{item.title}</span>
                      <span className="captionSubtitle">{item.subtitle}</span>
                    </div>
                  )}

                  {/* ── Hover Pop-Out Overlay: Project Details & Tech Stack ── */}
                  <div className="hoverOverlay">
                    <div className="hoverHeader">
                      {item.type && (
                        <span className="hoverTypeBadge">{item.type}</span>
                      )}
                      <h4 className="hoverTitle">{item.title}</h4>
                      <span className="hoverSubtitle">{item.subtitle}</span>
                    </div>

                    {/* Short Description */}
                    {item.desc && (
                      <p className="hoverDesc">{item.desc}</p>
                    )}

                    {/* Tech Stack Pills */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="hoverTagsContainer">
                        <span className="hoverTagsLabel">Tech Stack:</span>
                        <div className="hoverTagList">
                          {item.tags.slice(0, 4).map((tag, tIdx) => (
                            <span key={tIdx} className="hoverTag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons: Live Demo & Links */}
                    <div className="hoverActionsRow">
                      {item.live && (
                        <button
                          type="button"
                          className="hoverLiveBtn"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onOpenLiveDemo) {
                              onOpenLiveDemo(item.project || item);
                            } else {
                              window.open(item.live, "_blank", "noopener,noreferrer");
                            }
                          }}
                          aria-label={`Open live demo for ${item.title}`}
                        >
                          <span>LIVE DEMO</span>
                          <span>↗</span>
                        </button>
                      )}

                      {item.github && (
                        <a
                          href={item.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hoverIconBtn"
                          onClick={(e) => e.stopPropagation()}
                          title="Source Code (GitHub)"
                          aria-label="View Source Code"
                        >
                          ⌨
                        </a>
                      )}

                      {item.live && (
                        <a
                          href={item.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hoverIconBtn"
                          onClick={(e) => e.stopPropagation()}
                          title="Open in new window"
                          aria-label="Open in new window"
                        >
                          ↗
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Bottom Controls & Interaction Hint ── */}
      <div className="carouselControls">
        <div className="carouselHint">
          <span className="hintPulse" />
          <span>DRAG TO ROTATE ✱ HOVER FOR TECH STACK & DETAILS</span>
        </div>

        <div className="navArrows">
          <button
            className="navArrowBtn"
            onClick={handlePrev}
            type="button"
            aria-label="Previous Project"
            title="Rotate Left"
          >
            ←
          </button>
          <button
            className="navArrowBtn"
            onClick={handleNext}
            type="button"
            aria-label="Next Project"
            title="Rotate Right"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
