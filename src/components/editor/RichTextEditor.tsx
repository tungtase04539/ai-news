'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import { useCallback } from 'react';
import styles from './RichTextEditor.module.css';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ content, onChange, placeholder = 'Viết nội dung bài viết...' }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'editor-link',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'editor-image',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: styles.editorContent,
      },
    },
  });

  const addImage = useCallback(() => {
    const url = window.prompt('Nhập URL hình ảnh:');
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const setLink = useCallback(() => {
    if (!editor) return;
    
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Nhập URL:', previousUrl);
    
    if (url === null) return;
    
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return <div className={styles.loading}>Đang tải editor...</div>;
  }

  return (
    <div className={styles.editor}>
      {/* Toolbar */}
      <div className={styles.toolbar}>
        {/* Text Formatting */}
        <div className={styles.toolGroup}>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`${styles.toolBtn} ${editor.isActive('bold') ? styles.active : ''}`}
            title="Đậm (Ctrl+B)"
          >
            <strong>B</strong>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`${styles.toolBtn} ${editor.isActive('italic') ? styles.active : ''}`}
            title="Nghiêng (Ctrl+I)"
          >
            <em>I</em>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`${styles.toolBtn} ${editor.isActive('underline') ? styles.active : ''}`}
            title="Gạch chân (Ctrl+U)"
          >
            <u>U</u>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`${styles.toolBtn} ${editor.isActive('strike') ? styles.active : ''}`}
            title="Gạch ngang"
          >
            <s>S</s>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={`${styles.toolBtn} ${editor.isActive('highlight') ? styles.active : ''}`}
            title="Highlight"
          >
            🖍️
          </button>
        </div>

        <div className={styles.divider} />

        {/* Headings */}
        <div className={styles.toolGroup}>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`${styles.toolBtn} ${editor.isActive('heading', { level: 1 }) ? styles.active : ''}`}
            title="Heading 1"
          >
            H1
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`${styles.toolBtn} ${editor.isActive('heading', { level: 2 }) ? styles.active : ''}`}
            title="Heading 2"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`${styles.toolBtn} ${editor.isActive('heading', { level: 3 }) ? styles.active : ''}`}
            title="Heading 3"
          >
            H3
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={`${styles.toolBtn} ${editor.isActive('paragraph') ? styles.active : ''}`}
            title="Paragraph"
          >
            ¶
          </button>
        </div>

        <div className={styles.divider} />

        {/* Lists */}
        <div className={styles.toolGroup}>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`${styles.toolBtn} ${editor.isActive('bulletList') ? styles.active : ''}`}
            title="Danh sách"
          >
            •
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`${styles.toolBtn} ${editor.isActive('orderedList') ? styles.active : ''}`}
            title="Danh sách đánh số"
          >
            1.
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`${styles.toolBtn} ${editor.isActive('blockquote') ? styles.active : ''}`}
            title="Trích dẫn"
          >
            ❝
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`${styles.toolBtn} ${editor.isActive('codeBlock') ? styles.active : ''}`}
            title="Code Block"
          >
            {'</>'}
          </button>
        </div>

        <div className={styles.divider} />

        {/* Alignment */}
        <div className={styles.toolGroup}>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`${styles.toolBtn} ${editor.isActive({ textAlign: 'left' }) ? styles.active : ''}`}
            title="Căn trái"
          >
            ⬅
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`${styles.toolBtn} ${editor.isActive({ textAlign: 'center' }) ? styles.active : ''}`}
            title="Căn giữa"
          >
            ⬌
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`${styles.toolBtn} ${editor.isActive({ textAlign: 'right' }) ? styles.active : ''}`}
            title="Căn phải"
          >
            ➡
          </button>
        </div>

        <div className={styles.divider} />

        {/* Insert */}
        <div className={styles.toolGroup}>
          <button
            type="button"
            onClick={setLink}
            className={`${styles.toolBtn} ${editor.isActive('link') ? styles.active : ''}`}
            title="Chèn link"
          >
            🔗
          </button>
          <button
            type="button"
            onClick={addImage}
            className={styles.toolBtn}
            title="Chèn hình ảnh"
          >
            🖼️
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className={styles.toolBtn}
            title="Đường kẻ ngang"
          >
            ―
          </button>
        </div>

        <div className={styles.divider} />

        {/* Undo/Redo */}
        <div className={styles.toolGroup}>
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className={styles.toolBtn}
            title="Hoàn tác (Ctrl+Z)"
          >
            ↩
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className={styles.toolBtn}
            title="Làm lại (Ctrl+Y)"
          >
            ↪
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} className={styles.editorWrapper} />

      {/* Word Count */}
      <div className={styles.footer}>
        <span>{editor.storage.characterCount?.characters?.() || editor.getText().length} ký tự</span>
        <span>{editor.storage.characterCount?.words?.() || editor.getText().split(/\s+/).filter(Boolean).length} từ</span>
      </div>
    </div>
  );
}
