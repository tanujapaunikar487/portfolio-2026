import type { Metadata } from "next";
import { Geist, Fraunces } from "next/font/google";
import Cursor from "@/components/ui/Cursor";
import "./globals.css";

const sans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const serif = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  axes: ["opsz"],
});

const siteUrl = "https://tanujapaunikar.co";
const title = "Tanuja Paunikar — Portfolio";
const description =
  "Product Designer shaping interfaces that make complex things feel simple.";
const ogImage = {
  url: "/images/og-tanujapaunikar.png?v=2",
  secureUrl: `${siteUrl}/images/og-tanujapaunikar.png?v=2`,
  width: 1200,
  height: 630,
  alt: "Tanuja Paunikar — Product Designer",
  type: "image/png",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Tanuja Paunikar",
    locale: "en_US",
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [
      {
        url: "/images/og-tanujapaunikar.png?v=2",
        alt: "Tanuja Paunikar — Product Designer",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-neutral-900">
        <Cursor />
        {children}
      </body>
    </html>
  );
}
