'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import styles from './auth.module.css';

export default function RegisterPage() {
  const router = useRouter();
  const { register, loginWithGoogle, error, loading } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');

    if (!name || !email || !password) {
      setLocalError('Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (password.length < 6) {
      setLocalError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    if (password !== confirmPassword) {
      setLocalError('Mật khẩu xác nhận không khớp');
      return;
    }

    const success = await register(email, password, name);
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
            <h1>Đăng Ký</h1>
            <p>Tạo tài khoản để bắt đầu học AI</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {(error || localError) && (
              <div className={styles.error}>
                {error || localError}
              </div>
            )}

            <div className={styles.formGroup}>
              <label htmlFor="name">Họ tên</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nguyễn Văn A"
                className={styles.input}
                required
              />
            </div>

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
                placeholder="Ít nhất 6 ký tự"
                className={styles.input}
                required
                minLength={6}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Nhập lại mật khẩu"
                className={styles.input}
                required
              />
            </div>

            <div className={styles.terms}>
              <label>
                <input type="checkbox" required />
                <span>
                  Tôi đồng ý với{' '}
                  <Link href="/terms">Điều khoản sử dụng</Link> và{' '}
                  <Link href="/privacy">Chính sách bảo mật</Link>
                </span>
              </label>
            </div>

            <button 
              type="submit" 
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? 'Đang đăng ký...' : 'Đăng Ký'}
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
              Đăng ký với Google
            </button>
          </div>

          <p className={styles.switch}>
            Đã có tài khoản?{' '}
            <Link href="/login">Đăng nhập</Link>
          </p>
        </div>

        <div className={styles.banner}>
          <div className={styles.bannerContent}>
            <h2>Thành viên VIP nhận được gì?</h2>
            <ul>
              <li>🎓 Truy cập tất cả khóa học premium</li>
              <li>📚 Thư viện 500+ Prompts độc quyền</li>
              <li>🔧 Hướng dẫn sử dụng 50+ công cụ AI</li>
              <li>💬 Hỗ trợ 1-1 từ chuyên gia</li>
              <li>📥 Tải tài liệu không giới hạn</li>
            </ul>
            <div className={styles.vipPrice}>
              <span className={styles.price}>998¥</span>
              <span className={styles.period}>/năm</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
