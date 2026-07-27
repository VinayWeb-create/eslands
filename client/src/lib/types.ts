import { ElementType } from 'react';

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  desc: string;
  icon: ElementType;
  gradient?: string;
  badge?: string;
  features?: string[];
  techStack?: string[];
  outcomes?: string[];
  metrics?: Record<string, string | number>;
  image?: string;
  angle?: number;
}

export interface ProductItem {
  id: string;
  title: string;
  category: string;
  desc: string;
  image: string;
  metrics: {
    stat: string;
    label: string;
  };
  features: string[];
  demoUrl?: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company: string;
  metrics: string;
  image: string;
}

export interface StatItem {
  value: number | string;
  suffix?: string;
  label: string;
  icon?: ElementType;
  accent?: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: ElementType;
  color: string;
}

export interface ValueItem {
  icon: ElementType;
  title: string;
  description: string;
  gradient: string;
}

export interface ProcessStep {
  icon: ElementType;
  title: string;
  description: string;
  duration: string;
  color: string;
}

export interface LeaderItem {
  name: string;
  role: string;
  icon: ElementType;
  bio: string;
}

export interface CertificationItem {
  name: string;
  icon: ElementType;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface JobItem {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  desc: string;
  responsibilities: string[];
  requirements: string[];
}
