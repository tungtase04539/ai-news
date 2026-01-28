'use client';

import { useState } from 'react';
import CourseCard from '@/components/ui/CourseCard';
import { useData } from '@/context/DataContext';
import styles from './page.module.css';

const courseCategories = [
  { id: 'all', label: 'Tất Cả' },
  { id: 'chatgpt', label: 'ChatGPT' },
  { id: 'image-creation', label: 'Tạo Hình Ảnh' },
  { id: 'image-tools', label: 'Công Cụ Hình Ảnh' },
  { id: 'video-ai', label: 'Video AI' },
  { id: 'prompt-engineering', label: 'Prompt Engineering' },
  { id: 'ai-basics', label: 'AI Cơ Bản' },
];

export default function AICoursePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const { courses } = useData();

  const filteredCourses = activeCategory === 'all'
    ? courses
    : courses.filter(c => c.category === activeCategory);

  return (
    <div className={styles.page}>
      {/* Page Header */}
      <div className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>🎓 Khóa Học AI</h1>
          <p className={styles.subtitle}>
            Khám phá các khóa học AI chất lượng cao từ những chuyên gia hàng đầu.
            Từ cơ bản đến nâng cao, từ GPT đến Video AI.
          </p>
        </div>
      </div>

      {/* Categories Filter */}
      <div className={styles.filterSection}>
        <div className={styles.container}>
          <div className={styles.categories}>
            {courseCategories.map((cat) => (
              <button
                key={cat.id}
                className={`${styles.categoryBtn} ${activeCategory === cat.id ? styles.active : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.resultInfo}>
            <span className={styles.resultCount}>{filteredCourses.length} khóa học</span>
            <select className={styles.sortSelect}>
              <option value="popular">Phổ biến nhất</option>
              <option value="newest">Mới nhất</option>
              <option value="rating">Đánh giá cao</option>
            </select>
          </div>

          <div className={styles.courseGrid}>
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className={styles.empty}>
              <span className={styles.emptyIcon}>📚</span>
              <h3>Không tìm thấy khóa học</h3>
              <p>Thử chọn danh mục khác hoặc xem tất cả khóa học</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
