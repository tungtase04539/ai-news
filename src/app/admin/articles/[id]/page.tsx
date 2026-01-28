'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useData } from '@/context/DataContext';
import { ArticleCategory } from '@/types';
import styles from '../../form.module.css';

const categories: { id: ArticleCategory; label: string }[] = [
  { id: 'news', label: 'Tin Tức' },
  { id: 'deep-dive', label: 'Chuyên Sâu' },
  { id: 'tutorial', label: 'Hướng Dẫn' },
  { id: 'monetization', label: 'Kiếm Tiền' },
  { id: 'prompt-library', label: 'Thư Viện Prompt' },
];

export default function EditArticlePage() {
  const params = useParams();
  const router = useRouter();
  const { articles, updateArticle } = useData();
  
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    author: '',
    category: 'news' as ArticleCategory,
    isVip: false,
    tags: '',
  });

  useEffect(() => {
    const article = articles.find(a => a.id === params.id);
    if (article) {
      setFormData({
        title: article.title,
        excerpt: article.excerpt,
        author: article.author,
        category: article.category,
        isVip: article.isVip,
        tags: (article.tags || []).join(', '),
      });
    }
  }, [params.id, articles]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateArticle(params.id as string, {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
    });
    router.push('/admin');
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.container}>
          <Link href="/admin" className={styles.backLink}>← Quay lại</Link>
          <h1 className={styles.title}>Sửa Bài Viết</h1>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.container}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Tiêu đề *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Tác giả *</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Danh mục *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as ArticleCategory })}
                  className={styles.select}
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Tóm tắt *</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className={styles.textarea}
                rows={3}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Tags (phân cách bằng dấu phẩy)</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={formData.isVip}
                  onChange={(e) => setFormData({ ...formData, isVip: e.target.checked })}
                />
                <span>Bài viết VIP</span>
              </label>
            </div>

            <div className={styles.formActions}>
              <Link href="/admin" className={styles.cancelBtn}>Hủy</Link>
              <button type="submit" className={styles.submitBtn}>Lưu Thay Đổi</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
