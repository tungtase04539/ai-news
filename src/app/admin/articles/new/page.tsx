'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useData } from '@/context/DataContext';
import { ArticleCategory } from '@/types';
import styles from '../../form.module.css';

// Dynamic import to avoid SSR issues with TipTap
const RichTextEditor = dynamic(
  () => import('@/components/editor/RichTextEditor'),
  { 
    ssr: false,
    loading: () => <div className={styles.editorLoading}>Đang tải editor...</div>
  }
);

const categories: { id: ArticleCategory; label: string }[] = [
  { id: 'news', label: 'Tin Tức' },
  { id: 'deep-dive', label: 'Chuyên Sâu' },
  { id: 'tutorial', label: 'Hướng Dẫn' },
  { id: 'monetization', label: 'Kiếm Tiền' },
  { id: 'prompt-library', label: 'Thư Viện Prompt' },
];

export default function NewArticlePage() {
  const router = useRouter();
  const { addArticle } = useData();
  
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    thumbnail: '',
    author: '',
    category: 'news' as ArticleCategory,
    isVip: false,
    tags: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addArticle({
      ...formData,
      thumbnail: formData.thumbnail || '/images/articles/default.jpg',
      date: new Date().toISOString().split('T')[0],
      views: 0,
      likes: 0,
      comments: 0,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
    });
    router.push('/admin');
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.container}>
          <Link href="/admin" className={styles.backLink}>← Quay lại</Link>
          <h1 className={styles.title}>Thêm Bài Viết Mới</h1>
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
                placeholder="VD: OpenAI Ra Mắt GPT-5: Những Điều Cần Biết"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Ảnh đại diện (URL)</label>
              <input
                type="url"
                value={formData.thumbnail}
                onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                className={styles.input}
                placeholder="https://example.com/image.jpg (để trống nếu dùng ảnh mặc định)"
              />
              {formData.thumbnail && (
                <div className={styles.imagePreview}>
                  <img src={formData.thumbnail} alt="Preview" onError={(e) => e.currentTarget.style.display = 'none'} />
                </div>
              )}
            </div>

            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Tác giả *</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className={styles.input}
                  placeholder="VD: Xiaohu"
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
                placeholder="Mô tả ngắn về bài viết (hiển thị ở danh sách)..."
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Nội dung bài viết *</label>
              <RichTextEditor
                content={formData.content}
                onChange={(content) => setFormData({ ...formData, content })}
                placeholder="Viết nội dung bài viết đầy đủ tại đây..."
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Tags (phân cách bằng dấu phẩy)</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className={styles.input}
                placeholder="VD: OpenAI, GPT-5, LLM"
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
              <button type="submit" className={styles.submitBtn}>Thêm Bài Viết</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
