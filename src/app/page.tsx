'use client';

import Link from 'next/link';
import HeroBanner from '@/components/ui/HeroBanner';
import CourseCard from '@/components/ui/CourseCard';
import ArticleCard from '@/components/ui/ArticleCard';
import ToolCard from '@/components/ui/ToolCard';
import { useData } from '@/context/DataContext';
import styles from './page.module.css';

export default function Home() {
  const { courses, articles, tools } = useData();
  
  const featuredCourses = courses.slice(0, 4);
  const latestArticles = articles.slice(0, 4);
  const popularTools = tools.filter(t => t.isFeatured).slice(0, 4);

  return (
    <div className={styles.page}>
      {/* Hero */}
      <HeroBanner />

      {/* Featured Courses */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>🎓 Khóa Học Nổi Bật</h2>
            <Link href="/ai-course" className={styles.viewAll}>
              Xem tất cả →
            </Link>
          </div>
          <div className={styles.courseGrid}>
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className={`${styles.section} ${styles.altBg}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>📰 Tin Tức AI Mới Nhất</h2>
            <Link href="/society" className={styles.viewAll}>
              Xem tất cả →
            </Link>
          </div>
          <div className={styles.articleGrid}>
            {latestArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Tools */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>🛠️ Công Cụ AI Phổ Biến</h2>
            <Link href="/tools" className={styles.viewAll}>
              Xem tất cả →
            </Link>
          </div>
          <div className={styles.toolGrid}>
            {popularTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* VIP Banner */}
      <section className={styles.vipSection}>
        <div className={styles.container}>
          <div className={styles.vipBanner}>
            <div className={styles.vipContent}>
              <span className={styles.vipIcon}>👑</span>
              <div>
                <h2>Mở Khóa Toàn Bộ Nội Dung Premium</h2>
                <p>50+ khóa học • Bài viết chuyên sâu • Thư viện Prompt • Cộng đồng VIP</p>
              </div>
            </div>
            <Link href="/vip" className={styles.vipButton}>
              Đăng Ký VIP - 998¥/năm
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
