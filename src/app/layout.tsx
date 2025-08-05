import type { Metadata } from "next";
import { Telex } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const telex = Telex({
  weight: '400',
  variable: "--font-telex",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Handcrafted Haven",
  description: "Discover unique handcrafted items and share your own creative works with a community of passionate makers and artisans.",
  keywords: ["handcrafted", "artisan", "marketplace", "crafts", "creative", "handmade"],
  icons: {icon: [{ url: "/favicon.ico" }]},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${telex.variable} font-sans antialiased min-h-screen flex flex-col bg-background-200`}
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
