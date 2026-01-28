import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoIcon}>🤖</span>
              <span className={styles.logoText}>XiaoHu<span className={styles.logoAccent}>.AI</span></span>
            </Link>
            <p className={styles.tagline}>
              Nền tảng học tập AI hàng đầu. Cung cấp khóa học, tin tức và công cụ AI chất lượng cao.
            </p>
            <div className={styles.social}>
              <a href="#" className={styles.socialLink} aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" className={styles.socialLink} aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" className={styles.socialLink} aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="#" className={styles.socialLink} aria-label="WeChat">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .139.045c.133 0 .241-.108.241-.243 0-.06-.023-.118-.039-.177l-.326-1.233a.49.49 0 0 1 .177-.553C23.011 18.38 24 16.614 24 14.684c0-3.354-3.081-5.776-7.062-5.826zm-2.235 2.952c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"/></svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div className={styles.links}>
            <h4 className={styles.linksTitle}>Học Tập</h4>
            <Link href="/ai-course" className={styles.link}>Khóa Học AI</Link>
            <Link href="/ai-course?cat=prompt" className={styles.link}>Prompt Engineering</Link>
            <Link href="/ai-course?cat=video" className={styles.link}>Video AI</Link>
            <Link href="/ai-course?cat=image" className={styles.link}>Tạo Hình Ảnh</Link>
          </div>

          <div className={styles.links}>
            <h4 className={styles.linksTitle}>Cộng Đồng</h4>
            <Link href="/society" className={styles.link}>Tin Tức AI</Link>
            <Link href="/society?tab=deep-dive" className={styles.link}>Bài Viết Chuyên Sâu</Link>
            <Link href="/society?tab=prompts" className={styles.link}>Thư Viện Prompt</Link>
            <Link href="/tools" className={styles.link}>Công Cụ AI</Link>
          </div>

          <div className={styles.links}>
            <h4 className={styles.linksTitle}>Hỗ Trợ</h4>
            <Link href="/vip" className={styles.link}>Đăng Ký VIP</Link>
            <Link href="/about" className={styles.link}>Về Chúng Tôi</Link>
            <Link href="/contact" className={styles.link}>Liên Hệ</Link>
            <Link href="/faq" className={styles.link}>Câu Hỏi Thường Gặp</Link>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} XiaoHu.AI. Tất cả quyền được bảo lưu.
          </p>
          <div className={styles.legal}>
            <Link href="/terms" className={styles.legalLink}>Điều Khoản Sử Dụng</Link>
            <Link href="/privacy" className={styles.legalLink}>Chính Sách Bảo Mật</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
