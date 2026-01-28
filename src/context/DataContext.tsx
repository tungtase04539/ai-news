'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Course, Article, Tool } from '@/types';

// Fallback demo data (used when Supabase is not configured)
const fallbackCourses: Course[] = [
  {
    id: '1',
    title: 'Keling AI: Từ Cơ Bản Đến Chuyên Gia',
    instructor: 'Xiaohu',
    thumbnail: '/images/courses/keling.jpg',
    duration: '6.5 giờ',
    lessonCount: 29,
    category: 'video-ai',
    description: 'Khóa học toàn diện về Keling AI - công cụ tạo video AI hàng đầu Trung Quốc.',
    isVip: true,
    students: 2840,
    rating: 4.9,
  },
  {
    id: '2',
    title: 'ChatGPT Mastery: Prompt Engineering Pro',
    instructor: 'AI Master',
    thumbnail: '/images/courses/chatgpt.jpg',
    duration: '8 giờ',
    lessonCount: 35,
    category: 'prompt-engineering',
    description: 'Học cách viết prompt chuyên nghiệp để khai thác tối đa sức mạnh của ChatGPT.',
    isVip: true,
    students: 5200,
    rating: 4.8,
  },
  {
    id: '3',
    title: 'Midjourney: Tạo Hình Ảnh AI Đỉnh Cao',
    instructor: 'Creative Studio',
    thumbnail: '/images/courses/midjourney.jpg',
    duration: '5 giờ',
    lessonCount: 22,
    category: 'image-creation',
    description: 'Làm chủ Midjourney từ cơ bản đến nâng cao với các kỹ thuật prompt chuyên sâu.',
    isVip: false,
    price: 299000,
    students: 3100,
    rating: 4.7,
  },
];

const fallbackArticles: Article[] = [
  {
    id: '1',
    title: 'OpenAI Ra Mắt GPT-5: Những Điều Cần Biết',
    excerpt: 'OpenAI vừa công bố GPT-5 với khả năng suy luận nâng cao và xử lý đa phương thức mạnh mẽ.',
    thumbnail: '/images/articles/gpt5.jpg',
    author: 'Xiaohu',
    date: '2026-01-27',
    category: 'news',
    views: 15680,
    likes: 892,
    comments: 156,
    isVip: false,
    tags: ['OpenAI', 'GPT-5', 'LLM'],
  },
  {
    id: '2',
    title: 'Cách Kiếm Tiền Với AI Video Generation',
    excerpt: 'Hướng dẫn chi tiết cách sử dụng AI để tạo video và kiếm tiền online.',
    thumbnail: '/images/articles/ai-money.jpg',
    author: 'Money Maker',
    date: '2026-01-26',
    category: 'monetization',
    views: 8900,
    likes: 567,
    comments: 89,
    isVip: true,
    tags: ['Kiếm tiền', 'Video AI', 'Business'],
  },
];

const fallbackTools: Tool[] = [
  {
    id: '1',
    name: 'Keling AI',
    description: 'Công cụ tạo video AI hàng đầu từ Kuaishou với khả năng điều khiển camera nâng cao.',
    logo: '/images/tools/keling.png',
    category: 'video',
    url: 'https://keling.ai',
    isFeatured: true,
    tags: ['Video', 'Lip-sync', 'Camera Control'],
  },
  {
    id: '2',
    name: 'ChatGPT',
    description: 'AI chatbot mạnh mẽ nhất từ OpenAI với khả năng đối thoại và xử lý đa tác vụ.',
    logo: '/images/tools/chatgpt.png',
    category: 'text',
    url: 'https://chat.openai.com',
    isFeatured: true,
    tags: ['Chatbot', 'Writing', 'Coding'],
  },
  {
    id: '3',
    name: 'Midjourney',
    description: 'Công cụ tạo hình ảnh AI với chất lượng nghệ thuật cao.',
    logo: '/images/tools/midjourney.png',
    category: 'image',
    url: 'https://midjourney.com',
    isFeatured: true,
    tags: ['Image', 'Art', 'Design'],
  },
];

interface DataContextType {
  courses: Course[];
  articles: Article[];
  tools: Tool[];
  loading: boolean;
  error: string | null;
  addCourse: (course: Omit<Course, 'id'>) => Promise<void>;
  updateCourse: (id: string, updates: Partial<Course>) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;
  addArticle: (article: Omit<Article, 'id'>) => Promise<void>;
  updateArticle: (id: string, updates: Partial<Article>) => Promise<void>;
  deleteArticle: (id: string) => Promise<void>;
  addTool: (tool: Omit<Tool, 'id'>) => Promise<void>;
  updateTool: (id: string, updates: Partial<Tool>) => Promise<void>;
  deleteTool: (id: string) => Promise<void>;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [courses, setCourses] = useState<Course[]>(fallbackCourses);
  const [articles, setArticles] = useState<Article[]>(fallbackArticles);
  const [tools, setTools] = useState<Tool[]>(fallbackTools);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [useSupabase, setUseSupabase] = useState(false);

