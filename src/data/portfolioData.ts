import { Project, Internship, TechStackItem, CertificationItem, ExperienceItem, SkillCategory, JourneyMilestone } from '../types';

export const PERSONAL_INFO = {
  name: "AMEENA SHERIN",
  firstName: "AMEENA",
  lastName: "SHERIN",
  rolePrefix: "A CREATIVE",
  roleTitle: "UI/UX DESIGNER",
  supportingRoles: [
    "B.Tech Computer Science Engineering Student",
    "Aspiring Software Developer"
  ],
  location: "Kozhikode, Kerala, India",
  shortBio:
    "I'm Ameena Sherin, a B.Tech Computer Science Engineering student with a strong interest in UI/UX design, software development, data analytics, cloud technologies and AI. I enjoy turning ideas into simple, useful and visually engaging digital experiences. I'm continuously learning, building projects and improving my design and technical skills.",
  links: {
    github: "https://github.com/ameena-sherin",
    linkedin: "https://www.linkedin.com/in/ameena-sherin-b3b284331",
    instagram: "https://www.instagram.com/_ameena.___sherin?stkn=bnd6NG9kcW4yMjVs",
    email: "mailto:ameenasherinameenasherin@gmail.com",
    emailRaw: "ameenasherinameenasherin@gmail.com",
    emailAlt: "ameenasherinameenasherin@gmail.com",
  },
  stats: [
    { label: "Focus", value: "Creative UI/UX Design" },
    { label: "Education", value: "B.Tech CSE" },
    { label: "Design Tool", value: "Figma & Systems" },
    { label: "Location", value: "Kozhikode, Kerala" },
  ]
};

export const INTERNSHIPS: Internship[] = [
  {
    id: "internship-01",
    number: "01",
    company: "FRESTON ANALYTICS",
    title: "Python Programming Internship",
    period: "1 June 2024 – 14 June 2024",
    location: "Govt. Cyberpark, Kozhikode",
    duration: "Two-Week Intensive",
    description:
      "Two-week internship program in Python Programming. Focused on algorithmic problem solving, procedural programming logic, data structures, and foundational data wrangling.",
    skills: ["Python", "Algorithms", "Data Handling", "Problem Solving", "Scripting"],
    certificateKey: "freston-python-cert",
    certificateDetails: {
      title: "Certificate of Internship Completion — Python Programming",
      issuer: "Freston Analytics, Govt. Cyberpark, Kozhikode",
      period: "1 June 2024 – 14 June 2024",
      description: "Successfully completed two weeks of comprehensive hands-on training in Python programming paradigms, algorithmic problem-solving, and applied software concepts.",
      skillsLearned: ["Core Python Syntax & Logic", "Data Structures & Control Flows", "File I/O & Error Handling", "Algorithmic Efficiency"]
    }
  },
  {
    id: "internship-02",
    number: "02",
    company: "METALOOP GLOBAL IT SERVICES",
    title: "Cyber Security & Ethical Hacking Internship",
    period: "11 June 2025 – 17 June 2025",
    location: "Remote / Hybrid Engagement",
    duration: "7-Day Program",
    description:
      "7-day internship program focused on Cyber Security and Ethical Hacking. Explored penetration testing concepts, vulnerability scanning, network defense, and user data privacy.",
    skills: ["Cyber Security", "Ethical Hacking", "Vulnerability Scanning", "Network Defense", "Data Privacy"],
    certificateKey: "metaloop-security-cert",
    certificateDetails: {
      title: "Certificate of Internship Completion — Cyber Security & Ethical Hacking",
      issuer: "Metaloop Global IT Services",
      period: "11 June 2025 – 17 June 2025",
      description: "Completed intensive practical modules on cyber threat landscapes, network security fundamentals, ethical vulnerability assessment, and defense architectures.",
      skillsLearned: ["Vulnerability Assessment", "Network Defense & Firewalls", "Ethical Security Standards", "User Authentication Safety"]
    }
  }
];

