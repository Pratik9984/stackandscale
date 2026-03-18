import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// This imports a clean, modern font
const inter = Inter({ subsets: ["latin"] });

// THIS is what Google and WhatsApp read when your site is shared
export const metadata: Metadata = {
  title: "Stack&Scale | Web Development & Digital Marketing",
  description: "We partner with ambitious brands to build blazing-fast websites and digital marketing strategies that turn visitors into loyal customers.",
  keywords: ["Freelance Web Developer", "Next.js Developer", "Digital Marketing", "Brand Identity", "SEO", "Web Design"],
  openGraph: {
    title: "Stack&Scale | Web Development & Digital Marketing",
    description: "We partner with ambitious brands to build blazing-fast websites and digital marketing strategies that turn visitors into loyal customers.",
    url: "https://yourwebsite.com", // You will update this later when live
    siteName: "Stack&Scale",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
