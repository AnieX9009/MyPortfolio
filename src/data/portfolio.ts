// ============================================================
// Portfolio Data — Animesh Mondal (Real CV Data)
// ============================================================

export const personalInfo = {
  name: 'Animesh Mondal',
  firstName: 'Animesh',
  lastName: 'Mondal',
  title: 'Full Stack & App Developer',
  supportingStatement: 'Full stack developer specializing in React, Node.js, TypeScript & Machine Learning',
  summary: `Full stack developer with extensive experience at Lux Cozi, specializing in React, Node, and TypeScript. Demonstrated success in creating responsive applications and enhancing designs through effective collaboration. Expertise in API development and problem-solving, contributing to project success and improved user experiences. Committed to leveraging technology for impactful solutions.`,
  location: 'Kanchrapara, 743145, WB, India',
  email: 'animeshjis2020@gmail.com',
  phone: '+91 8910290421',
  photoUrl: '/badge_avatar.jpg', // Easily replace this path or URL with your photo!
  socials: [
    { label: 'Mail', href: 'mailto:animeshjis2020@gmail.com' },
    { label: 'Phone', href: 'tel:+918910290421' },
    { label: 'LI', href: 'https://linkedin.com/in/animeshmondal' },
    { label: 'GH', href: 'https://github.com/animeshmondal' },
  ],
};

export type ExperienceItem = {
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
  points?: string[]; // legacy alias
};

export const experiencesData: ExperienceItem[] = [
  {
    role: 'FULL STACK DEVELOPER',
    company: 'ASR Tech Solutions',
    location: 'Kolkata, India',
    period: '10/2024 to 10/2025',
    bullets: [
      'Developed and maintained web and mobile applications using React, Node.js, MongoDB, and Firebase.',
      'Collaborated with UI/UX designers to create responsive, user-friendly interfaces.',
      'Built RESTful APIs and integrated third-party services using Postman and Express.js.',
      'Led deployment processes and managed application states using Redux, TypeScript.',
      'Participated in code reviews, daily stand-ups, and sprint planning for agile development.',
    ],
  },
  {
    role: 'APP DEVELOPER',
    company: 'LUX INDUSTRIES LIMITED',
    location: 'Kolkata, India',
    period: '11/2025 to Current',
    bullets: [
      'Monitored app analytics to track user engagement and retention, leveraging insights to drive future app enhancements.',
      'Collaborated with cross-functional SAP teams to create Master Data Management Dashboard with analytics and tracking features.',
      'Designed, developed, and deployed machine learning models to improve predictive analytics for client projects.',
    ],
  },
];

export type SkillCategory = {
  category: string;
  skills: string[];
  color?: string; // legacy
};

export const skillCategoriesData: SkillCategory[] = [
  {
    category: 'Gen AI & Machine Learning',
    skills: [
      'Generative AI Development',
      'LLM & OpenAI API Integration',
      'LangChain & RAG Architectures',
      'AI Agent Workflows & Automation',
      'Machine Learning Model Deployment',
      'Prompt Engineering & Fine-Tuning',
    ],
  },
  {
    category: 'Core Engineering',
    skills: [
      'React development & integration',
      'TypeScript proficiency',
      'JavaScript expertise',
      'Go Language',
      'React Expo & React Native',
      'Vite & Redux Toolkit',
      'Tailwind CSS styling',
      'UI/UX collaboration',
    ],
  },
  {
    category: 'Backend & Architecture',
    skills: [
      'Node.js & Express development',
      'RESTful API design & testing',
      'SAP integration & Dashboards',
      'MongoDB & Firebase management',
      'System Architecture',
      'Git & Deployment Workflows',
    ],
  },
];

export type ProjectItem = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  tech: string[];
  type: 'work' | 'lab';
  mediaUrl: string;
  images?: string[];
  live?: string;
  source?: string;
  // Legacy optional fields for old components
  color?: string;
};

