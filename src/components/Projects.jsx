import { useMemo } from "react";
import { motion } from "framer-motion";
import { projects } from "../data/data";
import AccordionGallery from "./AccordionGallery";
import styles from "./Projects.module.css";

export default function Projects({ onOpenLiveDemo }) {
  // Map portfolio projects into 5 rich showcase items for the accordion gallery
  const items = useMemo(() => {
    const watchit = projects.find((p) => p.title === "WatchIt") || projects[0];
    const stitch = projects.find((p) => p.title === "Stitch") || projects[1];
    const todo = projects.find((p) => p.title === "To-Do List") || projects[2];

    return [
      {
        image: "/projects/watchit-1.png",
        label: "WatchIt",
        subtitle: "AI-Powered Movie Discovery Engine",
        type: watchit.type,
        desc: watchit.desc,
        tags: watchit.tags,
        link: watchit.live,
        live: watchit.live,
        github: watchit.github,
        project: watchit,
      },
      {
        image: "/projects/stitch.jpg",
        label: "Stitch",
        subtitle: "High-Speed Private PDF Builder",
        type: stitch.type,
        desc: stitch.desc,
        tags: stitch.tags,
        link: stitch.live,
        live: stitch.live,
        github: stitch.github,
        project: stitch,
      },
      {
        image: "/projects/watchit-2.png",
        label: "AI Vibe Check",
        subtitle: "Gemini Semantic Film Discovery",
        type: "Gemini AI Engine",
        desc: "Natural-language semantic movie match engine powered by Google Gemini AI and live TMDB streaming data. Explores films based on nuanced emotional vibes and mood.",
        tags: ["Google Gemini AI", "Flask", "Python", "TMDB API", "NLP"],
        link: watchit.live,
        live: watchit.live,
        github: watchit.github,
        project: watchit,
      },
      {
        image: "/projects/To-Do List.png",
        label: "To-Do List",
        subtitle: "Neo-Brutalist Task Manager",
        type: todo.type,
        desc: todo.desc,
        tags: todo.tags,
        link: todo.live,
        live: todo.live,
        github: todo.github,
        project: todo,
      },
      {
        image: "/projects/watchit-3.png",
        label: "Watchlist Sync",
        subtitle: "Personal Movie Queue & Ratings",
        type: "State-Synced UI",
        desc: "Fast client-side watchlist tracking with instant bookmarking, state sync, rating comparisons, and responsive cinematic preview cards.",
        tags: ["JavaScript", "LocalStorage", "REST APIs", "Modern CSS"],
        link: watchit.live,
        live: watchit.live,
        github: watchit.github,
        project: watchit,
      },
    ];
  }, []);

  return (
    <section className={styles.section} id="projects">
      <div className="container">
        {/* Section Header Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "0px 0px -50px 0px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="section-header-eyebrow"
        >
          <div className="section-tag">
            <span>PROJECTS</span>
          </div>
          <span className={styles.countIndicator}>
            (0{projects.length} PROJECTS · EXPANDABLE ACCORDION GALLERY)
          </span>
        </motion.div>
      </div>

      {/* Accordion Gallery Showcase Container */}
      <div className="container" style={{ marginTop: "1rem" }}>
        <AccordionGallery
          items={items}
          defaultIndex={2}
          expandRatio={0.52}
          trigger="hover"
          accentColor="#0392ab"
          overlayColor="#000000"
          onOpenLiveDemo={onOpenLiveDemo}
        />
      </div>
    </section>
  );
}
