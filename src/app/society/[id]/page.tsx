'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useData } from '@/context/DataContext';
import styles from './page.module.css';

export default function ArticleDetailPage() {
  const params = useParams();
  const { articles } = useData();
  
  const article = articles.find(a => a.id === params.id);

  if (!article) {
    return (
      <div className={styles.notFound}>
        <h1>Không tìm thấy bài viết</h1>
        <Link href="/society">← Quay lại danh sách</Link>
      </div>
    );
  }

  const getCategoryLabel = (cat: string) => {
    const labels: Record<string, string> = {
      'news': 'Tin Tức',
      'deep-dive': 'Chuyên Sâu',
      'tutorial': 'Hướng Dẫn',
      'monetization': 'Kiếm Tiền',
      'prompt-library': 'Thư Viện Prompt',
    };
    return labels[cat] || cat;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className={styles.page}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <div className={styles.container}>
          <Link href="/">Trang chủ</Link>
          <span>/</span>
          <Link href="/society">Cộng đồng</Link>
          <span>/</span>
          <span>{article.title.substring(0, 30)}...</span>
        </div>
      </div>

      {/* Article Header */}
      <article className={styles.article}>
        <div className={styles.container}>
          <header className={styles.header}>
            <div className={styles.tags}>
              <span className={styles.category}>{getCategoryLabel(article.category)}</span>
              {article.isVip && <span className={styles.vipBadge}>👑 VIP</span>}
            </div>
            
            <h1 className={styles.title}>{article.title}</h1>
            
            <div className={styles.meta}>
              <div className={styles.author}>
                <div className={styles.avatar}>👤</div>
                <div>
                  <span className={styles.authorName}>{article.author}</span>
                  <span className={styles.date}>{formatDate(article.date)}</span>
                </div>
              </div>
              
              <div className={styles.stats}>
                <span>👁️ {article.views.toLocaleString()}</span>
                <span>❤️ {article.likes.toLocaleString()}</span>
                <span>💬 {article.comments}</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className={styles.featuredImage}>
            <div className={styles.imagePlaceholder}>
              <span>📰</span>
              <p>Hình ảnh bài viết</p>
            </div>
          </div>

          {/* Article Content */}
          <div className={styles.grid}>
            <div className={styles.content}>
              {article.isVip ? (
                <div className={styles.vipContent}>
                  <div className={styles.vipOverlay}>
                    <span className={styles.lockIcon}>🔒</span>
                    <h3>Nội Dung Dành Riêng Cho VIP</h3>
                    <p>Đăng ký VIP để đọc toàn bộ bài viết chuyên sâu này.</p>
                    <Link href="/vip" className={styles.vipButton}>
                      👑 Đăng Ký VIP - 998¥/năm
                    </Link>
                  </div>
                  
                  <div className={styles.previewContent}>
                    <p className={styles.excerpt}>{article.excerpt}</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
                    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident...</p>
                  </div>
                </div>
              ) : (
                <div className={styles.articleBody}>
                  <p className={styles.lead}>{article.excerpt}</p>
                  
                  <h2>Giới Thiệu</h2>
                  <p>Trong bối cảnh công nghệ AI đang phát triển với tốc độ chóng mặt, việc cập nhật những thông tin mới nhất là vô cùng quan trọng. Bài viết này sẽ đi sâu vào phân tích và giải thích những điểm cốt lõi mà bạn cần biết.</p>
                  
                  <h2>Nội Dung Chính</h2>
                  <p>Các chuyên gia trong ngành đánh giá rằng đây là một bước tiến quan trọng trong lĩnh vực trí tuệ nhân tạo. Với những cải tiến đáng kể về hiệu suất và khả năng xử lý, công nghệ mới hứa hẹn mang lại nhiều giá trị thiết thực cho người dùng.</p>
                  
                  <blockquote>
                    "Đây là một bước nhảy vọt trong công nghệ AI, mở ra nhiều cơ hội mới cho cả doanh nghiệp và cá nhân." - Chuyên gia AI
                  </blockquote>
                  
                  <h2>Ý Nghĩa Và Tác Động</h2>
                  <p>Sự phát triển này không chỉ có ý nghĩa về mặt công nghệ mà còn tác động đến nhiều lĩnh vực khác nhau trong đời sống. Từ giáo dục, y tế đến sáng tạo nội dung, AI đang dần trở thành một phần không thể thiếu.</p>
                  
                  <h2>Kết Luận</h2>
                  <p>Tương lai của AI rất hứa hẹn và chúng ta đang ở trong một giai đoạn chuyển đổi quan trọng. Việc nắm bắt xu hướng và học hỏi những công nghệ mới sẽ giúp bạn không bị bỏ lại phía sau trong cuộc cách mạng công nghệ này.</p>
                </div>
              )}

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className={styles.articleTags}>
                  <span className={styles.tagsLabel}>Tags:</span>
                  {article.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className={styles.articleActions}>
                <button className={styles.likeButton}>
                  ❤️ Thích ({article.likes})
                </button>
                <button className={styles.shareButton}>
                  🔗 Chia sẻ
                </button>
                <button className={styles.bookmarkButton}>
                  🔖 Lưu
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <aside className={styles.sidebar}>
              <div className={styles.authorCard}>
                <h3>Tác Giả</h3>
                <div className={styles.authorInfo}>
                  <div className={styles.authorAvatar}>👤</div>
                  <div>
                    <h4>{article.author}</h4>
                    <p>Chuyên gia AI & Content Creator</p>
                  </div>
                </div>
                <p className={styles.authorBio}>
                  Chuyên gia trong lĩnh vực AI với nhiều năm kinh nghiệm nghiên cứu và ứng dụng công nghệ.
                </p>
              </div>

              <div className={styles.relatedCard}>
                <h3>Bài Viết Liên Quan</h3>
                {articles.filter(a => a.id !== article.id).slice(0, 3).map((related) => (
                  <Link key={related.id} href={`/society/${related.id}`} className={styles.relatedItem}>
                    <div className={styles.relatedThumb}>📄</div>
                    <div>
                      <h4>{related.title}</h4>
                      <span>{formatDate(related.date)}</span>
                    </div>
                  </Link>
                ))}
              </div>

              {!article.isVip && (
                <div className={styles.vipPromo}>
                  <span className={styles.promoIcon}>👑</span>
                  <h3>Nâng Cấp VIP</h3>
                  <p>Truy cập tất cả bài viết chuyên sâu và thư viện prompt</p>
                  <Link href="/vip" className={styles.promoButton}>
                    Đăng Ký Ngay
                  </Link>
                </div>
              )}
            </aside>
          </div>
        </div>
      </article>
    </div>
  );
}
