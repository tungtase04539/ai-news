import Link from 'next/link';
import { Article } from '@/types';
import styles from './ArticleCard.module.css';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'horizontal';
}

export default function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  const isHorizontal = variant === 'horizontal';

  return (
    <Link 
      href={`/society/${article.id}`} 
      className={`${styles.card} ${isHorizontal ? styles.horizontal : ''}`}
    >
      <div className={styles.imageWrapper}>
        {article.thumbnail && !article.thumbnail.includes('default') ? (
          <img 
            src={article.thumbnail} 
            alt={article.title}
            className={styles.image}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove(styles.hidden);
            }}
          />
        ) : null}
        <div className={`${styles.imagePlaceholder} ${article.thumbnail && !article.thumbnail.includes('default') ? styles.hidden : ''}`}>
          <span className={styles.categoryIcon}>
            {getCategoryIcon(article.category)}
          </span>
        </div>
        {article.isVip && <span className={styles.vipBadge}>VIP</span>}
      </div>
      
      <div className={styles.content}>
        <div className={styles.tags}>
          <span className={styles.category}>{getCategoryLabel(article.category)}</span>
          {article.tags?.slice(0, 2).map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
        
        <h3 className={styles.title}>{article.title}</h3>
        <p className={styles.excerpt}>{article.excerpt}</p>
        
        <div className={styles.meta}>
          <div className={styles.author}>
            <div className={styles.avatar}>
              {article.author.charAt(0)}
            </div>
            <span>{article.author}</span>
            <span className={styles.date}>{formatDate(article.date)}</span>
          </div>
          
          <div className={styles.stats}>
            <span className={styles.stat}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              {formatNumber(article.views)}
            </span>
            <span className={styles.stat}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {formatNumber(article.likes)}
            </span>
            <span className={styles.stat}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              {article.comments}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    'news': '📰',
    'deep-dive': '🔬',
    'tutorial': '📚',
    'monetization': '💰',
    'prompt-library': '✨',
  };
  return icons[category] || '📄';
}

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    'news': 'Tin Tức',
    'deep-dive': 'Chuyên Sâu',
    'tutorial': 'Hướng Dẫn',
    'monetization': 'Kiếm Tiền',
    'prompt-library': 'Thư Viện Prompt',
  };
  return labels[category] || category;
}

function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) return 'Hôm qua';
  if (diffDays <= 7) return `${diffDays} ngày trước`;
  
  return new Intl.DateTimeFormat('vi-VN', {
    day: 'numeric',
    month: 'short',
  }).format(date);
}
