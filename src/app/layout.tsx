import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import AnimationProvider from "@/components/AnimationProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rayyan-portfolio.vercel.app"),
  title: "Rayyan Mardhatillah | Network & Web Engineer",
  description:
    "Portfolio Rayyan Mardhatillah — Mahasiswa Teknik Komputer Universitas Syiah Kuala, Network & Web Engineer. Proyek: LP3 Putra XVII Sistem Absensi QR.",
  keywords: [
    "Rayyan Mardhatillah",
    "Portfolio",
    "Network Engineer",
    "Web Developer",
    "Teknik Komputer",
    "Universitas Syiah Kuala",
    "Banda Aceh",
    "React",
    "Node.js",
    "QR Absensi",
  ],
  authors: [
    { name: "Rayyan Mardhatillah", url: "https://github.com/rayyan210305" },
  ],
  creator: "Rayyan Mardhatillah",
  publisher: "Rayyan Mardhatillah",
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: "Rayyan Mardhatillah",
    title: "Rayyan Mardhatillah | Network & Web Engineer",
    description:
      "Portfolio Rayyan Mardhatillah — Mahasiswa Teknik Komputer Universitas Syiah Kuala.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rayyan Mardhatillah | Network & Web Engineer",
    description:
      "Portfolio Rayyan Mardhatillah — Mahasiswa Teknik Komputer Universitas Syiah Kuala.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <AnimationProvider>{children}</AnimationProvider>
      </body>
    </html>
  );
}
