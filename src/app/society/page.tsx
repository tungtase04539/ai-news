'use client';

import { useState } from 'react';
import ArticleCard from '@/components/ui/ArticleCard';
import { useData } from '@/context/DataContext';
import styles from './page.module.css';

const tabs = [
  { id: 'all', label: 'Tất Cả', icon: '🔥' },
  { id: 'news', label: 'Tin Tức AI', icon: '📰' },
  { id: 'deep-dive', label: 'Chuyên Sâu', icon: '🔬', isVip: true },
  { id: 'tutorial', label: 'Hướng Dẫn', icon: '📚' },
  { id: 'monetization', label: 'Kiếm Tiền', icon: '💰', isVip: true },
  { id: 'prompt-library', label: 'Thư Viện Prompt', icon: '✨', isVip: true },
];

export default function SocietyPage() {
  const [activeTab, setActiveTab] = useState('all');
  const { articles } = useData();

  const filteredArticles = activeTab === 'all'
    ? articles
    : articles.filter(a => a.category === activeTab);

  return (
    <div className={styles.page}>
      {/* Page Header */}
      <div className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>📰 Cộng Đồng AI</h1>
          <p className={styles.subtitle}>
            Cập nhật tin tức AI mới nhất, bài viết chuyên sâu và thư viện prompt độc quyền.
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className={styles.tabSection}>
        <div className={styles.container}>
          <div className={styles.tabs}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className={styles.tabIcon}>{tab.icon}</span>
                {tab.label}
                {tab.isVip && <span className={styles.vipTag}>VIP</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.grid}>
            <div className={styles.mainContent}>
              <div className={styles.articleGrid}>
                {filteredArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>

              {filteredArticles.length === 0 && (
                <div className={styles.empty}>
                  <span className={styles.emptyIcon}>📄</span>
                  <h3>Không có bài viết</h3>
                  <p>Thử chọn danh mục khác</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className={styles.sidebar}>
              <div className={styles.sidebarCard}>
                <h3 className={styles.sidebarTitle}>🔥 Xu Hướng Hôm Nay</h3>
                <div className={styles.trendingList}>
                  {articles.slice(0, 5).map((article, idx) => (
                    <div key={article.id} className={styles.trendingItem}>
                      <span className={styles.trendingNumber}>{idx + 1}</span>
                      <span className={styles.trendingTitle}>{article.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.sidebarCard}>
                <h3 className={styles.sidebarTitle}>📌 Tags Phổ Biến</h3>
                <div className={styles.tagCloud}>
                  {['OpenAI', 'GPT-5', 'Claude', 'Gemini', 'Midjourney', 'Keling AI', 'Prompt', 'Video AI'].map((tag) => (
                    <span key={tag} className={styles.cloudTag}>{tag}</span>
                  ))}
                </div>
              </div>

              <div className={`${styles.sidebarCard} ${styles.vipCard}`}>
                <span className={styles.vipIcon}>👑</span>
                <h3>Nâng Cấp VIP</h3>
                <p>Mở khóa tất cả bài viết chuyên sâu và thư viện prompt</p>
                <button className={styles.vipButton}>Đăng Ký Ngay</button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
