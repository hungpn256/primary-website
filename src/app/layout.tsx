import { SiteHeader } from "@/components/site-header";
import { Inter } from "next/font/google";
import type React from "react";
import { Toaster } from "sonner";
import { ThemeProvider } from "./context/theme/theme-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Công Cụ Tối Ưu Hình Ảnh",
  description:
    "Tối ưu hóa hình ảnh của bạn một cách nhanh chóng và dễ dàng. Giảm kích thước file mà không làm giảm chất lượng hình ảnh.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <div className="flex-1">{children}</div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
