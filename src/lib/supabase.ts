import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create client only if env vars are set
let supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };

// Check if Supabase is configured
export const isSupabaseConfigured = () => {
  return !!supabaseUrl && !!supabaseAnonKey;
};

// Database types
export interface DBCourse {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  duration: string;
  lesson_count: number;
  category: string;
  description: string;
  is_vip: boolean;
  price: number;
  students: number;
  rating: number;
  created_at: string;
}

export interface DBArticle {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  thumbnail: string;
  author: string;
  date: string;
  category: string;
  views: number;
  likes: number;
  comments: number;
  is_vip: boolean;
  tags: string[];
  created_at: string;
}

export interface DBTool {
  id: string;
  name: string;
  description: string;
  logo: string;
  category: string;
  url: string;
  is_featured: boolean;
  tags: string[];
  created_at: string;
}

// Helper functions to convert between DB and App types
export function dbCourseToApp(db: DBCourse) {
  return {
    id: db.id,
    title: db.title,
    instructor: db.instructor,
    thumbnail: db.thumbnail,
    duration: db.duration,
    lessonCount: db.lesson_count,
    category: db.category,
    description: db.description,
    isVip: db.is_vip,
    price: db.price,
    students: db.students,
    rating: db.rating,
  };
}

export function dbArticleToApp(db: DBArticle) {
  return {
    id: db.id,
    title: db.title,
    excerpt: db.excerpt,
    content: db.content || '',
    thumbnail: db.thumbnail,
    author: db.author,
    date: db.date,
    category: db.category,
    views: db.views,
    likes: db.likes,
    comments: db.comments,
    isVip: db.is_vip,
    tags: db.tags,
  };
}

export function dbToolToApp(db: DBTool) {
  return {
    id: db.id,
    name: db.name,
    description: db.description,
    logo: db.logo,
    category: db.category,
    url: db.url,
    isFeatured: db.is_featured,
    tags: db.tags,
  };
}
