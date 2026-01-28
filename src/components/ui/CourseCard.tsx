import Image from 'next/image';
import Link from 'next/link';
import { Course } from '@/types';
import styles from './CourseCard.module.css';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/ai-course/${course.id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <div className={styles.imagePlaceholder}>
          <span className={styles.categoryIcon}>
            {getCategoryIcon(course.category)}
          </span>
        </div>
        {course.isVip && <span className={styles.vipBadge}>VIP</span>}
        <div className={styles.duration}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          {course.duration}
        </div>
      </div>
      
      <div className={styles.content}>
        <span className={styles.category}>{getCategoryLabel(course.category)}</span>
        <h3 className={styles.title}>{course.title}</h3>
        <p className={styles.description}>{course.description}</p>
        
        <div className={styles.meta}>
          <div className={styles.instructor}>
            <div className={styles.avatar}>
              {course.instructor.charAt(0)}
            </div>
            <span>{course.instructor}</span>
          </div>
          <div className={styles.stats}>
            <span className={styles.lessons}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
              </svg>
              {course.lessonCount} bài
            </span>
            {course.students && (
              <span className={styles.students}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                {formatNumber(course.students)}
              </span>
            )}
          </div>
        </div>

        <div className={styles.footer}>
          {course.rating && (
            <div className={styles.rating}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span>{course.rating}</span>
            </div>
          )}
          <div className={styles.price}>
            {course.isVip ? (
              <span className={styles.vipPrice}>Miễn phí VIP</span>
            ) : course.price ? (
              <span className={styles.paidPrice}>{formatPrice(course.price)}</span>
            ) : (
              <span className={styles.freePrice}>Miễn phí</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    'chatgpt': '💬',
    'image-creation': '🎨',
    'image-tools': '🖼️',
    'video-ai': '🎬',
    'prompt-engineering': '✨',
    'ai-basics': '🤖',
  };
  return icons[category] || '🤖';
}

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    'chatgpt': 'ChatGPT',
    'image-creation': 'Tạo Hình Ảnh',
    'image-tools': 'Công Cụ Hình Ảnh',
    'video-ai': 'Video AI',
    'prompt-engineering': 'Prompt Engineering',
    'ai-basics': 'AI Cơ Bản',
  };
  return labels[category] || category;
}

function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
}
