import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { DataProvider } from "@/context/DataContext";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "XiaoHu.AI - Nền Tảng Học Tập AI Hàng Đầu",
  description: "Khám phá các khóa học AI chất lượng cao, tin tức AI mới nhất, và công cụ AI hàng đầu thế giới. Học AI từ cơ bản đến chuyên gia.",
  keywords: ["AI", "Machine Learning", "Khóa học AI", "GPT", "Prompt Engineering", "Video AI"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>
          <DataProvider>
            <Header />
            <main style={{ minHeight: 'calc(100vh - var(--header-height) - 200px)' }}>
              {children}
            </main>
            <Footer />
          </DataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

