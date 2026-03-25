import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
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
  title: "Himala Everyday - A small miracle, delivered every morning.",
  description:
    "Himala Everyday is a free daily message - part reflection, part wisdom, part pep talk - that arrives in your inbox every morning.",
  openGraph: {
    title: "Himala Everyday - A small miracle, delivered every morning.",
    description:
      "Himala Everyday is a free daily message - part reflection, part wisdom, part pep talk - that arrives in your inbox every morning.",
    url: "https://himala.everyday",
    siteName: "Himala Everyday",
    locale: "en_PH",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
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
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}


