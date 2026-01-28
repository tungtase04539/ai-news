'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import styles from './auth.module.css';

export default function LoginPage() {
  const router = useRouter();
  const { login, loginWithGoogle, error, loading } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');

    if (!email || !password) {
      setLocalError('Vui lòng nhập email và mật khẩu');
      return;
    }

    const success = await login(email, password);
    if (success) {
      router.push('/');
    }
  };

  const handleGoogleLogin = async () => {
    await loginWithGoogle();
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <div className={styles.header}>
            <Link href="/" className={styles.logo}>
              🤖 XiaoHu.AI
            </Link>
            <h1>Đăng Nhập</h1>
            <p>Chào mừng bạn quay lại!</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {(error || localError) && (
              <div className={styles.error}>
                {error || localError}
              </div>
            )}

            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password">Mật khẩu</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={styles.input}
                required
              />
            </div>

            <div className={styles.options}>
              <label className={styles.remember}>
                <input type="checkbox" />
                <span>Ghi nhớ đăng nhập</span>
              </label>
              <Link href="/forgot-password" className={styles.forgot}>
                Quên mật khẩu?
              </Link>
            </div>

            <button 
              type="submit" 
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
            </button>
          </form>

          <div className={styles.divider}>
            <span>hoặc</span>
          </div>

          <div className={styles.socialLogin}>
            <button 
              type="button"
              onClick={handleGoogleLogin}
              className={styles.googleBtn}
            >
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Đăng nhập với Google
            </button>
          </div>

          <p className={styles.switch}>
            Chưa có tài khoản?{' '}
            <Link href="/register">Đăng ký ngay</Link>
          </p>
        </div>

        <div className={styles.banner}>
          <div className={styles.bannerContent}>
            <h2>Học AI cùng XiaoHu</h2>
            <p>Truy cập hơn 100+ khóa học AI, công cụ và tài liệu độc quyền</p>
            <ul>
              <li>✅ Khóa học AI từ cơ bản đến nâng cao</li>
              <li>✅ Thư viện Prompt chuyên nghiệp</li>
              <li>✅ Cộng đồng hỗ trợ 24/7</li>
              <li>✅ Cập nhật xu hướng AI mới nhất</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
