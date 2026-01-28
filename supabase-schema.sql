-- =====================================================
-- XiaoHu.AI - Complete Supabase Database Schema
-- Run this in Supabase Dashboard → SQL Editor
-- =====================================================

-- =====================================================
-- PART 1: USER PROFILES TABLE
-- =====================================================

-- Create profiles table (extends Supabase Auth users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  avatar_url TEXT,
  is_vip BOOLEAN DEFAULT false,
  vip_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" 
  ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" 
  ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON profiles FOR UPDATE USING (auth.uid() = id);

-- Function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- PART 2: COURSES TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  instructor TEXT NOT NULL,
  thumbnail TEXT DEFAULT '/images/courses/default.jpg',
  duration TEXT,
  lesson_count INTEGER DEFAULT 10,
  category TEXT NOT NULL,
  description TEXT,
  is_vip BOOLEAN DEFAULT false,
  price INTEGER DEFAULT 0,
  students INTEGER DEFAULT 0,
  rating DECIMAL(2,1) DEFAULT 4.5,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Courses policies
CREATE POLICY "Courses are viewable by everyone" 
  ON courses FOR SELECT USING (true);

CREATE POLICY "Anyone can insert courses" 
  ON courses FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update courses" 
  ON courses FOR UPDATE USING (true);

CREATE POLICY "Anyone can delete courses" 
  ON courses FOR DELETE USING (true);

-- =====================================================
-- PART 3: ARTICLES TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  thumbnail TEXT DEFAULT '/images/articles/default.jpg',
  author TEXT NOT NULL,
  author_id UUID REFERENCES profiles(id),
  date DATE DEFAULT CURRENT_DATE,
  category TEXT NOT NULL,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  is_vip BOOLEAN DEFAULT false,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Articles policies
CREATE POLICY "Articles are viewable by everyone" 
  ON articles FOR SELECT USING (true);

CREATE POLICY "Anyone can insert articles" 
  ON articles FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update articles" 
  ON articles FOR UPDATE USING (true);

CREATE POLICY "Anyone can delete articles" 
  ON articles FOR DELETE USING (true);

-- =====================================================
-- PART 4: TOOLS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS tools (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  logo TEXT DEFAULT '/images/tools/default.png',
  category TEXT NOT NULL,
  url TEXT NOT NULL,
  is_featured BOOLEAN DEFAULT false,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;

-- Tools policies
CREATE POLICY "Tools are viewable by everyone" 
  ON tools FOR SELECT USING (true);

CREATE POLICY "Anyone can insert tools" 
  ON tools FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update tools" 
  ON tools FOR UPDATE USING (true);

CREATE POLICY "Anyone can delete tools" 
  ON tools FOR DELETE USING (true);

-- =====================================================
-- PART 5: USER ENROLLMENTS (Optional - for tracking)
-- =====================================================

CREATE TABLE IF NOT EXISTS enrollments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  progress INTEGER DEFAULT 0,
  UNIQUE(user_id, course_id)
);

-- Enable RLS
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

-- Enrollments policies
CREATE POLICY "Users can view their own enrollments" 
  ON enrollments FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own enrollments" 
  ON enrollments FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own enrollments" 
  ON enrollments FOR UPDATE USING (auth.uid() = user_id);

-- =====================================================
-- PART 6: DEMO DATA - COURSES
-- =====================================================

INSERT INTO courses (title, instructor, duration, lesson_count, category, description, is_vip, students, rating, price)
VALUES 
  (
    'Keling AI: Từ Cơ Bản Đến Chuyên Gia', 
    'Xiaohu', 
    '6.5 giờ', 
    29, 
    'video-ai', 
    'Khóa học toàn diện về Keling AI - công cụ tạo video AI hàng đầu Trung Quốc. Bạn sẽ học từ các chức năng cơ bản như tạo video từ hình ảnh, điều khiển camera nâng cao, đến kỹ thuật đồng bộ môi (lip-sync) chuyên nghiệp. Khóa học bao gồm 29 bài học video chi tiết, file project mẫu và cộng đồng hỗ trợ.', 
    true, 
    2840, 
    4.9,
    0
  ),
  (
    'ChatGPT Mastery: Prompt Engineering Pro', 
    'AI Master', 
    '8 giờ', 
    35, 
    'prompt-engineering', 
    'Học cách viết prompt chuyên nghiệp để khai thác tối đa sức mạnh của ChatGPT. Từ cơ bản đến các kỹ thuật nâng cao như chain-of-thought, few-shot learning và role-playing.', 
    true, 
    5200, 
    4.8,
    0
  ),
  (
    'Midjourney: Tạo Hình Ảnh AI Đỉnh Cao', 
    'Creative Studio', 
    '5 giờ', 
    22, 
    'image-creation', 
    'Làm chủ Midjourney từ cơ bản đến nâng cao với các kỹ thuật prompt chuyên sâu, style references, image blending và consistent character creation.', 
    false, 
    3100, 
    4.7,
    299000
  ),
  (
    'Stable Diffusion: Local AI Art Generator', 
    'Tech Guru', 
    '7 giờ', 
    28, 
    'image-tools', 
    'Cài đặt và sử dụng Stable Diffusion trên máy tính cá nhân. Học về models, LoRA, ControlNet, inpainting và các kỹ thuật nâng cao để tạo artwork chất lượng cao.', 
    true, 
    1800, 
    4.6,
    0
  ),
  (
    'GPT-4 Vision & Multimodal AI Applications', 
    'Xiaohu', 
    '4 giờ', 
    18, 
    'chatgpt', 
    'Khám phá khả năng xử lý hình ảnh của GPT-4V và các ứng dụng multimodal AI trong thực tế. Học cách xây dựng apps với vision capabilities.', 
    true, 
    2200, 
    4.8,
    0
  ),
  (
    'AI Automation với Make & Zapier', 
    'Automation Pro', 
    '6 giờ', 
    24, 
    'ai-basics', 
    'Tự động hóa công việc với AI bằng Make và Zapier. Xây dựng các workflow AI không cần code, tích hợp với ChatGPT, Claude và các AI tools khác.', 
    false, 
    1500, 
    4.5,
    199000
  );

-- =====================================================
-- PART 7: DEMO DATA - ARTICLES
-- =====================================================

INSERT INTO articles (title, excerpt, author, date, category, views, likes, comments, is_vip, tags)
VALUES
  (
    'OpenAI Ra Mắt GPT-5: Những Điều Cần Biết', 
    'OpenAI vừa công bố GPT-5 với khả năng suy luận nâng cao và xử lý đa phương thức mạnh mẽ hơn bao giờ hết. Mô hình mới có thể xử lý video, âm thanh, và tương tác real-time với độ trễ cực thấp.', 
    'Xiaohu', 
    '2026-01-27', 
    'news', 
    15680, 
    892, 
    156, 
    false, 
    ARRAY['OpenAI', 'GPT-5', 'LLM', 'Breaking News']
  ),
  (
    'Cách Kiếm Tiền Với AI Video Generation', 
    'Hướng dẫn chi tiết cách sử dụng các công cụ AI như Keling, Runway, Pika để tạo video và xây dựng thu nhập thụ động. Bao gồm các chiến lược monetization hiệu quả cho YouTube, TikTok và freelance.', 
    'Money Maker', 
    '2026-01-26', 
    'monetization', 
    8900, 
    567, 
    89, 
    true, 
    ARRAY['Kiếm tiền', 'Video AI', 'Business', 'Monetization']
  ),
  (
    'So Sánh Chi Tiết: Claude 4 vs GPT-5', 
    'Phân tích chuyên sâu về hai mô hình AI mạnh mẽ nhất hiện nay. Đánh giá về khả năng suy luận, coding, creative writing, vision và nhiều tiêu chí khác.', 
    'Tech Analyst', 
    '2026-01-25', 
    'deep-dive', 
    12400, 
    734, 
    198, 
    true, 
    ARRAY['Claude', 'GPT-5', 'So sánh', 'LLM', 'Analysis']
  ),
  (
    'Google Gemini 3.0: Tính Năng Mới Đột Phá', 
    'Google vừa ra mắt Gemini 3.0 với khả năng xử lý context lên đến 2 triệu tokens và tích hợp sâu với Google Workspace. Đây là bước tiến lớn trong cuộc đua AI.', 
    'AI Reporter', 
    '2026-01-24', 
    'news', 
    9800, 
    456, 
    87, 
    false, 
    ARRAY['Google', 'Gemini', 'AI', 'Tech News']
  ),
  (
    '50 Prompts ChatGPT Cho Content Creator', 
    'Bộ sưu tập các prompt đã được test và tối ưu cho việc sáng tạo nội dung. Bao gồm prompts cho blog, social media, video script, email marketing và nhiều hơn nữa.', 
    'Prompt Master', 
    '2026-01-23', 
    'prompt-library', 
    7600, 
    543, 
    67, 
    true, 
    ARRAY['Prompts', 'Content', 'Marketing', 'ChatGPT']
  ),
  (
    'Hướng Dẫn Sử Dụng Suno AI Tạo Nhạc', 
    'Từ zero đến hero với Suno AI - công cụ tạo nhạc AI hot nhất hiện nay. Học cách viết lyrics, chọn style và tạo ra những bản nhạc viral.', 
    'Music AI', 
    '2026-01-22', 
    'tutorial', 
    6200, 
    421, 
    53, 
    false, 
    ARRAY['Suno', 'Music AI', 'Tutorial', 'Creative']
  );

-- =====================================================
-- PART 8: DEMO DATA - TOOLS
-- =====================================================

INSERT INTO tools (name, description, category, url, is_featured, tags)
VALUES
  (
    'Keling AI', 
    'Công cụ tạo video AI hàng đầu từ Kuaishou với khả năng điều khiển camera nâng cao, lip-sync chính xác, và chất lượng video 1080p. Hỗ trợ text-to-video và image-to-video.', 
    'video', 
    'https://keling.ai', 
    true, 
    ARRAY['Video', 'Lip-sync', 'Camera Control', 'Text-to-Video']
  ),
  (
    'ChatGPT', 
    'AI chatbot mạnh mẽ nhất từ OpenAI với khả năng đối thoại tự nhiên, viết code, phân tích dữ liệu và xử lý đa phương thức với GPT-4 Vision.', 
    'text', 
    'https://chat.openai.com', 
    true, 
    ARRAY['Chatbot', 'Writing', 'Coding', 'Analysis']
  ),
  (
    'Midjourney', 
    'Công cụ tạo hình ảnh AI với chất lượng nghệ thuật cao, phong cách đa dạng từ realistic đến artistic. Hỗ trợ style references và image blending.', 
    'image', 
    'https://midjourney.com', 
    true, 
    ARRAY['Image', 'Art', 'Design', 'Creative']
  ),
  (
    'ElevenLabs', 
    'Nền tảng text-to-speech AI với giọng nói tự nhiên nhất. Hỗ trợ voice cloning, multiple languages, real-time streaming và emotion control.', 
    'audio', 
    'https://elevenlabs.io', 
    true, 
    ARRAY['Voice', 'TTS', 'Audio', 'Voice Clone']
  ),
  (
    'Notion AI', 
    'Trợ lý AI tích hợp trong Notion giúp viết, tóm tắt, brainstorm và tổ chức thông tin hiệu quả hơn. Perfect cho productivity và knowledge management.', 
    'efficiency', 
    'https://notion.so', 
    false, 
    ARRAY['Productivity', 'Writing', 'Notes', 'Organization']
  ),
  (
    'Runway', 
    'Studio sáng tạo AI đa năng với Gen-3 video generation, image editing, motion tracking và nhiều công cụ creative khác cho video production.', 
    'video', 
    'https://runway.ml', 
    true, 
    ARRAY['Video', 'Creative', 'Editing', 'Gen-3']
  ),
  (
    'Claude', 
    'AI assistant từ Anthropic với khả năng phân tích document dài, coding xuất sắc và an toàn hơn. Context window lên đến 200K tokens.', 
    'text', 
    'https://claude.ai', 
    true, 
    ARRAY['Chatbot', 'Analysis', 'Coding', 'Safe AI']
  ),
  (
    'Suno', 
    'Tạo nhạc AI với chất lượng cao từ text prompts. Hỗ trợ nhiều thể loại nhạc, tạo lyrics tự động và vocal generation.', 
    'audio', 
    'https://suno.ai', 
    true, 
    ARRAY['Music', 'Audio', 'Creative', 'Lyrics']
  );

-- =====================================================
-- PART 9: INDEXES FOR PERFORMANCE
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_courses_category ON courses(category);
CREATE INDEX IF NOT EXISTS idx_courses_is_vip ON courses(is_vip);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_is_vip ON articles(is_vip);
CREATE INDEX IF NOT EXISTS idx_articles_date ON articles(date DESC);
CREATE INDEX IF NOT EXISTS idx_tools_category ON tools(category);
CREATE INDEX IF NOT EXISTS idx_tools_is_featured ON tools(is_featured);
CREATE INDEX IF NOT EXISTS idx_enrollments_user ON enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course ON enrollments(course_id);

-- =====================================================
-- DONE! Your database is ready.
-- =====================================================