  // Check if Supabase is configured
  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    setUseSupabase(!!supabaseUrl && !!supabaseKey);
  }, []);

  // Fetch data from API
  const refreshData = useCallback(async () => {
    if (!useSupabase) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [coursesRes, articlesRes, toolsRes] = await Promise.all([
        fetch('/api/courses'),
        fetch('/api/articles'),
        fetch('/api/tools'),
      ]);

      if (coursesRes.ok) {
        const data = await coursesRes.json();
        if (Array.isArray(data) && data.length > 0) {
          setCourses(data);
        }
      }

      if (articlesRes.ok) {
        const data = await articlesRes.json();
        if (Array.isArray(data) && data.length > 0) {
          setArticles(data);
        }
      }

      if (toolsRes.ok) {
        const data = await toolsRes.json();
        if (Array.isArray(data) && data.length > 0) {
          setTools(data);
        }
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch data from server');
    } finally {
      setLoading(false);
    }
  }, [useSupabase]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Course CRUD
  const addCourse = async (course: Omit<Course, 'id'>) => {
    if (useSupabase) {
      const res = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(course),
      });
      if (res.ok) {
        const newCourse = await res.json();
        setCourses(prev => [newCourse, ...prev]);
      }
    } else {
      const newCourse = { ...course, id: Date.now().toString() } as Course;
      setCourses(prev => [newCourse, ...prev]);
    }
  };

  const updateCourse = async (id: string, updates: Partial<Course>) => {
    if (useSupabase) {
      const res = await fetch(`/api/courses/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        const updated = await res.json();
        setCourses(prev => prev.map(c => c.id === id ? updated : c));
      }
    } else {
      setCourses(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
    }
  };

  const deleteCourse = async (id: string) => {
    if (useSupabase) {
      const res = await fetch(`/api/courses/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCourses(prev => prev.filter(c => c.id !== id));
      }
    } else {
      setCourses(prev => prev.filter(c => c.id !== id));
    }
  };

  // Article CRUD
  const addArticle = async (article: Omit<Article, 'id'>) => {
    if (useSupabase) {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(article),
      });
      if (res.ok) {
        const newArticle = await res.json();
        setArticles(prev => [newArticle, ...prev]);
      }
    } else {
      const newArticle = { ...article, id: Date.now().toString() } as Article;
      setArticles(prev => [newArticle, ...prev]);
    }
  };

  const updateArticle = async (id: string, updates: Partial<Article>) => {
    if (useSupabase) {
      const res = await fetch(`/api/articles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        const updated = await res.json();
        setArticles(prev => prev.map(a => a.id === id ? updated : a));
      }
    } else {
      setArticles(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
    }
  };

  const deleteArticle = async (id: string) => {
    if (useSupabase) {
      const res = await fetch(`/api/articles/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setArticles(prev => prev.filter(a => a.id !== id));
      }
    } else {
      setArticles(prev => prev.filter(a => a.id !== id));
    }
  };

  // Tool CRUD
  const addTool = async (tool: Omit<Tool, 'id'>) => {
    if (useSupabase) {
      const res = await fetch('/api/tools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tool),
      });
      if (res.ok) {
        const newTool = await res.json();
        setTools(prev => [newTool, ...prev]);
      }
    } else {
      const newTool = { ...tool, id: Date.now().toString() } as Tool;
      setTools(prev => [newTool, ...prev]);
    }
  };

  const updateTool = async (id: string, updates: Partial<Tool>) => {
    if (useSupabase) {
      const res = await fetch(`/api/tools/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        const updated = await res.json();
        setTools(prev => prev.map(t => t.id === id ? updated : t));
      }
    } else {
      setTools(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    }
  };

  const deleteTool = async (id: string) => {
    if (useSupabase) {
      const res = await fetch(`/api/tools/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setTools(prev => prev.filter(t => t.id !== id));
      }
    } else {
      setTools(prev => prev.filter(t => t.id !== id));
    }
  };

  return (
    <DataContext.Provider value={{
      courses,
      articles,
      tools,
      loading,
      error,
      addCourse,
      updateCourse,
      deleteCourse,
      addArticle,
      updateArticle,
      deleteArticle,
      addTool,
      updateTool,
      deleteTool,
      refreshData,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