export const PROJECTS: Project[] = [
  {
    id: "project-01",
    number: "01",
    title: "COLLEGE PLACEMENT DATA ANALYTICS",
    subtitle: "Data Analytics Project — BuildX Data Analytics Bootcamp",
    description:
      "A comprehensive data analytics and visualization project created during the BuildX Data Analytics Bootcamp. Examines student academic metrics, department benchmarks, placement percentages, and recruitment trends through interactive visual storytelling.",
    technologies: ["Python", "Pandas", "Excel", "Power BI", "DAX"],
    githubUrl: "https://github.com/ameena-sherin/BuildX-Analytics-Ameena_Sherin",
    image: "/projects/project-placement.png",
    type: "analytics",
    highlights: [
      "Branch-wise placement rate comparisons & department benchmarks across 6 engineering branches",
      "Interactive DAX measures calculating placement percentages, trends, and compensation percentiles",
      "Dynamic filtering by graduation year, academic GPA brackets, and recruitment sectors",
      "Actionable visual storytelling and executive KPI summary cards"
    ],
    metrics: [
      { label: "Primary Tool", value: "Power BI / DAX" },
      { label: "Program", value: "BuildX Bootcamp" },
      { label: "Format", value: "Interactive Dashboard" }
    ]
  },
  {
    id: "project-02",
    number: "02",
    title: "WEB CALCULATOR",
    subtitle: "Interactive Web Calculator Application",
    description:
      "An interactive web calculator engineered with a tactile, dark iOS/macOS inspired user interface. Features responsive touch feedback, keyboard input handling, decimal precision calculations, and modern micro-interactions.",
    technologies: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/ameena-sherin/web-calculator",
    image: "/projects/project-calculator.jpg",
    type: "calculator",
    highlights: [
      "Immediate arithmetic evaluation with decimal precision handling and operator chaining",
      "Tactile button state transitions with subtle gradient highlights and shadow depth",
      "Full keyboard event listeners supporting numpad and standard keyboard arithmetic",
      "Responsive layout optimized for mobile touchscreens and desktop viewports"
    ],
    metrics: [
      { label: "Tech Stack", value: "HTML / CSS / JS" },
      { label: "UX Flow", value: "Tactile Micro-Interactions" },
      { label: "Status", value: "Live & Deployed" }
    ]
  },
  {
    id: "project-03",
    number: "03",
    title: "SIMPLE CHATBOT",
    subtitle: "Interactive Conversational Web Interface",
    description:
      "A simple interactive chatbot interface designed to demonstrate natural client-side conversational flows, quick response chips, simulated typing latency, and responsive chat bubble geometry.",
    technologies: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/ameena-sherin/chat-box-project",
    image: "/projects/project-chatbot.jpg",
    type: "chatbot",
    highlights: [
      "Conversational UI with natural message bubble hierarchy and sender avatars",
      "Simulated typing indicators delivering realistic conversational pacing",
      "Interactive quick-prompt chips for frictionless visitor interaction",
      "Smooth auto-scrolling to newest incoming and outgoing messages"
    ],
    metrics: [
      { label: "Design Pattern", value: "Conversational UX" },
      { label: "Response", value: "Simulated Natural Flow" },
      { label: "Platform", value: "Web / Mobile" }
    ]
  },
  {
    id: "project-04",
    number: "04",
    title: "KTU WEBSITE UI REDESIGN",
    subtitle: "University Portal Redesign & User Experience Concept",
    description:
      "A comprehensive UI/UX redesign concept for the APJ Abdul Kalam Technological University (KTU) website. Solved fragmented navigation by architecting an intuitive student portal with quick-access notifications, exam results, syllabus downloads, and responsive mobile layouts in Figma.",
    technologies: ["Figma", "UI/UX Design", "Wireframing", "Design System", "Prototyping"],
    figmaUrl: "https://www.figma.com/design/3AxbPV6HSIYEMY0Thxjj",
    image: "/projects/project-ktu.png",
    type: "design",
    highlights: [
      "Streamlined navigation hierarchy reducing clicks to key student notices by 60%",
      "Engineered comprehensive design tokens and atomic component library in Figma",
      "Dual responsive desktop & iPhone 13 mini mockups showcasing cross-device harmony",
      "High-fidelity interactive prototype validated with student user journeys"
    ],
    metrics: [
      { label: "Tool", value: "Figma" },
      { label: "Focus", value: "University Portal UX" },
      { label: "Prototype", value: "Desktop & Mobile" }
    ]
  }
];

