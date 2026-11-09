import { useState, useEffect, useRef, useMemo } from "react";
import { useSmoothScroll } from "../context/SmoothScrollContext";
import { personalInfo, stack, projects, experience, certifications, contactLinks } from "../data/data";
import styles from "./CommandPalette.module.css";

export default function CommandPalette({
  isOpen,
  onClose,
  theme,
  toggleTheme,
  onOpenLiveDemo,
  onOpenResume,
}) {
  const { scrollTo } = useSmoothScroll();
  const [mode, setMode] = useState("commands"); // "commands" | "ai"
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "ai",
      text: "👋 Hey there! I'm Jatin's portfolio AI assistant. Ask me anything about Jatin's technical stack, live projects (WatchIt, Stitch), certifications, or experience!",
      actions: [
        { label: "💻 Tech Stack", query: "What is Jatin's tech stack?" },
        { label: "🚀 Projects", query: "Tell me about his top projects" },
        { label: "📜 Certifications", query: "What certifications does he hold?" },
        { label: "✉ Contact", query: "How do I get in touch with Jatin?" },
      ],
    },
  ]);

  const inputRef = useRef(null);
  const listRef = useRef(null);
  const chatBottomRef = useRef(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery("");
      setMode("commands");
    }
  }, [isOpen]);

  // Show temporary toast
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2200);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("jatinofficial1305@gmail.com");
    triggerToast("Email copied to clipboard! ✓");
  };

  const handleNavigate = (hash) => {
    onClose();
    scrollTo(hash, { offset: 0 });
  };

  // Commands definition
  const allCommands = useMemo(() => {
    const list = [
      // Quick Actions
      {
        id: "action-theme",
        group: "Quick Actions",
        title: theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode",
        desc: "Toggle application color scheme",
        icon: theme === "dark" ? "☀️" : "🌙",
        tag: "Theme",
        shortcut: "T",
        action: () => {
          toggleTheme();
          triggerToast(`Switched to ${theme === "dark" ? "Light" : "Dark"} Mode!`);
        },
      },
      {
        id: "action-email",
        group: "Quick Actions",
        title: "Copy Email Address",
        desc: "jatinofficial1305@gmail.com",
        icon: "📋",
        tag: "Contact",
        shortcut: "C",
        action: handleCopyEmail,
      },
      {
        id: "action-resume",
        group: "Quick Actions",
        title: "View & Download Resume",
        desc: "Interactive CV with print and PDF export",
        icon: "📄",
        tag: "Resume",
        shortcut: "R",
        action: () => {
          onClose();
          onOpenResume();
        },
      },
      {
        id: "action-ai",
        group: "Quick Actions",
        title: "Ask AI Assistant",
        desc: "Interactive Q&A about Jatin's skills & work",
        icon: "✨",
        tag: "AI",
        shortcut: "?",
        action: () => {
          setMode("ai");
          setQuery("");
        },
      },

      // Navigation
      {
        id: "nav-hero",
        group: "Navigation",
        title: "Home / Hero",
        desc: "Jump to top introduction",
        icon: "🏠",
        shortcut: "H",
        action: () => handleNavigate("#hero"),
      },
      {
        id: "nav-about",
        group: "Navigation",
        title: "About Jatin",
        desc: "Bio, philosophy, and personal stats",
        icon: "👤",
        shortcut: "A",
        action: () => handleNavigate("#about"),
      },
      {
        id: "nav-projects",
        group: "Navigation",
        title: "Projects Showcase",
        desc: "Explore featured full-stack applications",
        icon: "💼",
        shortcut: "P",
        action: () => handleNavigate("#projects"),
      },
      {
        id: "nav-stack",
        group: "Navigation",
        title: "Technical Stack",
        desc: "React, Next.js, Python, PostgreSQL, etc.",
        icon: "⚡",
        shortcut: "S",
        action: () => handleNavigate("#stack"),
      },
      {
        id: "nav-experience",
        group: "Navigation",
        title: "Timeline & Experience",
        desc: "Open source contributions & CS degree",
        icon: "⏳",
        shortcut: "E",
        action: () => handleNavigate("#experience"),
      },
      {
        id: "nav-certifications",
        group: "Navigation",
        title: "Certifications",
        desc: "Microsoft, DeepLearning.AI & Oracle AI credentials",
        icon: "📜",
        shortcut: "W",
        action: () => handleNavigate("#certifications"),
      },
      {
        id: "nav-contact",
        group: "Navigation",
        title: "Contact Links",
        desc: "Get in touch directly via social links",
        icon: "✉",
        shortcut: "K",
        action: () => handleNavigate("#contact"),
      },

      // Live Demos in Device Frame
      ...projects.map((proj) => ({
        id: `demo-${proj.id}`,
        group: "Live Demos (In-Site Frame)",
        title: `Live Demo: ${proj.title}`,
        desc: `${proj.subtitle} (${proj.type})`,
        icon: "🖥",
        tag: "Device Frame",
        action: () => {
          onClose();
          onOpenLiveDemo(proj);
        },
      })),

      // External Links
      ...contactLinks.map((link) => ({
        id: `link-${link.label}`,
        group: "Social & Links",
        title: link.label,
        desc: link.handle,
        icon: link.icon,
        tag: "External",
        action: () => {
          window.open(link.href, "_blank", "noopener,noreferrer");
          onClose();
        },
      })),
    ];
    return list;
  }, [theme, toggleTheme, onOpenLiveDemo, onOpenResume, onClose]);

  // Filter commands by query
  const filteredCommands = useMemo(() => {
    if (mode === "ai" || !query.trim()) return allCommands;
    const q = query.toLowerCase().trim();
    return allCommands.filter(
      (cmd) =>
        cmd.title.toLowerCase().includes(q) ||
        cmd.desc.toLowerCase().includes(q) ||
        cmd.group.toLowerCase().includes(q)
    );
  }, [allCommands, query, mode]);

  // Keep selected index within bounds
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, mode]);

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current && mode === "commands") {
      const activeEl = listRef.current.querySelector(`.${styles.selected}`);
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [selectedIndex, mode]);

  // Auto scroll chat to bottom
  useEffect(() => {
    if (mode === "ai" && chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, mode]);

  // Ask AI Knowledge Base & Response Engine
  const generateAIResponse = (userQuestion) => {
    const q = userQuestion.toLowerCase().trim();

    // 1. Projects queries
    if (q.includes("project") || q.includes("watchit") || q.includes("stitch") || q.includes("to-do") || q.includes("work")) {
      if (q.includes("watchit") || q.includes("movie")) {
        return {
          text: `🎬 **WatchIt** is an AI-powered movie discovery engine created by Jatin. It uses Google Gemini AI, Python Flask, and live TMDB streaming data to recommend films based on emotional vibes, nuanced sentiment, and cast subtlety.`,
          actions: [
            {
              label: "🖥 Launch WatchIt Live Demo",
              action: () => {
                const p = projects.find((x) => x.title === "WatchIt");
                if (p) {
                  onClose();
                  onOpenLiveDemo(p);
                }
              },
            },
            {
              label: "⌨ WatchIt GitHub Repo",
              action: () => window.open("https://github.com/jatingow/Movie-Recommender", "_blank"),
            },
          ],
        };
      }
      if (q.includes("stitch") || q.includes("pdf")) {
        return {
          text: `📄 **Stitch** is a private, in-browser Image-to-PDF utility crafted with Next.js, React, jsPDF, and Canvas API. It features 100% zero-telemetry, client-side compilation, drag-and-drop sorting, and instant A4 export with no files uploaded to any server.`,
          actions: [
            {
              label: "🖥 Launch Stitch Live Demo",
              action: () => {
                const p = projects.find((x) => x.title === "Stitch");
                if (p) {
                  onClose();
                  onOpenLiveDemo(p);
                }
              },
            },
            {
              label: "⌨ Stitch GitHub Repo",
              action: () => window.open("https://github.com/jatingow/Stitch", "_blank"),
            },
          ],
        };
      }
      return {
        text: `🚀 Jatin has built several production-ready full-stack applications:\n\n• **WatchIt**: AI-driven movie recommendation engine using Google Gemini AI, Flask & TMDB API.\n• **Stitch**: 100% private client-side image-to-PDF builder built with Next.js & jsPDF.\n• **To-Do List**: Retro neo-brutalist task manager with LocalStorage sync.\n\nYou can preview both WatchIt and Stitch live without leaving the website!`,
        actions: [
          {
            label: "🖥 WatchIt Live Frame",
            action: () => {
              const p = projects.find((x) => x.title === "WatchIt");
              if (p) {
                onClose();
                onOpenLiveDemo(p);
              }
            },
          },
          {
            label: "🖥 Stitch Live Frame",
            action: () => {
              const p = projects.find((x) => x.title === "Stitch");
              if (p) {
                onClose();
                onOpenLiveDemo(p);
              }
            },
          },
          {
            label: "📍 Jump to Projects Section",
            action: () => handleNavigate("#projects"),
          },
        ],
      };
    }

    // 2. Tech stack / skills queries
    if (q.includes("stack") || q.includes("skill") || q.includes("tech") || q.includes("language") || q.includes("react") || q.includes("python")) {
      return {
        text: `⚡ Jatin's core engineering stack covers full-stack development & modern architecture:\n\n• **Frontend**: React, Next.js, TypeScript, JavaScript (ES6+), HTML5 & Modern CSS\n• **Languages**: JavaScript, C++, Python, Java, SQL\n• **Backend & DB**: MongoDB, PostgreSQL, Node.js, Flask, REST APIs\n• **DevOps & Tools**: Git, GitHub, Linux / Bash, Vite, Postman`,
        actions: [
          {
            label: "📍 Jump to Tech Stack Section",
            action: () => handleNavigate("#stack"),
          },
          {
            label: "📄 View Resume",
            action: () => {
              onClose();
              onOpenResume();
            },
          },
        ],
      };
    }

    // 3. Certifications queries
    if (q.includes("cert") || q.includes("credential") || q.includes("oracle") || q.includes("microsoft") || q.includes("deeplearning")) {
      return {
        text: `📜 Jatin holds official credentials from top industry institutions:\n\n1. **Foundations of AI and Machine Learning** — Microsoft (2026)\n2. **AI For Everyone** — DeepLearning.AI (2026)\n3. **OCI Certified AI Associate** — Oracle (2025)`,
        actions: [
          {
            label: "📍 View Credentials Section",
            action: () => handleNavigate("#certifications"),
          },
        ],
      };
    }

    // 4. Contact / hiring / location queries
    if (q.includes("contact") || q.includes("email") || q.includes("hire") || q.includes("job") || q.includes("freelance") || q.includes("location") || q.includes("where")) {
      return {
        text: `📬 Jatin is based in **Delhi, India** and is **Available for roles & freelance**!\n\n• **Email**: jatinofficial1305@gmail.com\n• **GitHub**: github.com/jatingow\n• **Status**: Open to full-stack, frontend, and engineering opportunities.`,
        actions: [
          {
            label: "📋 Copy Email",
            action: handleCopyEmail,
          },
          {
            label: "✉ Open Mail Client",
            action: () => window.open("mailto:jatinofficial1305@gmail.com"),
          },
          {
            label: "📍 Jump to Contact Section",
            action: () => handleNavigate("#contact"),
          },
        ],
      };
    }

    // 5. Experience / Education / Bio queries
    if (q.includes("experience") || q.includes("college") || q.includes("student") || q.includes("education") || q.includes("background") || q.includes("who is")) {
      return {
        text: `👨‍💻 **About Jatin Kumar**:\n\n• 3rd-year CS Engineering student with 3+ years of coding experience.\n• **Open Source Contributor** on GitHub (resolving complex React state edge cases & documentation).\n• Passionate about clean architecture, high-speed web apps, micro-interactions, and AI integration.`,
        actions: [
          {
            label: "📍 Jump to About Section",
            action: () => handleNavigate("#about"),
          },
          {
            label: "⏳ Jump to Experience",
            action: () => handleNavigate("#experience"),
          },
          {
            label: "📄 Open Resume",
            action: () => {
              onClose();
              onOpenResume();
            },
          },
        ],
      };
    }

    // 6. Resume
    if (q.includes("resume") || q.includes("cv")) {
      return {
        text: `📄 You can view and print Jatin's full digital resume right here on the site!`,
        actions: [
          {
            label: "📄 Open Resume",
            action: () => {
              onClose();
              onOpenResume();
            },
          },
        ],
      };
    }

    // Default conversational reply
    return {
      text: `🤖 Jatin Kumar is a Full-Stack Developer specializing in React, Next.js, Python, and scalable web apps. Ask me about his projects (WatchIt, Stitch), technical skills, experience, or certifications!`,
      actions: [
        { label: "💻 Tech Stack", query: "What is Jatin's tech stack?" },
        { label: "🚀 Projects", query: "Tell me about his top projects" },
        { label: "📜 Certifications", query: "What certifications does he hold?" },
        { label: "✉ Contact", query: "How do I get in touch with Jatin?" },
      ],
    };
  };

  const handleSendAIQuestion = (textToSend) => {
    const question = textToSend || query;
    if (!question.trim()) return;

    // Add user message
    const userMsg = { sender: "user", text: question };
    const response = generateAIResponse(question);

    setChatMessages((prev) => [
      ...prev,
      userMsg,
      {
        sender: "ai",
        text: response.text,
        actions: response.actions,
      },
    ]);

    setQuery("");
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    // Mode toggling via Tab
    if (e.key === "Tab") {
      e.preventDefault();
      setMode((prev) => (prev === "commands" ? "ai" : "commands"));
      return;
    }

    // If query starts with '?', switch to AI mode
    if (e.key === "?" && query === "" && mode === "commands") {
      e.preventDefault();
      setMode("ai");
      return;
    }

    if (mode === "commands") {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev <= 0 ? filteredCommands.length - 1 : prev - 1
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        const selected = filteredCommands[selectedIndex];
        if (selected && selected.action) {
          selected.action();
        }
      } else if (e.key === "Escape") {
        onClose();
      }
    } else {
      // AI mode
      if (e.key === "Enter") {
        e.preventDefault();
        handleSendAIQuestion(query);
      } else if (e.key === "Escape") {
        if (query) {
          setQuery("");
        } else {
          setMode("commands");
        }
      }
    }
  };

  if (!isOpen) return null;

  // Group commands by category
  const groupedCommands = filteredCommands.reduce((acc, cmd) => {
    if (!acc[cmd.group]) acc[cmd.group] = [];
    acc[cmd.group].push(cmd);
    return acc;
  }, {});

  let runningIndex = 0;

  return (
    <div
      className={styles.backdrop}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      data-lenis-prevent="true"
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
    >
      <div className={styles.palette}>
        {/* Toast Notification */}
        {toastMessage && <div className={styles.toast}>{toastMessage}</div>}

        {/* Top Search & Filter Bar */}
        <div className={styles.searchBar}>
          <div className={styles.searchIcon}>
            {mode === "ai" ? "✨" : "⌘"}
          </div>

          <input
            ref={inputRef}
            type="text"
            className={styles.searchInput}
            placeholder={
              mode === "ai"
                ? "Ask anything about Jatin's skills, projects, background... (Press Enter)"
                : "Type a command, search, or type '?' for Ask AI..."
            }
            value={query}
            onChange={(e) => {
              const val = e.target.value;
              if (val.startsWith("?") && mode === "commands") {
                setMode("ai");
                setQuery(val.slice(1));
              } else {
                setQuery(val);
              }
            }}
            onKeyDown={handleKeyDown}
            aria-label="Command input"
          />

          {/* Mode Switcher */}
          <div className={styles.modeToggles}>
            <button
              className={`${styles.modeBtn} ${mode === "commands" ? styles.active : ""}`}
              onClick={() => setMode("commands")}
              type="button"
            >
              <span>⌘</span>
              <span>Commands</span>
            </button>
            <button
              className={`${styles.modeBtn} ${mode === "ai" ? styles.active : ""}`}
              onClick={() => setMode("ai")}
              type="button"
            >
              <span>✨</span>
              <span>Ask AI</span>
            </button>
          </div>

          <button
            className={styles.closeKey}
            onClick={onClose}
            aria-label="Close command palette"
            title="Close (Esc)"
          >
            Esc
          </button>
        </div>

        {/* ── MODE 1: Commands List View ── */}
        {mode === "commands" && (
          <div ref={listRef} className={styles.listContainer}>
            {filteredCommands.length === 0 ? (
              <div className={styles.emptyState}>
                <span style={{ fontSize: "1.8rem" }}>🔍</span>
                <span className={styles.emptyTitle}>No matching commands</span>
                <span className={styles.emptySub}>
                  Couldn't find anything matching "{query}". Want to ask our AI about it?
                </span>
                <button
                  className={styles.askAiSuggestionBtn}
                  onClick={() => {
                    setMode("ai");
                    handleSendAIQuestion(query);
                  }}
                >
                  <span>✨ Ask AI about "{query}"</span>
                </button>
              </div>
            ) : (
              Object.entries(groupedCommands).map(([groupName, items]) => (
                <div key={groupName} className={styles.group}>
                  <div className={styles.groupLabel}>{groupName}</div>
                  {items.map((cmd) => {
                    const currentIndex = runningIndex++;
                    const isSelected = currentIndex === selectedIndex;
                    return (
                      <div
                        key={cmd.id}
                        className={`${styles.item} ${isSelected ? styles.selected : ""}`}
                        onClick={cmd.action}
                        onMouseEnter={() => setSelectedIndex(currentIndex)}
                      >
                        <div className={styles.itemLeft}>
                          <span className={styles.itemIcon}>{cmd.icon}</span>
                          <div className={styles.itemContent}>
                            <span className={styles.itemTitle}>{cmd.title}</span>
                            <span className={styles.itemDesc}>{cmd.desc}</span>
                          </div>
                        </div>

                        <div className={styles.itemRight}>
                          {cmd.tag && (
                            <span className={styles.tagBadge}>{cmd.tag}</span>
                          )}
                          {cmd.shortcut && (
                            <span className={styles.shortcutKey}>
                              {cmd.shortcut}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        )}

        {/* ── MODE 2: Ask AI View ── */}
        {mode === "ai" && (
          <div className={styles.aiContainer}>
            <div className={styles.aiMessages}>
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={styles.aiMessageBubble}>
                  <div className={msg.sender === "ai" ? styles.aiAvatar : styles.userAvatar}>
                    {msg.sender === "ai" ? "✨" : "👤"}
                  </div>
                  <div
                    className={
                      msg.sender === "ai"
                        ? styles.aiBubbleContent
                        : styles.userBubbleContent
                    }
                  >
                    <div style={{ whiteSpace: "pre-line" }}>{msg.text}</div>

                    {/* Interactive Action Pills */}
                    {msg.actions && msg.actions.length > 0 && (
                      <div className={styles.aiActions}>
                        {msg.actions.map((act, actIdx) => (
                          <button
                            key={actIdx}
                            className={styles.aiActionBtn}
                            onClick={() => {
                              if (act.action) {
                                act.action();
                              } else if (act.query) {
                                handleSendAIQuestion(act.query);
                              }
                            }}
                          >
                            <span>{act.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={chatBottomRef} />
            </div>

            {/* Quick Prompts Suggestions */}
            <div className={styles.aiSuggestions}>
              <span style={{ fontSize: "0.68rem", color: "var(--tx-dim)", alignSelf: "center", marginRight: "4px" }}>
                Try asking:
              </span>
              {[
                "Tell me about WatchIt",
                "How does Stitch work?",
                "What is his tech stack?",
                "Certifications?",
                "Contact info",
              ].map((suggestion, i) => (
                <button
                  key={i}
                  className={styles.suggestionChip}
                  onClick={() => handleSendAIQuestion(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Footer Status Bar ── */}
        <div className={styles.paletteFooter}>
          <div className={styles.footerHints}>
            <span className={styles.footerHint}>
              <kbd className={styles.kbd}>↑↓</kbd> Navigate
            </span>
            <span className={styles.footerHint}>
              <kbd className={styles.kbd}>↵</kbd> Select
            </span>
            <span className={styles.footerHint}>
              <kbd className={styles.kbd}>Tab</kbd> Switch Mode
            </span>
            <span className={styles.footerHint}>
              <kbd className={styles.kbd}>Esc</kbd> Close
            </span>
          </div>
          <div>
            <span style={{ color: "var(--tx-dim)" }}>
              {mode === "commands" ? "⌘K Quick Access" : "✨ AI Knowledge Engine"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

