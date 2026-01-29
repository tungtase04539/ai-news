'use client';

import { useState, useRef } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import styles from './ImageUpload.module.css';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  placeholder?: string;
}

export default function ImageUpload({ 
  value, 
  onChange, 
  folder = 'articles',
  placeholder = 'Chọn ảnh hoặc kéo thả vào đây'
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Vui lòng chọn file ảnh');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Ảnh không được vượt quá 5MB');
      return;
    }

    setError(null);
    setUploading(true);

    try {
      if (!isSupabaseConfigured() || !supabase) {
        // Demo mode: create object URL
        const objectUrl = URL.createObjectURL(file);
        onChange(objectUrl);
        setUploading(false);
        return;
      }

      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

      // Upload to Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from('images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('images')
        .getPublicUrl(data.path);

      onChange(urlData.publicUrl);
    } catch (err: unknown) {
      console.error('Upload error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Có lỗi khi upload ảnh';
      setError(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleRemove = () => {
    onChange('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className={styles.container}>
      {value ? (
        <div className={styles.preview}>
          <img src={value} alt="Preview" />
          <div className={styles.previewOverlay}>
            <button 
              type="button" 
              onClick={() => inputRef.current?.click()}
              className={styles.changeBtn}
            >
              🔄 Đổi ảnh
            </button>
            <button 
              type="button" 
              onClick={handleRemove}
              className={styles.removeBtn}
            >
              🗑️ Xóa
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`${styles.dropzone} ${dragActive ? styles.active : ''} ${uploading ? styles.uploading : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? (
            <div className={styles.uploadingState}>
              <div className={styles.spinner}></div>
              <span>Đang tải lên...</span>
            </div>
          ) : (
            <>
              <span className={styles.icon}>📷</span>
              <span className={styles.text}>{placeholder}</span>
              <span className={styles.hint}>PNG, JPG, GIF tối đa 5MB</span>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className={styles.input}
      />

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
