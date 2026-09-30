import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import "./styles/globals.css";

import { SmoothScrollProvider } from "./context/SmoothScrollContext";
import WebGLBackground    from "./components/WebGLBackground";
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

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState("dark");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Persist theme to <html data-theme>
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

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

      {/* Initial load screen with CometDial */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Premium WebGL Ambient Wave Mesh (Hardware-accelerated Three.js) */}
      <WebGLBackground />

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
      />

      <main>
        {/* Full-Screen continuous Hero canvas with integrated brand and controls */}
        <Hero
          theme={theme}
          toggleTheme={toggleTheme}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        />
        <Marquee />
        <About />
        <Projects />
        <Stack />
        <Experience />
        <Certifications />
        <Contact />
      </main>

      <Footer />
    </SmoothScrollProvider>
  );
}
