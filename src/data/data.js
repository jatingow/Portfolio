export const personalInfo = {
  name: "Jatin Kumar",
  title: "Full-Stack Developer",
  role: "Creative Engineer & CS Student",
  location: "Delhi, India",
  status: "Available for roles & freelance",
  bioLead: "Hey everyone, I'm Jatin Kumar. A 3rd year CS student. I have been learning how to program for about 3 years now.",
  bioDetails: [
    "I focus on crafting fast, modern web applications and scalable full-stack software, working primarily with React, Next.js, JavaScript, and backend systems.",
    "Driven by clean architecture, intuitive micro-interactions, and open-source collaboration. Always keen to explore emerging tech and build products that solve real problems."
  ],
  stats: [
    { value: "+3", label: "Years Coding" },
    { value: "11+", label: "Tech Mastered" },
    { value: "100%", label: "Lighthouse Passion" },
    { value: "OSS", label: "Open Source" },
  ],
};

export const stack = {
  Frontend: ["React", "Next.js", "JavaScript (ES6+)", "TypeScript", "HTML5 & Modern CSS"],
  Languages: ["JavaScript", "C++", "Python", "Java", "SQL"],
  Backend_DB: ["MongoDB", "PostgreSQL", "Node.js", "REST APIs", "Flask"],
  Tools_DevOps: ["Git", "GitHub", "Linux / Bash", "Vite", "Postman"],
};

export const hotSkills = ["React", "Next.js", "JavaScript (ES6+)", "PostgreSQL", "Python"];

export const experience = [
  {
    id: "01",
    role: "Open Source Contributor",
    org: "GitHub · Global Ecosystem",
    period: "2024 — Present",
    type: "Open Source",
    desc: "Actively contributing bug fixes, performance improvements, and documentation across modern web repositories. Collaborating with international maintainers, reviewing code, and shipping production-ready PRs.",
    highlights: [
      "Resolved complex UI & state management edge cases in React ecosystems",
      "Streamlined developer documentation and onboarding workflows",
      "Mastered distributed asynchronous Git workflows and clean branch hygiene"
    ],
    tags: ["React", "JavaScript", "Git", "Open Source", "Code Review"],
  },
  {
    id: "02",
    role: "B.E. Computer Science & Engineering",
    org: "CS Engineering · India",
    period: "2023 — Present",
    type: "Academics",
    desc: "Rigorous focus on Data Structures & Algorithms, Operating Systems, Database Management Systems, and Software Architecture. Constantly translating academic theory into real-world software.",
    highlights: [
      "In-depth analysis of algorithmic time/space complexities in C++ & Java",
      "Relational database design, query optimization, and normalization",
      "Operating system principles: process concurrency, memory management, file systems"
    ],
    tags: ["DSA", "Operating Systems", "DBMS", "C++", "Java", "Computer Networks"],
  },
];

export const projects = [
  {
    id: "01",
    title: "WatchIt",
    subtitle: "AI-Powered Movie Discovery Engine",
    type: "Full-Stack Web App",
    year: "2024",
    desc: "An intelligent cinematic recommendation engine marrying Python Flask and modern JavaScript. Users explore films based on nuanced emotional 'vibes', cast, and genre subtleties, powered by Google Gemini AI and live TMDB streaming data.",
    image: "/projects/watchit-1.png",
    images: [
      {
        src: "/projects/watchit-1.png",
        title: "Talk Of The Town",
        tag: "Explore Feed",
        desc: "Curated trending releases with real-time ratings and quick watchlist access",
      },
      {
        src: "/projects/watchit-2.png",
        title: "AI Vibe Check",
        tag: "Gemini AI Discovery",
        desc: "Natural-language semantic movie match engine powered by Google Gemini AI",
      },
      {
        src: "/projects/watchit-3.png",
        title: "My Watchlist",
        tag: "Personal Queue",
        desc: "Fast client-side watchlist tracking with instant bookmarking and state sync",
      },
    ],
    tags: ["Flask", "JavaScript", "Google Gemini AI", "TMDB API", "Modern CSS"],
    link: "https://github.com/jatingow/Movie-Recommender",
    metrics: "Sub-200ms Search · AI Sentiment Analysis · Responsive UI",
  },
  {
    id: "02",
    title: "Stitch",
    subtitle: "High-Speed Private PDF Document Builder",
    type: "SaaS Web Application",
    year: "2024",
    desc: "A client-side image-to-PDF utility built with Next.js. Engineered with 100% privacy in mind — zero server uploads. Users can drag, drop, reorder, crop, and compile multi-image collections into perfectly formatted A4 PDFs instantly in the browser.",
    image: "/projects/stitch.jpg",
    images: [
      {
        src: "/projects/stitch.jpg",
        title: "PDF Builder Workspace",
        tag: "Client-Side Compiler",
        desc: "100% in-browser image-to-PDF compilation with zero telemetry",
      },
    ],
    tags: ["Next.js", "React", "jsPDF", "Canvas API", "Zero-Tracking"],
    link: "https://github.com/jatingow/Stitch",
    metrics: "100% Client-Side · Zero Telemetry · Instant Export",
  },
];

export const certifications = [
  {
    id: "01",
    name: "Foundations of AI and Machine Learning",
    org: "Microsoft",
    year: "2026",
    badge: "Official Certificate",
    desc: "Foundational machine learning models, neural networks, ethics, and cloud AI architecture."
  },
  {
    id: "02",
    name: "AI For Everyone",
    org: "DeepLearning.AI",
    year: "2026",
    badge: "Verified Completion",
    desc: "Strategic implementation of AI technologies, data pipelines, and machine learning life cycles."
  },
  {
    id: "03",
    name: "OCI Certified AI Associate",
    org: "Oracle",
    year: "2025",
    badge: "Cloud Certification",
    desc: "Generative AI, large language models, computer vision, and Oracle Cloud AI infrastructure."
  },
];

export const marqueeItems = [
  "REACT.JS", "NEXT.JS", "TYPESCRIPT", "JAVASCRIPT", "PYTHON",
  "C++", "POSTGRESQL", "MONGODB", "SYSTEM DESIGN", "REST APIS",
  "LINUX", "GIT & GITHUB", "CORE WEB VITALS", "TAILWIND / CSS",
];

export const contactLinks = [
  { icon: "✉", label: "Email", handle: "jatin@email.com", href: "mailto:jatin@email.com" },
  { icon: "⌨", label: "GitHub", handle: "github.com/jatingow", href: "https://github.com/jatingow" },
  { icon: "💼", label: "LinkedIn", handle: "linkedin.com/in/jatin", href: "https://linkedin.com/" },
  { icon: "𝕏", label: "Twitter / X", handle: "@jatingow", href: "https://twitter.com/" },
];