export const projectsData: ProjectItem[] = [
  {
    id: 'carbon-offset',
    title: 'CARBON - OFFSET',
    subtitle: 'FINANCIAL & ECOLOGICAL WEB APP',
    description:
      'With user-centered approach, the goals was to create an intuitive interface for effortless financial management while incorporating gamification.',
    category: 'Web Application / Gamification',
    tech: ['React Vite', 'TypeScript', 'Tailwind CSS', 'Shadcn', 'Node.js'],
    type: 'work',
    mediaUrl: 'https://res.cloudinary.com/deitdqyiw/image/upload/v1787829225/Untitled_design_ajdktx.png',
    images: [
      'https://res.cloudinary.com/deitdqyiw/image/upload/v1787829225/Untitled_design_ajdktx.png',
      'https://res.cloudinary.com/deitdqyiw/image/upload/v1787829781/Screenshot_2026-08-27_at_4.51.22_PM_qnaiwk.png',
      'https://res.cloudinary.com/deitdqyiw/image/upload/v1787829781/Screenshot_2026-08-27_at_4.52.12_PM_dyzids.png',
      'https://res.cloudinary.com/deitdqyiw/image/upload/v1787829780/Screenshot_2026-08-27_at_4.50.57_PM_zomvqc.png',
    ],
    live: 'https://carbon-frontend-bice.vercel.app',
    source: 'https://github.com/AnieX9009/Carbon-Frontend',
    color: '#84cc16',
  },
  {
    id: 'crumble',
    title: 'Crumble',
    subtitle: 'MOBILE APPLICATION — LIVE PROJECT',
    description:
      'Crumble is an all-in-one food delivery ecosystem designed to seamlessly connect customers, restaurants, and delivery partners.\n\nCustomer Order App: Browse local menus, discover daily discounts, customize dishes, and track deliveries in real time with an intuitive, user-friendly interface.\n\nRestaurant Side App: Streamline kitchen operations with live order management, real-time inventory and ingredient tracking, and dynamic menu updates.\n\nDelivery Partner App: Optimize fulfillment through AI-powered route navigation, instant order acceptance, real-time earnings tracking, and direct customer communication.',
    category: 'Mobile App / React Native',
    tech: ['React Native', 'TypeScript', 'Redux', 'MongoDB', 'FormHook', 'Node.js'],
    type: 'work',
    mediaUrl: 'https://res.cloudinary.com/deitdqyiw/image/upload/v1788760690/Gemini_Generated_Image_j74w2yj74w2yj74w_w59n3b.png',
    images: [
      'https://res.cloudinary.com/deitdqyiw/image/upload/v1788760690/Gemini_Generated_Image_j74w2yj74w2yj74w_w59n3b.png',
      'https://res.cloudinary.com/deitdqyiw/image/upload/v1788760909/Gemini_Generated_Image_71p81871p81871p8_dtptx6.png',
      'https://res.cloudinary.com/deitdqyiw/image/upload/v1788760690/Gemini_Generated_Image_pgzueipgzueipgzu_bks497.png',
      'https://res.cloudinary.com/deitdqyiw/image/upload/v1788760690/Gemini_Generated_Image_pgzueipgzueipgzu_bks497.png',
      'https://res.cloudinary.com/deitdqyiw/image/upload/v1788760693/Gemini_Generated_Image_kufmb7kufmb7kufm_icpnxc.png',
    ],
    live: 'https://www.figma.com/design/ST8TfsE8IYJqhdBK02lVto/Crumble-App?node-id=1-7273&t=LLBFZvkF5nFfcPf0-0',
    source: 'https://github.com/AnieX9009/Crumble_User.git',
    color: '#E65A2B',
  },
  {
    id: 'currency-converter',
    title: 'Currency Converter',
    subtitle: 'WEB APPLICATION',
    description:
      'Implemented GUI for users to convert currencies using DOM, API, and JavaScript methods. Includes currency selection, conversion logic, and data reset functionality.',
    category: 'Web Application / Frontend',
    tech: ['HTML', 'CSS', 'JavaScript', 'REST API'],
    type: 'work',
    mediaUrl: 'https://media.mathis-biabiany.fr/GGBpSMS-rU0nKze6_Alone_With_Me_01.webp',
    images: [
      'https://media.mathis-biabiany.fr/GGBpSMS-rU0nKze6_Alone_With_Me_01.webp',
    ],
    live: 'https://github.com/animeshmondal',
    source: 'https://github.com/animeshmondal/currency-converter',
    color: '#6366f1',
  },
  {
    id: 'file-sharing-app',
    title: 'File Sharing Application',
    subtitle: 'FULL-STACK WEB APP',
    description:
      'Built full-stack file sharing app with authentication via Clerk. Enabled secure email-based file transfers using Firebase as the backend.',
    category: 'Full-Stack / Firebase',
    tech: ['React.js', 'Tailwind CSS', 'Firebase', 'Clerk', 'Node.js'],
    type: 'work',
    mediaUrl: 'https://media.mathis-biabiany.fr/Txd5RqLE_BYq_5iA_West_Lafayette_01.webp',
    images: [
      'https://media.mathis-biabiany.fr/Txd5RqLE_BYq_5iA_West_Lafayette_01.webp',
    ],
    live: 'https://github.com/animeshmondal',
    source: 'https://github.com/animeshmondal/file-sharing-app',
    color: '#06b6d4',
  },
];

