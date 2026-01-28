import Link from 'next/link';
import HeroBanner from '@/components/ui/HeroBanner';
import styles from './page.module.css';

const benefits = [
  {
    icon: '🎓',
    title: '50+ Khóa Học Premium',
    description: 'Truy cập không giới hạn tất cả khóa học AI từ cơ bản đến nâng cao.',
  },
  {
    icon: '📰',
    title: 'Bài Viết Chuyên Sâu',
    description: 'Phân tích chuyên sâu về các sản phẩm AI và chiến lược thương mại.',
  },
  {
    icon: '✨',
    title: 'Thư Viện Prompt',
    description: 'Hàng nghìn prompt templates cho mọi mục đích sử dụng.',
  },
  {
    icon: '💼',
    title: 'Tài Liệu Độc Quyền',
    description: 'Workflow files và tài liệu chuyên nghiệp từ các chuyên gia.',
  },
  {
    icon: '👥',
    title: 'Cộng Đồng VIP',
    description: 'Tham gia cộng đồng riêng với các chuyên gia AI hàng đầu.',
  },
  {
    icon: '🎯',
    title: 'Hỗ Trợ Ưu Tiên',
    description: 'Q&A hàng tuần và livestream hàng tháng với chuyên gia.',
  },
  {
    icon: '🚀',
    title: 'Beta Access',
    description: 'Trải nghiệm sớm các tính năng mới và công cụ độc quyền.',
  },
  {
    icon: '💰',
    title: 'Kiếm Tiền Với AI',
    description: 'Chiến lược và dự án thương mại hóa AI thực tế.',
  },
];

const faqs = [
  {
    question: 'Làm thế nào để đăng ký VIP?',
    answer: 'Bạn có thể đăng ký VIP bằng cách nhấn nút "Đăng Ký Ngay" và thanh toán qua PayPal, Stripe hoặc WeChat Pay.',
  },
  {
    question: 'Có thể hoàn tiền không?',
    answer: 'Có! Chúng tôi cam kết hoàn tiền 100% trong vòng 5 ngày đầu nếu bạn không hài lòng.',
  },
  {
    question: 'VIP có thời hạn bao lâu?',
    answer: 'Gói VIP có thời hạn 1 năm kể từ ngày đăng ký. Sau đó bạn có thể gia hạn với ưu đãi đặc biệt.',
  },
  {
    question: 'Tôi có thể truy cập trên bao nhiêu thiết bị?',
    answer: 'Bạn có thể truy cập VIP trên tối đa 3 thiết bị cùng lúc.',
  },
];

export default function VIPPage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <HeroBanner variant="vip" />

      {/* Benefits */}
      <section className={styles.benefitsSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>🎁 Quyền Lợi VIP</h2>
          <p className={styles.sectionSubtitle}>
            Trải nghiệm toàn bộ tính năng cao cấp với một mức giá hợp lý
          </p>
          <div className={styles.benefitsGrid}>
            {benefits.map((benefit) => (
              <div key={benefit.title} className={styles.benefitCard}>
                <span className={styles.benefitIcon}>{benefit.icon}</span>
                <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                <p className={styles.benefitDesc}>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className={styles.pricingSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>💎 Bảng Giá</h2>
          <div className={styles.pricingCard}>
            <div className={styles.pricingBadge}>Phổ Biến Nhất</div>
            <h3 className={styles.pricingName}>VIP Yearly</h3>
            <div className={styles.pricingPrice}>
              <span className={styles.currency}>¥</span>
              <span className={styles.amount}>998</span>
              <span className={styles.period}>/năm</span>
            </div>
            <p className={styles.pricingNote}>Tương đương ~$136 USD • ~3.4 triệu VND</p>
            
            <ul className={styles.pricingFeatures}>
              <li>✓ Tất cả 50+ khóa học premium</li>
              <li>✓ Bài viết chuyên sâu không giới hạn</li>
              <li>✓ Thư viện prompt đầy đủ</li>
              <li>✓ Cộng đồng VIP độc quyền</li>
              <li>✓ Hỗ trợ Q&A hàng tuần</li>
              <li>✓ Livestream monthly với chuyên gia</li>
              <li>✓ Tài liệu & workflow files</li>
              <li>✓ Beta access tính năng mới</li>
            </ul>

            <button className={styles.pricingBtn}>
              Đăng Ký VIP Ngay
            </button>
            <p className={styles.pricingGuarantee}>
              ✨ Dùng thử 5 ngày miễn phí • Hoàn tiền 100% nếu không hài lòng
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faqSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>❓ Câu Hỏi Thường Gặp</h2>
          <div className={styles.faqGrid}>
            {faqs.map((faq) => (
              <div key={faq.question} className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>{faq.question}</h3>
                <p className={styles.faqAnswer}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2>Sẵn Sàng Nâng Cấp?</h2>
            <p>Tham gia cùng hàng nghìn học viên đang học và phát triển với AI mỗi ngày.</p>
            <Link href="#" className={styles.ctaBtn}>
              Đăng Ký VIP Ngay - 998¥/năm
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
