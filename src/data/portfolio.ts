export type SectionId =
  | "home"
  | "about"
  | "experience"
  | "projects"
  | "impact"
  | "contact";

export type SectionLink = {
  id: SectionId;
  label: string;
  shortLabel: string;
  number: string;
  keywords: string;
};

export type SkillCategory = {
  title: string;
  label: string;
  icon: "frontend" | "backend" | "mobile" | "cloud" | "ai" | "architecture";
  tech: string[];
};

export type FeaturedProject = {
  number: string;
  category: string;
  title: string;
  description: string;
  tech: string[];
  logo?: {
    alt: string;
    src: string;
  };
  websiteUrl: string;
};

export type ExperienceGroup = {
  title: string;
  bullets: string[];
  logo?: ExperienceLogo;
  websiteUrl?: string;
};

export type ExperienceLogo = {
  alt: string;
  format?: "portrait" | "wide";
  src: string;
  surface?: "dark" | "light";
};

export type ExperienceEntry = {
  period: string;
  company: string;
  role: string;
  location: string;
  summary?: string;
  bullets?: string[];
  groups?: ExperienceGroup[];
  logo?: ExperienceLogo;
  clientLogos?: ExperienceLogo[];
  showToptalBadge?: boolean;
  technologies: string[];
  websiteUrl?: string;
};

export type Metric = {
  value: number;
  suffix: string;
  label: string;
};

export type ProfileDetail = {
  label: string;
  value: string;
  detail?: string;
};

export const profile = {
  name: "Ali Abdullah Azhar",
  role: "Full-stack Engineer",
  verifiedTitle: "Verified Expert in Engineering",
  location: "Lahore, Punjab, Pakistan",
  tagline:
    "I build production-grade SaaS, mobile, and AI-ready systems that stay fast under pressure.",
  bio:
    "Ali is a senior full-stack engineer with 8+ years of experience building scalable SaaS platforms, mobile apps, and AI-integrated products. He delivers enterprise solutions for clients, including AMC and Capgemini, and specializes in React, Next.js, React Native, Node.js, and TypeScript. Ali has led end-to-end development across the health, media, fintech, and security domains.",
  specialties:
    "React, React Native, Node.js, TypeScript, Next.js, PostgreSQL, AWS, AI integrations",
  experience: "8+ years",
  status: "Available for hire",
  memberSince: "Toptal member since September 8, 2022",
  preferredEnvironment: "MacOS, Visual Studio Code (VS Code)",
  amazingThing:
    "The most amazing thing I've shipped is a React Native app to 100,000+ users in its first quarter while leading full-stack architecture end-to-end.",
  linkedinUrl: "https://www.linkedin.com/in/ali-abdullah-azhar-5387671b1/",
  githubUrl: "https://github.com/aliabdullahazhar",
  email: "aliabdullahazhar@gmail.com",
  emailUrl: "mailto:aliabdullahazhar@gmail.com",
  whatsapp: "+923304029793",
  whatsappUrl: "https://wa.me/923304029793",
};

export const profileDetails: ProfileDetail[] = [
  {
    label: "Verified profile",
    value: profile.verifiedTitle,
    detail: profile.role,
  },
  {
    label: "Location",
    value: profile.location,
    detail: profile.memberSince,
  },
  {
    label: "Preferred environment",
    value: profile.preferredEnvironment,
    detail: "Daily setup for senior delivery.",
  },
  {
    label: "Education",
    value: "Bachelor's Degree in Computer Science",
    detail: "COMSATS University Lahore - Lahore, Pakistan | 2014 - 2018",
  },
  {
    label: "Certification",
    value: "React Nanodegree",
    detail: "Udacity | July 2021 - Present",
  },
  {
    label: "Most amazing",
    value: "100,000+ users in the first quarter",
    detail: profile.amazingThing,
  },
];

export const expertise = [
  "Web Development",
  "Full-stack",
  "Front End",
  "JavaScript",
  "React.js",
  "CSS",
  "Node.js",
  "Android",
  "iOS",
  "TypeScript",
  "Express.js",
  "Redux",
  "Bootstrap",
  "HTML5",
  "Security Engineering",
];

