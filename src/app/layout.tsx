import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vakit - Namaz Vakitleri",
  description: "İstanbul namaz vakitleri, ezan saatleri ve kıble yönü. Güncel namaz vakitleri ile İstanbul'un 39 ilçesi için hassas vakit bilgileri.",
  keywords: "namaz vakitleri istanbul, ezan vakti, prayer times istanbul, istanbul namaz saatleri, sabah öğle ikindi akşam yatsı",
  authors: [{ name: "Vakit" }],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#3a8f60" },
    { media: "(prefers-color-scheme: dark)", color: "#2d734c" }
  ],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Vakit",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Vakit - Namaz Vakitleri",
    description: "İstanbul namaz vakitleri, ezan saatleri ve kıble yönü",
    url: "https://vakit.istanbul",
    siteName: "Vakit",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vakit - Namaz Vakitleri",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vakit - Namaz Vakitleri",
    description: "İstanbul namaz vakitleri, ezan saatleri ve kıble yönü",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth">
      <head>
        <meta name="google-adsense-account" content="ca-pub-7529069132633488" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7529069132633488"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script id="gtag-base" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Vakit",
              url: "https://vakit.istanbul",
              description: "İstanbul namaz vakitleri, ezan saatleri ve kıble yönü",
              inLanguage: "tr-TR",
              author: {
                "@type": "Organization",
                name: "Vakit"
              }
            }),
          }}
        />
      </head>
      <body
        className={`${inter.className} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300`}
      >
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">
            {children}
          </main>
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}