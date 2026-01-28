'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useData } from '@/context/DataContext';
import styles from './page.module.css';

export default function CourseDetailPage() {
  const params = useParams();
  const { courses } = useData();
  
  const course = courses.find(c => c.id === params.id);

  if (!course) {
    return (
      <div className={styles.notFound}>
        <h1>Không tìm thấy khóa học</h1>
        <Link href="/ai-course">← Quay lại danh sách</Link>
      </div>
    );
  }

  const getCategoryLabel = (cat: string) => {
    const labels: Record<string, string> = {
      'chatgpt': 'ChatGPT',
      'image-creation': 'Tạo Hình Ảnh',
      'image-tools': 'Công Cụ Hình Ảnh',
      'video-ai': 'Video AI',
      'prompt-engineering': 'Prompt Engineering',
      'ai-basics': 'AI Cơ Bản',
    };
    return labels[cat] || cat;
  };

  return (
    <div className={styles.page}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <div className={styles.container}>
          <Link href="/">Trang chủ</Link>
          <span>/</span>
          <Link href="/ai-course">Khóa học AI</Link>
          <span>/</span>
          <span>{course.title}</span>
        </div>
      </div>

      {/* Course Header */}
      <div className={styles.header}>
        <div className={styles.container}>
          <div className={styles.headerContent}>
            <div className={styles.courseInfo}>
              <span className={styles.category}>{getCategoryLabel(course.category)}</span>
              {course.isVip && <span className={styles.vipBadge}>👑 VIP</span>}
              
              <h1 className={styles.title}>{course.title}</h1>
              <p className={styles.description}>{course.description}</p>
              
              <div className={styles.meta}>
                <div className={styles.metaItem}>
                  <span className={styles.metaIcon}>👨‍🏫</span>
                  <span>Giảng viên: <strong>{course.instructor}</strong></span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaIcon}>⏱️</span>
                  <span>Thời lượng: <strong>{course.duration}</strong></span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaIcon}>📚</span>
                  <span><strong>{course.lessonCount}</strong> bài học</span>
                </div>
                {course.students && (
                  <div className={styles.metaItem}>
                    <span className={styles.metaIcon}>👥</span>
                    <span><strong>{course.students.toLocaleString()}</strong> học viên</span>
                  </div>
                )}
                {course.rating && (
                  <div className={styles.metaItem}>
                    <span className={styles.metaIcon}>⭐</span>
                    <span><strong>{course.rating}</strong>/5</span>
                  </div>
                )}
              </div>

              <div className={styles.actions}>
                {course.isVip ? (
                  <Link href="/vip" className={styles.vipButton}>
                    👑 Đăng Ký VIP Để Học
                  </Link>
                ) : (
                  <button className={styles.enrollButton}>
                    Đăng Ký Ngay {course.price ? `- ${course.price.toLocaleString()}đ` : '- Miễn Phí'}
                  </button>
                )}
                <button className={styles.previewButton}>
                  ▶️ Xem Giới Thiệu
                </button>
              </div>
            </div>

            <div className={styles.thumbnail}>
              <div className={styles.thumbnailPlaceholder}>
                <span>🎬</span>
                <p>Video giới thiệu khóa học</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className={styles.content}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {/* Main Content */}
            <div className={styles.mainContent}>
              <section className={styles.section}>
                <h2>📋 Mô Tả Khóa Học</h2>
                <div className={styles.sectionContent}>
                  <p>{course.description}</p>
                  <p>Khóa học sẽ giúp bạn nắm vững các kiến thức từ cơ bản đến nâng cao, với nhiều bài tập thực hành và dự án thực tế.</p>
                </div>
              </section>

              <section className={styles.section}>
                <h2>🎯 Bạn Sẽ Học Được Gì</h2>
                <ul className={styles.learningList}>
                  <li>✅ Hiểu rõ các khái niệm cốt lõi và cách hoạt động</li>
                  <li>✅ Thực hành với các bài tập từ dễ đến khó</li>
                  <li>✅ Xây dựng dự án thực tế từ đầu đến cuối</li>
                  <li>✅ Áp dụng kỹ năng vào công việc thực tế</li>
                  <li>✅ Nhận chứng chỉ hoàn thành khóa học</li>
                </ul>
              </section>

              <section className={styles.section}>
                <h2>📚 Nội Dung Khóa Học</h2>
                <div className={styles.curriculum}>
                  {Array.from({ length: Math.min(course.lessonCount, 10) }, (_, i) => (
                    <div key={i} className={styles.lesson}>
                      <span className={styles.lessonNumber}>{i + 1}</span>
                      <div className={styles.lessonInfo}>
                        <h4>Bài {i + 1}: {i === 0 ? 'Giới thiệu khóa học' : `Nội dung bài học ${i + 1}`}</h4>
                        <span className={styles.lessonDuration}>15-20 phút</span>
                      </div>
                      {i === 0 && <span className={styles.freeTag}>Miễn phí</span>}
                    </div>
                  ))}
                  {course.lessonCount > 10 && (
                    <div className={styles.moreLesson}>
                      + {course.lessonCount - 10} bài học khác
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className={styles.sidebar}>
              <div className={styles.priceCard}>
                <div className={styles.priceHeader}>
                  {course.isVip ? (
                    <>
                      <span className={styles.vipPrice}>👑 VIP Only</span>
                      <p>Đăng ký VIP để truy cập</p>
                    </>
                  ) : course.price ? (
                    <>
                      <span className={styles.price}>{course.price.toLocaleString()}đ</span>
                      <span className={styles.originalPrice}>{(course.price * 1.5).toLocaleString()}đ</span>
                    </>
                  ) : (
                    <span className={styles.freePrice}>Miễn Phí</span>
                  )}
                </div>
                
                {course.isVip ? (
                  <Link href="/vip" className={styles.ctaButton}>
                    Đăng Ký VIP - 998¥/năm
                  </Link>
                ) : (
                  <button className={styles.ctaButton}>
                    Đăng Ký Ngay
                  </button>
                )}

                <ul className={styles.features}>
                  <li>📱 Truy cập trọn đời</li>
                  <li>📺 {course.lessonCount} video bài giảng</li>
                  <li>📝 Tài liệu & bài tập</li>
                  <li>💬 Hỗ trợ Q&A</li>
                  <li>🏆 Chứng chỉ hoàn thành</li>
                </ul>
              </div>

              <div className={styles.instructorCard}>
                <h3>Giảng Viên</h3>
                <div className={styles.instructorInfo}>
                  <div className={styles.avatar}>👨‍🏫</div>
                  <div>
                    <h4>{course.instructor}</h4>
                    <p>Chuyên gia AI</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