export const experienceDepth = [
  "JavaScript - 8 years",
  "React - 7 years",
  "PostgreSQL - 6 years",
  "Node.js - 6 years",
  "React Native - 5 years",
  "Supabase - 4 years",
  "Next.js - 4 years",
  "Large Language Models (LLMs) - 1 year",
];

export const sections: SectionLink[] = [
  { id: "home", label: "Home", shortLabel: "Home", number: "00", keywords: "intro hero ali hire toptal" },
  {
    id: "about",
    label: "About",
    shortLabel: "About",
    number: "01",
    keywords: "bio verified expert engineering education certification environment",
  },
  {
    id: "experience",
    label: "Work Experience",
    shortLabel: "Experience",
    number: "02",
    keywords: "timeline career companies roles work experience",
  },
  {
    id: "projects",
    label: "Projects",
    shortLabel: "Projects",
    number: "03",
    keywords: "projects portfolio hospital iq ai analytics moe mow lawn care mobile app",
  },
  {
    id: "impact",
    label: "Impact",
    shortLabel: "Impact",
    number: "04",
    keywords: "metrics scale performance clients downloads users",
  },
  {
    id: "contact",
    label: "Contact",
    shortLabel: "Hire",
    number: "05",
    keywords: "toptal linkedin gmail github location availability message hire",
  },
];

export const heroStats = [
  { value: 8, suffix: "+", label: "Years" },
  { value: 100, suffix: "K+", label: "Users" },
  { value: 11, suffix: "+", label: "Roles" },
];

export const aboutParagraphs = [
  profile.bio,
  "He works across React, Next.js, React Native, Node.js, TypeScript, PostgreSQL, Supabase, AWS, and AI integrations, with delivery history in health, media, fintech, geospatial, enterprise SaaS, and security engineering.",
  "Ali has delivered enterprise solutions for clients including AMC and Capgemini, led end-to-end product architecture, optimized high-throughput mobile systems, and shipped production apps across web, mobile, and serverless platforms.",
];

