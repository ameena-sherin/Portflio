export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  figmaUrl?: string;
  liveUrl?: string;
  image: string;
  type: 'analytics' | 'calculator' | 'chatbot' | 'design';
  highlights: string[];
  metrics?: { label: string; value: string }[];
}

export interface Internship {
  id: string;
  number: string;
  company: string;
  title: string;
  period: string;
  location: string;
  duration: string;
  description: string;
  skills: string[];
  certificateKey: string;
  certificateDetails: {
    title: string;
    issuer: string;
    period: string;
    description: string;
    skillsLearned: string[];
  };
}

export interface TechStackItem {
  id: string;
  name: string;
  category: 'Design' | 'Frontend' | 'Languages' | 'Data & BI' | 'DevOps';
  description: string;
  color: string;
  badge: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  category: string;
  description: string;
  badgeColor: string;
  skills: string[];
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: {
    name: string;
    level: string;
    description: string;
    highlight?: boolean;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  type: string;
  description: string;
  skills: string[];
  isCurrent?: boolean;
}

export interface JourneyMilestone {
  year: string;
  title: string;
  description: string;
  keyThemes: string[];
  isMilestoneYear?: boolean;
}
