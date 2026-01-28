'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useData } from '@/context/DataContext';
import { CourseCategory } from '@/types';
import styles from '../../form.module.css';

const categories: { id: CourseCategory; label: string }[] = [
  { id: 'chatgpt', label: 'ChatGPT' },
  { id: 'image-creation', label: 'Tạo Hình Ảnh' },
  { id: 'image-tools', label: 'Công Cụ Hình Ảnh' },
  { id: 'video-ai', label: 'Video AI' },
  { id: 'prompt-engineering', label: 'Prompt Engineering' },
  { id: 'ai-basics', label: 'AI Cơ Bản' },
];

export default function EditCoursePage() {
  const params = useParams();
  const router = useRouter();
  const { courses, updateCourse } = useData();
  
  const [formData, setFormData] = useState({
    title: '',
    instructor: '',
    duration: '',
    lessonCount: 10,
    category: 'ai-basics' as CourseCategory,
    description: '',
    isVip: false,
    price: 0,
    students: 0,
    rating: 4.5,
  });

  useEffect(() => {
    const course = courses.find(c => c.id === params.id);
    if (course) {
      setFormData({
        title: course.title,
        instructor: course.instructor,
        duration: course.duration,
        lessonCount: course.lessonCount,
        category: course.category,
        description: course.description,
        isVip: course.isVip,
        price: course.price || 0,
        students: course.students || 0,
        rating: course.rating || 4.5,
      });
    }
  }, [params.id, courses]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCourse(params.id as string, formData);
    router.push('/admin');
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.container}>
          <Link href="/admin" className={styles.backLink}>← Quay lại</Link>
          <h1 className={styles.title}>Sửa Khóa Học</h1>
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
                <label className={styles.label}>Giảng viên *</label>
                <input
                  type="text"
                  value={formData.instructor}
                  onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Danh mục *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as CourseCategory })}
                  className={styles.select}
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Thời lượng</label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Số bài học</label>
                <input
                  type="number"
                  value={formData.lessonCount}
                  onChange={(e) => setFormData({ ...formData, lessonCount: parseInt(e.target.value) })}
                  className={styles.input}
                  min="1"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Mô tả *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className={styles.textarea}
                rows={4}
                required
              />
            </div>

            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={formData.isVip}
                    onChange={(e) => setFormData({ ...formData, isVip: e.target.checked })}
                  />
                  <span>Khóa học VIP</span>
                </label>
              </div>

              {!formData.isVip && (
                <div className={styles.formGroup}>
                  <label className={styles.label}>Giá (VND)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                    className={styles.input}
                    min="0"
                    step="1000"
                  />
                </div>
              )}
            </div>

            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Số học viên</label>
                <input
                  type="number"
                  value={formData.students}
                  onChange={(e) => setFormData({ ...formData, students: parseInt(e.target.value) })}
                  className={styles.input}
                  min="0"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Đánh giá (1-5)</label>
                <input
                  type="number"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                  className={styles.input}
                  min="1"
                  max="5"
                  step="0.1"
                />
              </div>
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
