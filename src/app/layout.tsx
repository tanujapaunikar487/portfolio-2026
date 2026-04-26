import type { Metadata } from "next";
import Cursor from "@/components/ui/Cursor";
import "./globals.css";

const siteUrl = "https://tanujapaunikar.co";
const title = "Tanuja Paunikar — Portfolio";
const description =
  "Open to full-time roles where design owns the outcome. If you're building something ambitious, I'd love to chat.";
const ogImage = {
  url: "/images/og-tanujapaunikar.png?v=4",
  secureUrl: `${siteUrl}/images/og-tanujapaunikar.png?v=4`,
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
        url: "/images/og-tanujapaunikar.png?v=4",
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
      className="h-full antialiased"
      style={
        {
          "--font-sans": "system-ui",
          "--font-serif": "Georgia",
        } as React.CSSProperties
      }
    >
      <body className="flex min-h-full flex-col bg-white text-neutral-900">
        <Cursor />
        {children}
      </body>
    </html>
  );
}