export const philosophyTags = [
  "Scalable SaaS platforms",
  "Mobile apps",
  "AI-integrated products",
  "Enterprise solutions",
  "Performance optimization",
  "Security engineering",
  "End-to-end architecture",
  "Health, media, fintech, and security",
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Libraries/APIs",
    label: "Product integration layer",
    icon: "frontend",
    tech: [
      "React",
      "Node.js",
      "Context API",
      "REST APIs",
      "React Redux",
      "AWS Amplify",
      "RxJS",
      "Google Maps API",
      "Socket.IO",
      "Stripe",
      "Google API",
      "WebRTC",
      "Google Maps",
      "Sockets",
    ],
  },
  {
    title: "Tools",
    label: "Delivery and platform tooling",
    icon: "cloud",
    tech: [
      "Apple HealthKit",
      "Amazon Cognito",
      "AWS AppSync",
      "Redux Toolkit",
      "Claude Code",
      "Claude",
      "Git",
      "Firebase Cloud Messaging (FCM)",
      "Karma",
      "Fastlane",
      "CometChat",
      "Webpack",
      "Babel",
      "Capacitor",
    ],
  },
  {
    title: "Languages",
    label: "Core implementation stack",
    icon: "backend",
    tech: ["JavaScript", "TypeScript", "SCSS", "HTML", "CSS", "HTML5", "GraphQL", "SQL", "Python"],
  },
  {
    title: "Frameworks",
    label: "Web, mobile, and UI systems",
    icon: "frontend",
    tech: [
      "Express.js",
      "React-Bootstrap",
      "Redux",
      "React Native",
      "Bootstrap",
      "Next.js",
      "Material UI",
      "Angular",
      "NestJS",
      "Kendo UI",
      "Jest",
      "Tailwind CSS",
    ],
  },
  {
    title: "Platforms",
    label: "Cloud and runtime environments",
    icon: "cloud",
    tech: [
      "Visual Studio Code (VS Code)",
      "Android",
      "iOS",
      "AWS Lambda",
      "Firebase",
      "Azure",
      "Amazon Web Services (AWS)",
      "MacOS",
      "Docker",
      "Vercel",
      "Mapbox",
      "Amazon EC2",
    ],
  },
  {
    title: "Storage",
    label: "Data, maps, and persistence",
    icon: "architecture",
    tech: [
      "MongoDB",
      "Amazon DynamoDB",
      "Amazon S3 (AWS S3)",
      "PostgreSQL",
      "Cloud Firestore",
      "Azure Queue Storage",
      "Azure Blobs",
      "MySQL",
      "PostGIS",
      "GeoServer",
      "NoSQL",
      "Redis",
    ],
  },
  {
    title: "Paradigms",
    label: "Engineering practices",
    icon: "architecture",
    tech: ["Security Software Development", "Agile", "UX Design", "Cross-platform", "Brownfield", "Unit Testing"],
  },
  {
    title: "AI and Performance",
    label: "Intelligent product systems",
    icon: "ai",
    tech: [
      "Prompt Engineering",
      "Large Language Models (LLMs)",
      "Mobile App Development",
      "AI Chatbots",
      "Artificial Intelligence (AI)",
      "Performance Optimization",
      "Caching",
      "Debugging",
      "Complex Booking",
      "Pinecone",
      "Vectors",
      "Supabase",
    ],
  },
  {
    title: "Other",
    label: "Product and domain breadth",
    icon: "mobile",
    tech: [
      "Full-stack",
      "Web Development",
      "Front-end",
      "Single-page Applications (SPAs)",
      "Charts",
      "Apple fit",
      "Software Architecture",
      "Software Development",
      "App UI",
      "Startups",
      "Optimization",
      "User Interface (UI)",
      "User Experience (UX)",
      "APIs",
      "Third-party Integration",
      "Healthcare Services",
      "Third-party APIs",
      "Dashboards",
      "Enterprise SaaS",
      "Chargebee",
      "Fintech",
      "Enterprise",
      "CI/CD Pipelines",
      "Axios",
      "ESLint",
      "Video Streaming",
      "Over-the-top Content (OTT)",
    ],
  },
  {
    title: "Industry Expertise",
    label: "Commercial domain",
    icon: "architecture",
    tech: ["Retail & Wholesale"],
  },
];

export const featuredProjects: FeaturedProject[] = [
  {
    number: "01",
    category: "AI Analytics",
    title: "Hospital IQ",
    description:
      "An AI-powered hospital analytics platform where users ask natural language questions and receive interactive maps, charts, and data cards in real time. Built with a full Claude Code workflow including custom hooks, slash commands, path-scoped rules, and subagents - demonstrating end-to-end AI-assisted engineering from architecture to deployment.",
    tech: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "Claude API",
      "Vitest",
      "Docker",
    ],
    websiteUrl: "https://hospital-iq.vercel.app/",
  },
  {
    number: "02",
    category: "Mobile Services",
    title: "Moe Mow's Lawn Care",
    description:
      "A cross-platform lawn care service app for Naperville, IL - connecting homeowners with lawn care crews in an Uber-style booking experience. Built real-time chat using Firebase Firestore, implemented AI-assisted service matching and smart push notifications to keep users updated on job status, optimized FlatList performance for large data sets, integrated social authentication, and shipped to both the App Store and Google Play.",
    tech: [
      "React Native",
      "Firebase",
      "Redux Toolkit",
      "iOS",
      "Android",
    ],
    logo: {
      alt: "Moe Mow's Lawn Care",
      src: "/project-logos/moe-mows.jpg",
    },
    websiteUrl: "https://apps.apple.com/us/app/moe-mows-lawn-care/id1471506728",
  },
];

