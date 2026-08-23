import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import AnimationProvider from "@/components/AnimationProvider";
import { LanguageProvider } from "@/lib/LanguageContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rayyan-portfolio-nu.vercel.app"),
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

export const viewport: Viewport = {
  themeColor: "#0A0A0F",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <LanguageProvider>
          <AnimationProvider>{children}</AnimationProvider>
        </LanguageProvider>
      </body>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Rayyan Mardhatillah",
            jobTitle: "Network & Web Engineer",
            url: "https://rayyan-portfolio-nu.vercel.app",
            image: "https://rayyan-portfolio-nu.vercel.app/opengraph-image",
            sameAs: [
              "https://github.com/rayyan210305",
              "https://www.linkedin.com/in/rayyan-mardhatillah-b73b8a42a/",
              "https://www.instagram.com/rayyanmardhatillah/",
            ],
          }),
        }}
      />
    </html>
  );
}
