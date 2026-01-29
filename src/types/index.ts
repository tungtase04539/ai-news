// Course Types
export interface Course {
  id: string;
  title: string;
  instructor: string;
  instructorAvatar?: string;
  thumbnail: string;
  duration: string;
  lessonCount: number;
  category: CourseCategory;
  description: string;
  isVip: boolean;
  price?: number;
  students?: number;
  rating?: number;
}

export type CourseCategory =
  | "chatgpt"
  | "image-creation"
  | "image-tools"
  | "video-ai"
  | "prompt-engineering"
  | "ai-basics";

// Article Types
export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  thumbnail: string;
  author: string;
  authorAvatar?: string;
  date: string;
  category: ArticleCategory;
  views: number;
  likes: number;
  comments: number;
  isVip: boolean;
  tags?: string[];
}

export type ArticleCategory =
  | "news"
  | "deep-dive"
  | "tutorial"
  | "monetization"
  | "prompt-library";

// Tool Types
export interface Tool {
  id: string;
  name: string;
  description: string;
  logo: string;
  category: ToolCategory;
  url: string;
  isFeatured?: boolean;
  tags?: string[];
}

export type ToolCategory = "video" | "image" | "text" | "audio" | "efficiency";

// User Types
export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
  isVip: boolean;
  vipExpiry?: string;
}

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavItem[];
  isVip?: boolean;
}

// API Response Types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