export const experienceEntries: ExperienceEntry[] = [
  {
    period: "2025 - Present",
    company: "Orbit Social",
    role: "Lead Full-Stack Engineer",
    location: "Remote",
    logo: {
      alt: "Orbit Social",
      format: "portrait",
      src: "/company-logos/orbit-social-original.svg",
    },
    websiteUrl: "https://app.orbitsocialapp.com/",
    bullets: [
      "Slashed data and map load time from ~7s to under 1s - an 85% performance improvement - through Redis caching, API batching, and architectural refactoring.",
      "Improved API response latency by 60-70% through PostgreSQL query optimization, strategic indexing, and efficient pagination.",
      "Achieved real-time semantic mapping by integrating Supabase pgvector alongside Auth, Realtime, Edge Functions, and RLS policies.",
      "Delivered AI-powered intelligent search and personalized content recommendations through OpenAI integration.",
      "Collaborated directly with the CTO on system design and long-term scaling strategies for a high-throughput mobile platform.",
    ],
    technologies: [
      "React Native",
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "Redis",
      "Supabase",
      "pgvector",
      "OpenAI API",
      "LLM Integration",
      "Vector Search",
      "CI/CD",
    ],
  },
  {
    period: "2023 - 2025",
    company: "TheVirtulab",
    role: "Software Engineer",
    location: "Remote",
    logo: {
      alt: "TheVirtulab",
      src: "/company-logos/thevirtulab.png",
    },
    websiteUrl: "https://thevirtulab.com/",
    bullets: [
      "Achieved sub-second semantic retrieval across thousands of documents by building a full RAG pipeline with OpenAI embeddings and Pinecone vector search.",
      "Reduced document processing time significantly through an automated ingestion pipeline - PDF parsing, chunking, and embedding at scale.",
      "Shipped cross-platform apps using React, Angular, and React Native serving real users in production.",
      "Eliminated manual workflow bottlenecks through Firebase Cloud Functions, enabling fully automated and scalable document processing.",
    ],
    technologies: [
      "React",
      "React Native",
      "Angular",
      "Node.js",
      "TypeScript",
      "OpenAI API",
      "LLM Integration",
      "RAG Pipelines",
      "Pinecone",
      "Vector Search",
      "Firebase",
    ],
  },
  {
    period: "2021 - Present",
    company: "Toptal - Top 3% Verified Engineer",
    role: "Senior Full-Stack Engineer",
    location: "Remote",
    summary:
      "Delivered across streaming, health, creator economy, and AI-powered booking platforms for global clients - operating as the senior technical lead on each engagement.",
    showToptalBadge: true,
    groups: [
      {
        title: "Endeavor/Dice Technology - AMC OTT Platform",
        logo: {
          alt: "Endeavor Streaming",
          src: "/company-logos/endeavor-streaming.svg",
        },
        bullets: [
          "Improved checkout conversion for AMC's OTT platform by redesigning the flow to reduce button clicks and screen switches across web, mobile, and TV.",
          "Achieved consistent real-time badge updates for thousands of concurrent users across React Web, React Native Mobile, and React Native TV using NoSQL.",
          "Delivered noticeably smoother React Native TV experience through targeted performance work - remote navigation, rendering optimization, and asset preloading.",
        ],
      },
      {
        title: "BioCoach - AI-Powered Health Platform",
        logo: {
          alt: "BioCoach Health",
          format: "portrait",
          src: "/company-logos/biocoach.webp",
        },
        websiteUrl: "https://apps.apple.com/us/app/biocoach-health/id6475170693",
        bullets: [
          "Shipped a complete health and wellness platform end to end - AI chatbot, personalized recommendations, video streaming, real-time chat, and e-commerce - all in one product.",
          "Achieved HIPAA compliance by deploying on Vercel and Aptible using Docker, protecting sensitive health data at every layer.",
          "Integrated LLM-powered coaching features and prompt engineering to deliver personalized health guidance at scale.",
        ],
      },
      {
        title: "Beautypass - Global Creator Marketplace",
        logo: {
          alt: "Beautypass",
          format: "portrait",
          src: "/company-logos/beautypass.jpg",
        },
        websiteUrl: "https://apps.apple.com/us/app/beautypass/id1169483314",
        bullets: [
          "Maintained a React Native app serving 25K+ daily active users across iOS and Android with consistent performance.",
          "Reduced app lag through optimized state management, memoization, and rendering improvements that directly impacted user retention.",
        ],
      },
      {
        title: "GIG AI - AI-Ready Booking Platform",
        bullets: [
          "Engineered a real-time scheduling system that handled dynamic availability, buffer logic, and concurrent multi-user booking without conflicts.",
          "Built a production Supabase backend - PostgreSQL, Auth, Realtime - that scaled reliably under concurrent load.",
          "Designed the system architecture from day one to support future LLM-based recommendations and intelligent scheduling workflows powered by AI agents.",
        ],
      },
    ],
    technologies: [
      "React",
      "React Native",
      "Next.js",
      "Node.js",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "AWS",
      "OpenAI API",
      "LLM Integration",
      "AI Chatbots",
      "Prompt Engineering",
      "NoSQL",
      "Docker",
    ],
  },
  {
    period: "2020 - 2022",
    company: "Social27",
    role: "Full-Stack Engineer",
    location: "Remote",
    logo: {
      alt: "Social27",
      src: "/company-logos/social27.png",
      surface: "light",
    },
    websiteUrl: "https://www.social27.com/",
    clientLogos: [
      {
        alt: "Capgemini",
        src: "/company-logos/capgemini.svg",
      },
    ],
    summary:
      "Outsourced via Aquila360 to an enterprise video platform that scaled to thousands of concurrent users for Fortune 500 clients.",
    bullets: [
      "Helped Capgemini successfully host a virtual event for thousands of simultaneous attendees through a live video-based meeting platform.",
      "Cut API response times measurably by implementing connection timeouts and optimized request handling in Node.js.",
      "Built a generic chart component in Angular that was reused across the entire reporting module - praised directly by the product manager.",
      "Introduced a microservices architecture in Node.js that made the system significantly more scalable and easier to maintain.",
    ],
    technologies: [
      "Node.js",
      "Angular",
      "TypeScript",
      "PostgreSQL",
      "MongoDB",
      "Redux",
      "REST APIs",
      "WebSockets",
    ],
  },
  {
    period: "2018 - 2022",
    company: "Aquila360",
    role: "Software Engineer",
    location: "Remote",
    logo: {
      alt: "Aquila360",
      format: "portrait",
      src: "/company-logos/aquila360.png",
      surface: "light",
    },
    websiteUrl: "https://aquila360.com/",
    clientLogos: [
      {
        alt: "ALEC Holdings",
        src: "/company-logos/alec-holdings.png",
        surface: "light",
      },
    ],
    summary:
      "Shipped full-stack products across fintech, cybersecurity, and enterprise domains over 4 years, delivering measurable results across multiple clients.",
    bullets: [
      "Tracked and managed thousands of workers across construction sites for ALEC Engineering through a React + Google Maps powered labor management system.",
      "Delivered a blazing-fast trading platform for Haywood capable of running across 8 simultaneous tabs with zero state conflicts using React, TypeScript, and RxJS.",
      "Led a team of four to secure 9+ businesses in Australia through a serverless cybersecurity platform built on Next.js and AWS - deployed and production-ready.",
      "Achieved millisecond-level data retrieval by choosing DynamoDB over traditional SQL for the right use case - a decision that directly improved platform responsiveness.",
    ],
    technologies: [
      "React",
      "Next.js",
      "Node.js",
      "TypeScript",
      "AWS Lambda",
      "DynamoDB",
      "GraphQL",
      "PostgreSQL",
      "Docker",
    ],
  },
];

export const metrics: Metric[] = [
  { value: 8, suffix: "+", label: "Years building scalable SaaS, mobile, and AI-integrated products" },
  { value: 100000, suffix: "+", label: "Downloads for a React Native app in its first quarter" },
  { value: 10000, suffix: "+", label: "Daily active users sustained post-launch" },
  { value: 85, suffix: "%", label: "Map and data loading improvement at Orbit Social App Inc" },
  { value: 70, suffix: "%", label: "API response latency improvement through PostgreSQL optimization" },
  { value: 9, suffix: "+", label: "Small businesses secured through the Aquila360 cybersecurity platform" },
];
