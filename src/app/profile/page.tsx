'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import styles from './page.module.css';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, loading, logout } = useAuth();
  const { articles, courses } = useData();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Đang tải...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  // Mock user stats
  const userStats = {
    articlesRead: 24,
    coursesEnrolled: 3,
    completedLessons: 45,
    totalPoints: 1250,
  };

  return (
    <div className={styles.page}>
      {/* Profile Header */}
      <div className={styles.header}>
        <div className={styles.container}>
          <div className={styles.profileCard}>
            <div className={styles.avatarSection}>
              {user.avatar ? (
                <img src={user.avatar} alt={user.name || 'Avatar'} className={styles.avatar} />
              ) : (
                <div className={styles.avatarPlaceholder}>
                  {(user.name || user.email).charAt(0).toUpperCase()}
                </div>
              )}
              {user.isVip && <span className={styles.vipBadge}>👑 VIP</span>}
            </div>
            
            <div className={styles.userInfo}>
              <h1 className={styles.userName}>{user.name || 'Người dùng'}</h1>
              <p className={styles.userEmail}>{user.email}</p>
              {!user.isVip && (
                <Link href="/vip" className={styles.upgradeBtn}>
                  ⭐ Nâng cấp VIP
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className={styles.content}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {/* Stats Section */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>📊 Thống Kê</h2>
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <span className={styles.statIcon}>📖</span>
                  <div className={styles.statInfo}>
                    <span className={styles.statValue}>{userStats.articlesRead}</span>
                    <span className={styles.statLabel}>Bài viết đã đọc</span>
                  </div>
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statIcon}>🎓</span>
                  <div className={styles.statInfo}>
                    <span className={styles.statValue}>{userStats.coursesEnrolled}</span>
                    <span className={styles.statLabel}>Khóa học đang học</span>
                  </div>
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statIcon}>✅</span>
                  <div className={styles.statInfo}>
                    <span className={styles.statValue}>{userStats.completedLessons}</span>
                    <span className={styles.statLabel}>Bài học hoàn thành</span>
                  </div>
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statIcon}>⭐</span>
                  <div className={styles.statInfo}>
                    <span className={styles.statValue}>{userStats.totalPoints}</span>
                    <span className={styles.statLabel}>Điểm tích lũy</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Actions */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>⚡ Truy Cập Nhanh</h2>
              <div className={styles.quickActions}>
                <Link href="/ai-course" className={styles.actionCard}>
                  <span className={styles.actionIcon}>📚</span>
                  <span className={styles.actionText}>Khóa học AI</span>
                </Link>
                <Link href="/society" className={styles.actionCard}>
                  <span className={styles.actionIcon}>📰</span>
                  <span className={styles.actionText}>Cộng đồng</span>
                </Link>
                <Link href="/tools" className={styles.actionCard}>
                  <span className={styles.actionIcon}>🛠️</span>
                  <span className={styles.actionText}>Công cụ AI</span>
                </Link>
                <Link href="/profile/settings" className={styles.actionCard}>
                  <span className={styles.actionIcon}>⚙️</span>
                  <span className={styles.actionText}>Cài đặt</span>
                </Link>
              </div>
            </section>

            {/* Recent Courses */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>📚 Khóa Học Gần Đây</h2>
              {courses.slice(0, 3).length > 0 ? (
                <div className={styles.courseList}>
                  {courses.slice(0, 3).map((course) => (
                    <Link key={course.id} href={`/ai-course/${course.id}`} className={styles.courseItem}>
                      <div className={styles.courseThumb}>📘</div>
                      <div className={styles.courseInfo}>
                        <h4>{course.title}</h4>
                        <div className={styles.courseProgress}>
                          <div className={styles.progressBar}>
                            <div className={styles.progressFill} style={{ width: '45%' }}></div>
                          </div>
                          <span>45%</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className={styles.emptyState}>Bạn chưa tham gia khóa học nào</p>
              )}
              <Link href="/ai-course" className={styles.viewAllLink}>
                Xem tất cả khóa học →
              </Link>
            </section>

            {/* Saved Articles */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>🔖 Bài Viết Đã Lưu</h2>
              {articles.slice(0, 3).length > 0 ? (
                <div className={styles.articleList}>
                  {articles.slice(0, 3).map((article) => (
                    <Link key={article.id} href={`/society/${article.id}`} className={styles.articleItem}>
                      <div className={styles.articleThumb}>📄</div>
                      <div className={styles.articleInfo}>
                        <h4>{article.title}</h4>
                        <span className={styles.articleDate}>{article.date}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className={styles.emptyState}>Bạn chưa lưu bài viết nào</p>
              )}
              <Link href="/society" className={styles.viewAllLink}>
                Khám phá thêm bài viết →
              </Link>
            </section>

            {/* Account Settings */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>⚙️ Tài Khoản</h2>
              <div className={styles.settingsList}>
                <Link href="/profile/settings" className={styles.settingItem}>
                  <span className={styles.settingIcon}>👤</span>
                  <span>Chỉnh sửa hồ sơ</span>
                  <span className={styles.settingArrow}>→</span>
                </Link>
                <Link href="/profile/settings" className={styles.settingItem}>
                  <span className={styles.settingIcon}>🔔</span>
                  <span>Thông báo</span>
                  <span className={styles.settingArrow}>→</span>
                </Link>
                <Link href="/profile/settings" className={styles.settingItem}>
                  <span className={styles.settingIcon}>🔒</span>
                  <span>Bảo mật</span>
                  <span className={styles.settingArrow}>→</span>
                </Link>
                <button onClick={handleLogout} className={styles.logoutBtn}>
                  <span className={styles.settingIcon}>🚪</span>
                  <span>Đăng xuất</span>
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
