'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import styles from './Header.module.css';

const navItems = [
  { label: 'Trang Chủ', href: '/' },
  { label: 'Khóa Học AI', href: '/ai-course' },
  { 
    label: 'Cộng Đồng', 
    href: '/society',
    children: [
      { label: 'Tin Tức AI', href: '/society?tab=news' },
      { label: 'Bài Viết Chuyên Sâu', href: '/society?tab=deep-dive', isVip: true },
      { label: 'Thư Viện Prompt', href: '/society?tab=prompts', isVip: true },
    ]
  },
  { label: 'Công Cụ AI', href: '/tools' },
  { label: 'VIP', href: '/vip', isVip: true },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>🤖</span>
          <span className={styles.logoText}>XiaoHu<span className={styles.logoAccent}>.AI</span></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <div key={item.href} className={styles.navItem}>
              <Link href={item.href} className={styles.navLink}>
                {item.label}
                {item.isVip && <span className={styles.vipTag}>VIP</span>}
                {item.children && (
                  <svg className={styles.chevron} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                )}
              </Link>
              {item.children && (
                <div className={styles.dropdown}>
                  {item.children.map((child) => (
                    <Link key={child.href} href={child.href} className={styles.dropdownItem}>
                      {child.label}
                      {child.isVip && <span className={styles.vipTag}>VIP</span>}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Search Bar */}
        <div className={styles.search}>
          <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Tìm kiếm khóa học, bài viết..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        {/* User Actions */}
        <div className={styles.actions}>
          <Link href="/admin" className={styles.adminButton}>
            ⚙️ Admin
          </Link>
          
          {isAuthenticated && user ? (
            <div className={styles.userMenu}>
              <button 
                className={styles.userButton}
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <span className={styles.userAvatar}>
                  {user.name?.charAt(0).toUpperCase() || '👤'}
                </span>
                <span className={styles.userName}>{user.name || user.email}</span>
                <svg className={styles.chevron} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              
              {showUserMenu && (
                <div className={styles.userDropdown}>
                  <div className={styles.userInfo}>
                    <span className={styles.userEmail}>{user.email}</span>
                    {user.isVip && <span className={styles.vipBadge}>👑 VIP</span>}
                  </div>
                  <Link href="/profile" className={styles.dropdownItem}>
                    👤 Hồ sơ của tôi
                  </Link>
                  <Link href="/my-courses" className={styles.dropdownItem}>
                    📚 Khóa học của tôi
                  </Link>
                  <Link href="/settings" className={styles.dropdownItem}>
                    ⚙️ Cài đặt
                  </Link>
                  <button onClick={handleLogout} className={styles.logoutButton}>
                    🚪 Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/vip" className={styles.vipButton}>
                <span className={styles.vipIcon}>👑</span>
                Nâng Cấp VIP
              </Link>
              <Link href="/login" className={styles.loginButton}>
                Đăng Nhập
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className={styles.menuToggle}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`${styles.menuBar} ${isMenuOpen ? styles.menuBarOpen : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.mobileNavLink}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
              {item.isVip && <span className={styles.vipTag}>VIP</span>}
            </Link>
          ))}
          <Link href="/admin" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>
            ⚙️ Admin Dashboard
          </Link>
          <div className={styles.mobileActions}>
            {isAuthenticated && user ? (
              <>
                <div className={styles.mobileUserInfo}>
                  <span>👤 {user.name || user.email}</span>
                </div>
                <button onClick={handleLogout} className={styles.loginButton}>
                  🚪 Đăng Xuất
                </button>
              </>
            ) : (
              <>
                <Link href="/vip" className={styles.vipButton}>👑 Nâng Cấp VIP</Link>
                <Link href="/login" className={styles.loginButton}>Đăng Nhập</Link>
                <Link href="/register" className={styles.registerButton}>Đăng Ký</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
