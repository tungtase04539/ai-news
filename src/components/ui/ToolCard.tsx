import { Tool } from '@/types';
import styles from './ToolCard.module.css';

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <a 
      href={tool.url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={styles.card}
    >
      <div className={styles.iconWrapper}>
        <span className={styles.icon}>{getCategoryIcon(tool.category)}</span>
        {tool.isFeatured && <span className={styles.featuredBadge}>🔥 Hot</span>}
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.name}>{tool.name}</h3>
        <p className={styles.description}>{tool.description}</p>
        
        {tool.tags && (
          <div className={styles.tags}>
            {tool.tags.slice(0, 3).map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        )}
      </div>

      <div className={styles.action}>
        <span className={styles.visitBtn}>
          Truy Cập
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </span>
      </div>
    </a>
  );
}

function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    'video': '🎬',
    'image': '🎨',
    'text': '✍️',
    'audio': '🎵',
    'efficiency': '⚡',
  };
  return icons[category] || '🔧';
}
