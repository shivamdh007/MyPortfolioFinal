export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  technologies: string[];
  github?: string;
  demo?: string;
  category: string[];
}

export interface Skill {
  name: string;
  icon: string;
  level: number;
  category: 'Frontend' | 'Backend' | 'Tools';
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon?: string;
}

export interface SocialLink {
  name: string;
  icon: string;
  url: string;
}

export type ThemeMode = 'light' | 'dark';