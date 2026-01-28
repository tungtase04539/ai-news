'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useData } from '@/context/DataContext';
import styles from './page.module.css';

type Tab = 'courses' | 'articles' | 'tools';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('courses');
  const { courses, articles, tools, deleteCourse, deleteArticle, deleteTool } = useData();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>⚙️ Admin Dashboard</h1>
          <p className={styles.subtitle}>Quản lý nội dung: Khóa học, Bài viết, Công cụ AI</p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.container}>
          {/* Stats */}
          <div className={styles.stats}>
            <div className={styles.statCard}>
              <span className={styles.statIcon}>🎓</span>
              <div>
                <span className={styles.statNumber}>{courses.length}</span>
                <span className={styles.statLabel}>Khóa học</span>
              </div>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statIcon}>📰</span>
              <div>
                <span className={styles.statNumber}>{articles.length}</span>
                <span className={styles.statLabel}>Bài viết</span>
              </div>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statIcon}>🛠️</span>
              <div>
                <span className={styles.statNumber}>{tools.length}</span>
                <span className={styles.statLabel}>Công cụ</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === 'courses' ? styles.active : ''}`}
              onClick={() => setActiveTab('courses')}
            >
              🎓 Khóa Học
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'articles' ? styles.active : ''}`}
              onClick={() => setActiveTab('articles')}
            >
              📰 Bài Viết
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'tools' ? styles.active : ''}`}
              onClick={() => setActiveTab('tools')}
            >
              🛠️ Công Cụ
            </button>
          </div>

          {/* Content */}
          <div className={styles.tableWrapper}>
            <div className={styles.tableHeader}>
              <h2>{activeTab === 'courses' ? 'Khóa Học' : activeTab === 'articles' ? 'Bài Viết' : 'Công Cụ'}</h2>
              <Link 
                href={`/admin/${activeTab}/new`} 
                className={styles.addButton}
              >
                + Thêm Mới
              </Link>
            </div>

            {activeTab === 'courses' && (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Tiêu đề</th>
                    <th>Giảng viên</th>
                    <th>Danh mục</th>
                    <th>VIP</th>
                    <th>Học viên</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course.id}>
                      <td className={styles.titleCell}>{course.title}</td>
                      <td>{course.instructor}</td>
                      <td><span className={styles.categoryTag}>{course.category}</span></td>
                      <td>{course.isVip ? <span className={styles.vipBadge}>VIP</span> : '-'}</td>
                      <td>{course.students || 0}</td>
                      <td className={styles.actions}>
                        <Link href={`/admin/courses/${course.id}`} className={styles.editBtn}>Sửa</Link>
                        <button 
                          onClick={() => {
                            if (confirm('Bạn có chắc muốn xóa?')) deleteCourse(course.id);
                          }}
                          className={styles.deleteBtn}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'articles' && (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Tiêu đề</th>
                    <th>Tác giả</th>
                    <th>Danh mục</th>
                    <th>VIP</th>
                    <th>Lượt xem</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map((article) => (
                    <tr key={article.id}>
                      <td className={styles.titleCell}>{article.title}</td>
                      <td>{article.author}</td>
                      <td><span className={styles.categoryTag}>{article.category}</span></td>
                      <td>{article.isVip ? <span className={styles.vipBadge}>VIP</span> : '-'}</td>
                      <td>{article.views?.toLocaleString() || 0}</td>
                      <td className={styles.actions}>
                        <Link href={`/admin/articles/${article.id}`} className={styles.editBtn}>Sửa</Link>
                        <button 
                          onClick={() => {
                            if (confirm('Bạn có chắc muốn xóa?')) deleteArticle(article.id);
                          }}
                          className={styles.deleteBtn}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'tools' && (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Tên</th>
                    <th>Danh mục</th>
                    <th>Featured</th>
                    <th>URL</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {tools.map((tool) => (
                    <tr key={tool.id}>
                      <td className={styles.titleCell}>{tool.name}</td>
                      <td><span className={styles.categoryTag}>{tool.category}</span></td>
                      <td>{tool.isFeatured ? <span className={styles.featuredBadge}>🔥</span> : '-'}</td>
                      <td>
                        <a href={tool.url} target="_blank" rel="noopener noreferrer" className={styles.urlLink}>
                          {new URL(tool.url).hostname}
                        </a>
                      </td>
                      <td className={styles.actions}>
                        <Link href={`/admin/tools/${tool.id}`} className={styles.editBtn}>Sửa</Link>
                        <button 
                          onClick={() => {
                            if (confirm('Bạn có chắc muốn xóa?')) deleteTool(tool.id);
                          }}
                          className={styles.deleteBtn}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
