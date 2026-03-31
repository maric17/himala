import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.scss";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Himala Every Day - A small miracle, delivered every morning.",
  description:
    "Welcome to Jesus.net! Access mga articles, resources, at tools to deepen your faith and at mas makilala si Jesus—ang Kanyang mga teachings and love.",
  openGraph: {
    title: "Himala Every Day - A small miracle, delivered every morning.",
    description:
      "Welcome to Jesus.net! Access mga articles, resources, at tools to deepen your faith and at mas makilala si Jesus—ang Kanyang mga teachings and love.",
    url: "https://himalaeveryday.ph/",
    siteName: "Himala Every Day",
    locale: "en_PH",
    type: "website",
  },
  icons: {
    icon: "/apple-touch-icon.png",
    apple: "/apple-touch-icon.png",
  },
};

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased text-brand-brown bg-background-cream selection:bg-brand-gold/20">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-C5NXD7WFKS"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-C5NXD7WFKS');
          `}
        </Script>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}