export type EducationItem = {
  institution: string;
  degree: string;
  period: string;
  gpa: string;
  score?: number; // legacy
};

export const educationData: EducationItem[] = [
  {
    institution: 'Kanchrapara Harnett High School, North 24 Pgs',
    degree: 'Class X',
    period: '03/2018',
    gpa: 'GPA: 78.85%',
  },
  {
    institution: 'Kanchrapara Harnett High School, North 24 Pgs',
    degree: 'Class XII, Science',
    period: '04/2020',
    gpa: 'GPA: 85.6%',
  },
  {
    institution: 'Guru Nanak Institute of Technology, Sodepur',
    degree: 'B.Tech, Computer Science Engineering',
    period: '06/2024',
    gpa: 'GPA: 8.5',
  },
];

export type LanguageItem = {
  name: string;
  level: string;
  proficiency: string;
  percentage: number;
};

export const languagesData: LanguageItem[] = [
  { name: 'Bengali', level: 'C2', proficiency: 'Proficient', percentage: 95 },
  { name: 'English', level: 'C2', proficiency: 'Proficient', percentage: 95 },
  { name: 'Hindi', level: 'B2', proficiency: 'Upper Intermediate', percentage: 75 },
];

export const aboutParagraphs = [
  `Hi, I'm **Animesh Mondal**! A Full Stack & App Developer based in Kanchrapara, West Bengal, India.`,
  `I currently serve as an **App Developer at Lux Industries Limited (Lux Cozi)** in Kolkata, where I build Master Data Management dashboards with **SAP integration**, track app analytics for user retention, and deploy **machine learning models** for predictive insights.`,
  `Previously, I worked as a **Full Stack Developer at ASR Tech Solutions**, engineering web and mobile applications with **React, Node.js, MongoDB, and Firebase**, building REST APIs in Express, and managing state using **Redux & TypeScript**.`,
  `Graduated with a B.Tech in Computer Science Engineering from **Guru Nanak Institute of Technology (GPA: 8.5)**, I bring a strong foundation in algorithm optimization, UI/UX collaboration, and software engineering principles.`,
  `Specializing in **React, React Expo, Go, Node.js, TypeScript, and MongoDB**, I focus on building responsive, high-performance applications that deliver exceptional user experiences.`,
];

// ── Backward-compat aliases for legacy components ──────────────────────────
// These keep old Education.tsx / Experience.tsx / Projects.tsx / Skills.tsx
// compiling without modification. New *Section components use the real names.
export const education = educationData;
export const languages = languagesData;
export const experiences = experiencesData;
export const projects = projectsData;
export const skillCategories = skillCategoriesData;
