import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import "./styles/globals.css";

import { SmoothScrollProvider } from "./context/SmoothScrollContext";
import CustomCursor       from "./components/CustomCursor";
import AwwwardsBadge      from "./components/AwwwardsBadge";
import Sidebar            from "./components/Sidebar";
import Hero               from "./components/Hero";
import Marquee            from "./components/Marquee";
import About              from "./components/About";
import Projects           from "./components/Projects";
import Stack              from "./components/Stack";
import Experience         from "./components/Experience";
import Certifications     from "./components/Certifications";
import Contact            from "./components/Contact";
import Footer             from "./components/Footer";
import LoadingScreen      from "./components/LoadingScreen";
import CommandPalette     from "./components/CommandPalette";
import LiveDemoModal      from "./components/LiveDemoModal";
import ResumeModal        from "./components/ResumeModal";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFocusing, setIsFocusing] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Modals & Command Palette States
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [liveDemoProject, setLiveDemoProject] = useState(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Persist theme to <html data-theme>
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Global Keyboard Shortcut: ⌘K or Ctrl+K to toggle Command Palette
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <SmoothScrollProvider isLoading={isLoading}>
      <Helmet>
        <title>Jatin Kumar — Full-Stack Developer</title>
        <meta
          name="description"
          content="Full-Stack Developer portfolio of Jatin Kumar. Building performant, modern web apps and systems with React, Next.js, and TypeScript."
        />
      </Helmet>

      {/* Initial load screen with MagicRings */}
      {isLoading && (
        <LoadingScreen
          onFocusStart={() => setIsFocusing(true)}
          onComplete={() => setIsLoading(false)}
        />
      )}

      {/* Ambient background grid mesh */}
      <div className="bg-grid-overlay" aria-hidden="true" />

      {/* Interactive custom cursor */}
      <CustomCursor />

      {/* Awwwards fixed vertical honors badge on right edge */}
      <AwwwardsBadge />

      {/* Fixed Right-Side Overlay Sidebar Navigation */}
      <Sidebar
        theme={theme}
        toggleTheme={toggleTheme}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      <main className={isFocusing ? "hero-focus-in" : "hero-defocused"}>
        {/* Full-Screen continuous Hero canvas with integrated brand and controls */}
        <Hero
          theme={theme}
          toggleTheme={toggleTheme}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        />
        <Marquee />
        <About />
        <Projects onOpenLiveDemo={(project) => setLiveDemoProject(project)} />
        <Stack />
        <Experience />
        <Certifications />
        <Contact />
      </main>

      <Footer />

      {/* ⌘K Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenLiveDemo={(project) => setLiveDemoProject(project)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Live Demo Device-Frame Modal */}
      <LiveDemoModal
        isOpen={!!liveDemoProject}
        project={liveDemoProject}
        onClose={() => setLiveDemoProject(null)}
      />

      {/* Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </SmoothScrollProvider>
  );
}
