'use client';

import { useState } from 'react';
import ToolCard from '@/components/ui/ToolCard';
import { useData } from '@/context/DataContext';
import styles from './page.module.css';

const toolCategories = [
  { id: 'all', label: 'Tất Cả', icon: '🌐' },
  { id: 'video', label: 'Video', icon: '🎬' },
  { id: 'image', label: 'Hình Ảnh', icon: '🎨' },
  { id: 'text', label: 'Văn Bản', icon: '✍️' },
  { id: 'audio', label: 'Âm Thanh', icon: '🎵' },
  { id: 'efficiency', label: 'Năng Suất', icon: '⚡' },
];

export default function ToolsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { tools } = useData();

  const filteredTools = tools
    .filter(t => activeCategory === 'all' || t.category === activeCategory)
    .filter(t => 
      searchQuery === '' || 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className={styles.page}>
      {/* Page Header */}
      <div className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>🛠️ Công Cụ AI</h1>
          <p className={styles.subtitle}>
            Khám phá bộ sưu tập các công cụ AI hàng đầu thế giới. 
            Video, hình ảnh, văn bản, âm thanh và nhiều hơn nữa.
          </p>
          
          {/* Search */}
          <div className={styles.searchWrapper}>
            <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Tìm kiếm công cụ AI..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className={styles.categorySection}>
        <div className={styles.container}>
          <div className={styles.categories}>
            {toolCategories.map((cat) => (
              <button
                key={cat.id}
                className={`${styles.categoryBtn} ${activeCategory === cat.id ? styles.active : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span className={styles.catIcon}>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.resultInfo}>
            <span className={styles.resultCount}>{filteredTools.length} công cụ</span>
          </div>

          <div className={styles.toolGrid}>
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className={styles.empty}>
              <span className={styles.emptyIcon}>🔍</span>
              <h3>Không tìm thấy công cụ</h3>
              <p>Thử từ khóa khác hoặc chọn danh mục khác</p>
            </div>
          )}
        </div>
      </section>

      {/* Submit Tool Banner */}
      <section className={styles.submitSection}>
        <div className={styles.container}>
          <div className={styles.submitBanner}>
            <div className={styles.submitContent}>
              <h2>🚀 Có Công Cụ AI Mới?</h2>
              <p>Gửi công cụ AI của bạn để được đưa vào danh sách và tiếp cận hàng nghìn người dùng.</p>
            </div>
            <button className={styles.submitBtn}>Gửi Công Cụ</button>
          </div>
        </div>
      </section>
    </div>
  );
}
