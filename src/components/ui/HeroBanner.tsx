import Link from 'next/link';
import styles from './HeroBanner.module.css';

interface HeroBannerProps {
  variant?: 'default' | 'vip';
}

export default function HeroBanner({ variant = 'default' }: HeroBannerProps) {
  if (variant === 'vip') {
    return (
      <section className={`${styles.hero} ${styles.vipHero}`}>
        <div className={styles.container}>
          <div className={styles.content}>
            <span className={styles.badge}>👑 VIP Membership</span>
            <h1 className={styles.title}>
              Nâng Cấp <span className={styles.highlight}>VIP</span> Ngay Hôm Nay
            </h1>
            <p className={styles.subtitle}>
              Mở khóa toàn bộ khóa học premium, bài viết chuyên sâu, và thư viện prompt độc quyền.
              Tham gia cộng đồng chuyên gia AI.
            </p>
            <div className={styles.actions}>
              <Link href="/vip" className={styles.primaryBtn}>
                Đăng Ký VIP - 998￥/năm
              </Link>
              <Link href="/vip#benefits" className={styles.secondaryBtn}>
                Xem Quyền Lợi
              </Link>
            </div>
            <p className={styles.trial}>✨ Dùng thử 5 ngày miễn phí • Hoàn tiền 100% nếu không hài lòng</p>
          </div>
          <div className={styles.visual}>
            <div className={styles.floatingCards}>
              <div className={styles.floatingCard}>🎬 Video AI</div>
              <div className={styles.floatingCard}>✨ Prompt</div>
              <div className={styles.floatingCard}>🎨 Hình Ảnh</div>
              <div className={styles.floatingCard}>💰 Kiếm Tiền</div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.badge}>🚀 AI Education Platform</span>
          <h1 className={styles.title}>
            Học AI Từ <span className={styles.highlight}>Cơ Bản</span> Đến <span className={styles.highlight}>Chuyên Gia</span>
          </h1>
          <p className={styles.subtitle}>
            Khám phá các khóa học AI chất lượng cao, cập nhật tin tức AI mới nhất,
            và khám phá những công cụ AI hàng đầu thế giới.
          </p>
          <div className={styles.actions}>
            <Link href="/ai-course" className={styles.primaryBtn}>
              Khám Phá Khóa Học
            </Link>
            <Link href="/vip" className={styles.secondaryBtn}>
              Xem Gói VIP
            </Link>
          </div>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>50+</span>
              <span className={styles.statLabel}>Khóa Học</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>10K+</span>
              <span className={styles.statLabel}>Học Viên</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>100+</span>
              <span className={styles.statLabel}>Công Cụ AI</span>
            </div>
          </div>
        </div>
        <div className={styles.visual}>
          <div className={styles.heroImage}>
            <span className={styles.heroEmoji}>🤖</span>
          </div>
        </div>
      </div>
    </section>
  );
}
