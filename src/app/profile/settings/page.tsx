'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import styles from './page.module.css';

export default function ProfileSettingsPage() {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    website: '',
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
    if (user) {
      setFormData({
        name: user.name || '',
        bio: '',
        website: '',
      });
    }
  }, [loading, isAuthenticated, router, user]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Đang tải...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      if (isSupabaseConfigured() && supabase) {
        const { error } = await supabase.auth.updateUser({
          data: {
            name: formData.name,
            bio: formData.bio,
            website: formData.website,
          }
        });

        if (error) throw error;
      } else {
        // Demo mode - update localStorage
        const demoUser = localStorage.getItem('demo_user');
        if (demoUser) {
          const updated = { ...JSON.parse(demoUser), name: formData.name };
          localStorage.setItem('demo_user', JSON.stringify(updated));
        }
      }

      setMessage({ type: 'success', text: 'Đã lưu thông tin thành công!' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Có lỗi xảy ra khi lưu thông tin' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.page}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.container}>
          <Link href="/profile" className={styles.backLink}>← Quay lại hồ sơ</Link>
          <h1 className={styles.title}>Cài Đặt Tài Khoản</h1>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.container}>
          <div className={styles.settingsGrid}>
            {/* Profile Settings */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>👤 Thông Tin Cá Nhân</h2>
              
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.avatarEdit}>
                  {user.avatar ? (
                    <img src={user.avatar} alt="Avatar" className={styles.avatar} />
                  ) : (
                    <div className={styles.avatarPlaceholder}>
                      {(user.name || user.email).charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className={styles.avatarHint}>Ảnh được lấy từ tài khoản Google</span>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Họ và tên</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={styles.input}
                    placeholder="Nhập họ và tên"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Email</label>
                  <input
                    type="email"
                    value={user.email}
                    className={styles.input}
                    disabled
                  />
                  <span className={styles.hint}>Email không thể thay đổi</span>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Giới thiệu bản thân</label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className={styles.textarea}
                    placeholder="Viết vài dòng về bản thân..."
                    rows={4}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Website</label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className={styles.input}
                    placeholder="https://yourwebsite.com"
                  />
                </div>

                {message && (
                  <div className={`${styles.message} ${message.type === 'success' ? styles.success : styles.error}`}>
                    {message.text}
                  </div>
                )}

                <button type="submit" className={styles.saveBtn} disabled={saving}>
                  {saving ? 'Đang lưu...' : '💾 Lưu thay đổi'}
                </button>
              </form>
            </section>

            {/* Sidebar */}
            <aside className={styles.sidebar}>
              {/* Membership */}
              <div className={styles.sidebarCard}>
                <h3>👑 Gói Thành Viên</h3>
                <div className={styles.membershipInfo}>
                  {user.isVip ? (
                    <>
                      <span className={styles.vipBadge}>VIP Active</span>
                      <p>Bạn đang sử dụng gói VIP với đầy đủ tính năng.</p>
                    </>
                  ) : (
                    <>
                      <span className={styles.freeBadge}>Free</span>
                      <p>Nâng cấp VIP để truy cập tất cả nội dung premium.</p>
                      <Link href="/vip" className={styles.upgradeBtn}>
                        Nâng cấp VIP
                      </Link>
                    </>
                  )}
                </div>
              </div>

              {/* Notifications */}
              <div className={styles.sidebarCard}>
                <h3>🔔 Thông Báo</h3>
                <div className={styles.toggleList}>
                  <label className={styles.toggle}>
                    <input type="checkbox" defaultChecked />
                    <span className={styles.slider}></span>
                    <span>Email thông báo</span>
                  </label>
                  <label className={styles.toggle}>
                    <input type="checkbox" defaultChecked />
                    <span className={styles.slider}></span>
                    <span>Bài viết mới</span>
                  </label>
                  <label className={styles.toggle}>
                    <input type="checkbox" />
                    <span className={styles.slider}></span>
                    <span>Quảng cáo</span>
                  </label>
                </div>
              </div>

              {/* Danger Zone */}
              <div className={styles.sidebarCard + ' ' + styles.dangerZone}>
                <h3>⚠️ Vùng Nguy Hiểm</h3>
                <p>Các thao tác không thể hoàn tác.</p>
                <button className={styles.dangerBtn}>
                  Xóa tài khoản
                </button>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