export const TECH_STACK: TechStackItem[] = [
  {
    id: "figma",
    name: "FIGMA",
    category: "Design",
    description: "UI/UX design, interactive prototyping, auto-layout, and design systems",
    color: "#a855f7",
    badge: "Primary Design Tool"
  },
  {
    id: "uiux",
    name: "UI/UX DESIGN",
    category: "Design",
    description: "User research, wireframing, information architecture, and micro-interactions",
    color: "#ec4899",
    badge: "Core Discipline"
  },
  {
    id: "python",
    name: "PYTHON",
    category: "Languages",
    description: "Programming, algorithmic logic, data processing, and scripting",
    color: "#38bdf8",
    badge: "Core Language"
  },
  {
    id: "c",
    name: "C",
    category: "Languages",
    description: "Foundational programming, memory concepts, and algorithmic thinking",
    color: "#94a3b8",
    badge: "System Language"
  },
  {
    id: "sql",
    name: "SQL",
    category: "Data & BI",
    description: "Relational database querying, schema structuring, and aggregations",
    color: "#f59e0b",
    badge: "Data Querying"
  },
  {
    id: "html",
    name: "HTML5",
    category: "Frontend",
    description: "Semantic web structure, accessibility standards, and SEO layout",
    color: "#f97316",
    badge: "Web Foundation"
  },
  {
    id: "css",
    name: "CSS3",
    category: "Frontend",
    description: "Responsive layouts, Flexbox, CSS Grid, animations, and Tailwind styling",
    color: "#60a5fa",
    badge: "Interface Styling"
  },
  {
    id: "js",
    name: "JAVASCRIPT",
    category: "Frontend",
    description: "Modern ES6+, DOM manipulation, asynchronous logic, and interactive components",
    color: "#fbbf24",
    badge: "Interactive Logic"
  },
  {
    id: "powerbi",
    name: "POWER BI",
    category: "Data & BI",
    description: "Data visualization, interactive dashboards, and business intelligence",
    color: "#facc15",
    badge: "Visual Analytics"
  },
  {
    id: "dax",
    name: "DAX",
    category: "Data & BI",
    description: "Custom KPI measures, calculated columns, and time-intelligence expressions",
    color: "#818cf8",
    badge: "Formulas & KPIs"
  },
  {
    id: "excel",
    name: "EXCEL",
    category: "Data & BI",
    description: "Tabular data modeling, pivot tables, statistical lookup, and data wrangling",
    color: "#22c55e",
    badge: "Spreadsheet Analytics"
  },
  {
    id: "pandas",
    name: "PANDAS",
    category: "Data & BI",
    description: "DataFrame manipulation, dataset cleaning, and exploratory data analysis",
    color: "#e879f9",
    badge: "Python Analytics"
  },
  {
    id: "git",
    name: "GIT",
    category: "DevOps",
    description: "Distributed version control, branch management, and commit workflows",
    color: "#f43f5e",
    badge: "Version Control"
  },
  {
    id: "github",
    name: "GITHUB",
    category: "DevOps",
    description: "Repository hosting, open-source collaboration, and project documentation",
    color: "#c084fc",
    badge: "Collaboration Hub"
  }
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: "cert-01",
    title: "Python Programming Internship",
    issuer: "Freston Analytics",
    category: "Internship & Programming",
    description: "Two-week intensive internship in core Python programming, problem decomposition, data structures, and analytical problem-solving at Govt. Cyberpark, Kozhikode.",
    badgeColor: "from-purple-500/20 to-indigo-500/20 border-purple-500/30 text-purple-300",
    image: " ",
    skills: ["Python", "Data Structures", "Algorithms", "Govt. Cyberpark"]
  },
  {
    id: "cert-02",
    title: "KGF Figma Poster Design Workshop",
    issuer: "AWH Engineering College",
    category: "UI/UX & Design",
    description: "Hands-on creative design sprint utilizing Figma for visual hierarchy, typography scaling, aesthetic poster compositions, and digital layout fundamentals.",
    badgeColor: "from-pink-500/20 to-rose-500/20 border-pink-500/30 text-pink-300",
    skills: ["Figma", "Visual Hierarchy", "Poster Design", "Layout Systems"]
  },
  {
    id: "cert-03",
    title: "Cyber Security & Ethical Hacking Internship",
    issuer: "Metaloop Global IT Services",
    category: "Security & Systems",
    description: "Practical program focusing on ethical security principles, vulnerability assessment methodologies, network safety, and defense best practices.",
    badgeColor: "from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-300",
    skills: ["Ethical Hacking", "Vulnerability Assessment", "Network Defense", "Data Safety"]
  },
  {
    id: "cert-04",
    title: "Digital 101 – 30 Hours Certification",
    issuer: "FutureSkills Prime / NASSCOM",
    category: "Foundational & Ecosystem",
    description: "Comprehensive 30-hour curriculum on modern digital workforce competencies, emerging technology paradigms, and industry-standard digital systems.",
    badgeColor: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-300",
    skills: ["Emerging Tech", "Digital Ecosystems", "NASSCOM", "30-Hour Curriculum"]
  },
  {
    id: "cert-05",
    title: "Level Up With AI",
    issuer: "IEEE Student Branch AWH",
    category: "AI & Innovation",
    description: "Hands-on deep dive into generative artificial intelligence, modern machine learning workflows, and practical applications in digital engineering.",
    badgeColor: "from-violet-500/20 to-purple-500/20 border-violet-500/30 text-violet-300",
    skills: ["Artificial Intelligence", "Generative Tools", "IEEE SB AWH", "Prompt Engineering"]
  },
  {
    id: "cert-06",
    title: "AI Conclave",
    issuer: "Emergi5",
    category: "AI & Innovation",
    description: "Industry conclave examining next-generation artificial intelligence architectures, ethics in AI deployment, and future user experience frontiers.",
    badgeColor: "from-indigo-500/20 to-sky-500/20 border-indigo-500/30 text-indigo-300",
    skills: ["AI Trends", "Next-Gen Tech", "Industry Conclave", "AI Ethics"]
  },
  {
    id: "cert-07",
    title: "AI for Students: Build Your Own Generative AI Model",
    issuer: "NxtWave",
    category: "AI & Innovation",
    description: "Interactive technical workshop on generative model principles, prompt-based architectures, and deploying practical AI-assisted solutions.",
    badgeColor: "from-fuchsia-500/20 to-pink-500/20 border-fuchsia-500/30 text-fuchsia-300",
    skills: ["Generative Models", "NxtWave", "AI Prototyping", "Machine Intelligence"]
  },
  {
    id: "cert-08",
    title: "Introduction to Vue.js Workshop",
    issuer: "IEEE Student Branch AWH",
    category: "Frontend Development",
    description: "Hands-on workshop exploring component-driven web interfaces, reactive state management, and modern JavaScript framework fundamentals.",
    badgeColor: "from-emerald-500/20 to-green-500/20 border-emerald-500/30 text-emerald-300",
    skills: ["Vue.js", "Reactive UI", "Component Systems", "Frontend Logic"]
  },
  {
    id: "cert-09",
    title: "Beyond Google: Deep & Dark Web Cybersecurity Webinar",
    issuer: "IEEE SB MCET + Offenso",
    category: "Cybersecurity & Safety",
    description: "Specialized cybersecurity session analyzing digital footprints, privacy preservation, threat intelligence, and network anonymity principles.",
    badgeColor: "from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-300",
    skills: ["Cyber Threat Intelligence", "Digital Privacy", "Network Anonymity", "IEEE MCET"]
  },
  {
    id: "cert-10",
    title: "Crisis Code Online Poster Competition",
    issuer: "IEEE SIGHT",
    category: "Design & Social Impact",
    description: "Humanitarian technology design competition creating visual communications, crisis-response infographics, and emergency tech awareness.",
    badgeColor: "from-rose-500/20 to-red-500/20 border-rose-500/30 text-rose-300",
    skills: ["Visual Communication", "Infographic Design", "IEEE SIGHT", "Crisis Tech"]
  },
  {
    id: "cert-11",
    title: "Introduction to UI/UX",
    issuer: "CRESCITA 3.0",
    category: "UI/UX & Design",
    description: "Core curriculum on human-centered design principles, user journey mapping, wireframing, color psychology, and interface usability heuristics.",
    badgeColor: "from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-300",
    skills: ["UI/UX Fundamentals", "User Journey Mapping", "Usability Heuristics", "CRESCITA"]
  },
  {
    id: "cert-12",
    title: "Cyber Security Session",
    issuer: "Infoguard",
    category: "Cybersecurity & Safety",
    description: "Essential training on digital security hygiene, access controls, safe browsing practices, and data integrity protocols.",
    badgeColor: "from-blue-500/20 to-indigo-500/20 border-blue-500/30 text-blue-300",
    skills: ["Security Hygiene", "Access Control", "Data Integrity", "Infoguard"]
  },
  {
    id: "cert-13",
    title: "BuildX Data Analytics Bootcamp",
    issuer: "IEEE CS SBC CE Kidangoor",
    category: "Data & BI",
    description: "Comprehensive hands-on analytics bootcamp covering data modeling, Power BI dashboard design, DAX measures, and data storytelling.",
    badgeColor: "from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-300",
    skills: ["Power BI", "DAX", "Data Modeling", "Business Intelligence", "IEEE CS"]
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "exp-01",
    role: "Python Programming Intern",
    company: "Freston Analytics",
    period: "1 June 2024 – 14 June 2024",
    type: "Internship",
    description: "Hands-on programming at Govt. Cyberpark, Kozhikode, focusing on algorithmic problem-solving and software logic.",
    skills: ["Python", "Algorithms", "Data Handling", "Scripting"],
  },
  {
    id: "exp-02",
    role: "Cyber Security & Ethical Hacking Intern",
    company: "Metaloop Global IT Services",
    period: "11 June 2025 – 17 June 2025",
    type: "Training Program",
    description: "Hands-on cybersecurity program exploring network defense, vulnerability assessment, and digital privacy.",
    skills: ["Cyber Security", "Ethical Hacking", "Vulnerability Scanning", "Network Defense"],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Design",
    description: "User research, Figma systems, interactive prototyping, and visual hierarchy",
    skills: [
      { name: "Figma", level: "Advanced", description: "Design systems, auto-layout, interactive prototypes", highlight: true },
      { name: "UI/UX Design", level: "Core", description: "Information architecture, wireframes, user testing", highlight: true },
    ]
  },
  {
    category: "Languages",
    description: "Programming logic and database querying",
    skills: [
      { name: "Python", level: "Core", description: "Algorithmic thinking, data processing with Pandas", highlight: true },
      { name: "C", level: "Academic", description: "Foundational programming and memory concepts" },
      { name: "SQL", level: "Core", description: "Relational queries, aggregations, schema design", highlight: true },
    ]
  },
  {
    category: "Frontend",
    description: "Modern interactive web development",
    skills: [
      { name: "HTML5", level: "Core", description: "Semantic markup and accessibility standards" },
      { name: "CSS3", level: "Advanced", description: "Responsive layouts, Tailwind, animations", highlight: true },
      { name: "JavaScript", level: "Core", description: "Interactive components, DOM, asynchronous logic", highlight: true },
    ]
  },
  {
    category: "Data & BI",
    description: "Business intelligence and visual data storytelling",
    skills: [
      { name: "Power BI", level: "Specialist", description: "Interactive dashboard creation and data modeling", highlight: true },
      { name: "DAX", level: "Applied", description: "Calculated measures, KPIs, time intelligence", highlight: true },
      { name: "Excel", level: "Applied", description: "Pivot tables, lookups, tabular models" },
      { name: "Pandas", level: "Core", description: "Data wrangling and statistical analysis", highlight: true },
    ]
  },
  {
    category: "DevOps",
    description: "Version control and collaborative engineering",
    skills: [
      { name: "Git", level: "Applied", description: "Branching, commits, pull requests" },
      { name: "GitHub", level: "Applied", description: "Repository management, open-source collaboration", highlight: true },
    ]
  }
];

export const CAREER_JOURNEY: JourneyMilestone[] = [
  {
    year: "2024",
    title: "Python & Analytics Foundations",
    description: "Completed intensive Python internship at Freston Analytics, Govt. Cyberpark.",
    keyThemes: ["Python", "Freston Analytics", "Algorithmic Logic"]
  },
  {
    year: "2025",
    title: "Cybersecurity & Systems Learning",
    description: "Metaloop Cyber Security internship, IBM Cloud, and IEEE AI initiatives.",
    keyThemes: ["Metaloop Security", "Cloud Computing", "AI Workflows"]
  },
  {
    year: "2026",
    title: "Creative UI/UX & High-Impact Projects",
    description: "KTU Website UI redesign in Figma, BuildX Placement Analytics dashboard, interactive 3D portfolios.",
    keyThemes: ["KTU Redesign", "Power BI Analytics", "3D Interactive Portfolios"]
  },
  {
    year: "2028",
    title: "B.Tech CSE Graduation & Beyond",
    description: "Target culmination of engineering degree at AWH Engineering College.",
    keyThemes: ["Degree Completion", "Creative UI/UX Leadership"],
    isMilestoneYear: true
  }
];

