'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useData } from '@/context/DataContext';
import styles from './page.module.css';

export default function ToolDetailPage() {
  const params = useParams();
  const { tools } = useData();
  
  const tool = tools.find(t => t.id === params.id);

  if (!tool) {
    return (
      <div className={styles.notFound}>
        <h1>Không tìm thấy công cụ</h1>
        <Link href="/tools">← Quay lại danh sách</Link>
      </div>
    );
  }

  const getCategoryLabel = (cat: string) => {
    const labels: Record<string, string> = {
      'video': 'Video',
      'image': 'Hình Ảnh',
      'text': 'Văn Bản',
      'audio': 'Âm Thanh',
      'efficiency': 'Năng Suất',
    };
    return labels[cat] || cat;
  };

  const getCategoryIcon = (cat: string) => {
    const icons: Record<string, string> = {
      'video': '🎬',
      'image': '🎨',
      'text': '✍️',
      'audio': '🎵',
      'efficiency': '⚡',
    };
    return icons[cat] || '🔧';
  };

  // Get related tools
  const relatedTools = tools
    .filter(t => t.id !== tool.id && t.category === tool.category)
    .slice(0, 4);

  return (
    <div className={styles.page}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <div className={styles.container}>
          <Link href="/">Trang chủ</Link>
          <span>/</span>
          <Link href="/tools">Công cụ AI</Link>
          <span>/</span>
          <span>{tool.name}</span>
        </div>
      </div>

      {/* Tool Header */}
      <div className={styles.header}>
        <div className={styles.container}>
          <div className={styles.headerContent}>
            <div className={styles.toolIcon}>
              <span>{getCategoryIcon(tool.category)}</span>
            </div>
            
            <div className={styles.toolInfo}>
              <div className={styles.badges}>
                <span className={styles.category}>{getCategoryLabel(tool.category)}</span>
                {tool.isFeatured && <span className={styles.hotBadge}>🔥 Hot</span>}
              </div>
              
              <h1 className={styles.title}>{tool.name}</h1>
              <p className={styles.description}>{tool.description}</p>
              
              {tool.tags && tool.tags.length > 0 && (
                <div className={styles.tags}>
                  {tool.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              )}
              
              <div className={styles.actions}>
                <a href={tool.url} target="_blank" rel="noopener noreferrer" className={styles.visitButton}>
                  🚀 Truy Cập {tool.name}
                </a>
                <button className={styles.saveButton}>
                  🔖 Lưu Công Cụ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tool Content */}
      <div className={styles.content}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {/* Main Content */}
            <div className={styles.mainContent}>
              <section className={styles.section}>
                <h2>📋 Giới Thiệu</h2>
                <div className={styles.sectionContent}>
                  <p>{tool.description}</p>
                  <p>Đây là một trong những công cụ AI hàng đầu trong danh mục {getCategoryLabel(tool.category).toLowerCase()}. Với giao diện thân thiện và hiệu suất cao, công cụ này sẽ giúp bạn tối ưu hóa công việc một cách hiệu quả.</p>
                </div>
              </section>

              <section className={styles.section}>
                <h2>✨ Tính Năng Nổi Bật</h2>
                <ul className={styles.featureList}>
                  <li>
                    <span className={styles.featureIcon}>🎯</span>
                    <div>
                      <h4>Dễ Sử Dụng</h4>
                      <p>Giao diện trực quan, không cần kinh nghiệm kỹ thuật</p>
                    </div>
                  </li>
                  <li>
                    <span className={styles.featureIcon}>⚡</span>
                    <div>
                      <h4>Tốc Độ Nhanh</h4>
                      <p>Xử lý nhanh chóng với công nghệ AI tiên tiến</p>
                    </div>
                  </li>
                  <li>
                    <span className={styles.featureIcon}>🔒</span>
                    <div>
                      <h4>Bảo Mật</h4>
                      <p>Dữ liệu được bảo vệ và mã hóa an toàn</p>
                    </div>
                  </li>
                  <li>
                    <span className={styles.featureIcon}>💎</span>
                    <div>
                      <h4>Chất Lượng Cao</h4>
                      <p>Kết quả đầu ra chất lượng chuyên nghiệp</p>
                    </div>
                  </li>
                </ul>
              </section>

              <section className={styles.section}>
                <h2>📖 Hướng Dẫn Sử Dụng</h2>
                <div className={styles.steps}>
                  <div className={styles.step}>
                    <span className={styles.stepNumber}>1</span>
                    <div>
                      <h4>Truy Cập Trang Web</h4>
                      <p>Nhấn nút "Truy Cập" để đến trang web chính thức của {tool.name}</p>
                    </div>
                  </div>
                  <div className={styles.step}>
                    <span className={styles.stepNumber}>2</span>
                    <div>
                      <h4>Đăng Ký / Đăng Nhập</h4>
                      <p>Tạo tài khoản mới hoặc đăng nhập nếu đã có tài khoản</p>
                    </div>
                  </div>
                  <div className={styles.step}>
                    <span className={styles.stepNumber}>3</span>
                    <div>
                      <h4>Bắt Đầu Sử Dụng</h4>
                      <p>Khám phá các tính năng và bắt đầu tạo nội dung</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className={styles.sidebar}>
              <div className={styles.infoCard}>
                <h3>Thông Tin</h3>
                <ul className={styles.infoList}>
                  <li>
                    <span>Danh mục</span>
                    <strong>{getCategoryLabel(tool.category)}</strong>
                  </li>
                  <li>
                    <span>Định giá</span>
                    <strong>Freemium</strong>
                  </li>
                  <li>
                    <span>Ngôn ngữ</span>
                    <strong>Đa ngôn ngữ</strong>
                  </li>
                  <li>
                    <span>Nền tảng</span>
                    <strong>Web</strong>
                  </li>
                </ul>
                
                <a href={tool.url} target="_blank" rel="noopener noreferrer" className={styles.ctaButton}>
                  Truy Cập Ngay →
                </a>
              </div>

              {relatedTools.length > 0 && (
                <div className={styles.relatedCard}>
                  <h3>Công Cụ Tương Tự</h3>
                  {relatedTools.map((related) => (
                    <Link key={related.id} href={`/tools/${related.id}`} className={styles.relatedItem}>
                      <div className={styles.relatedIcon}>
                        {getCategoryIcon(related.category)}
                      </div>
                      <div>
                        <h4>{related.name}</h4>
                        <span>{getCategoryLabel(related.category)}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
