import type { Metadata } from "next";
import { Telex, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const telex = Telex({
  weight: '400',
  variable: "--font-telex",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Handcrafted Haven",
  description: "Discover unique handcrafted items and share your own creative works with a community of passionate makers and artisans.",
  keywords: ["handcrafted", "artisan", "marketplace", "crafts", "creative", "handmade"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${telex.variable} ${geistMono.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
