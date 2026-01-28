'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useData } from '@/context/DataContext';
import { ToolCategory } from '@/types';
import styles from '../../form.module.css';

const categories: { id: ToolCategory; label: string }[] = [
  { id: 'video', label: 'Video' },
  { id: 'image', label: 'Hình Ảnh' },
  { id: 'text', label: 'Văn Bản' },
  { id: 'audio', label: 'Âm Thanh' },
  { id: 'efficiency', label: 'Năng Suất' },
];

export default function EditToolPage() {
  const params = useParams();
  const router = useRouter();
  const { tools, updateTool } = useData();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    url: '',
    category: 'text' as ToolCategory,
    isFeatured: false,
    tags: '',
  });

  useEffect(() => {
    const tool = tools.find(t => t.id === params.id);
    if (tool) {
      setFormData({
        name: tool.name,
        description: tool.description,
        url: tool.url,
        category: tool.category,
        isFeatured: tool.isFeatured || false,
        tags: (tool.tags || []).join(', '),
      });
    }
  }, [params.id, tools]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTool(params.id as string, {
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
          <h1 className={styles.title}>Sửa Công Cụ AI</h1>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.container}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Tên công cụ *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label className={styles.label}>URL *</label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Danh mục *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as ToolCategory })}
                  className={styles.select}
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Mô tả *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                />
                <span>Đánh dấu Featured (🔥 Hot)</span>
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
