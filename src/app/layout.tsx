import type { Metadata } from "next";
import { Geist, Fraunces } from "next/font/google";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Cursor from "@/components/ui/Cursor";
import "./globals.css";

const sans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const serif = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: "Tanuja Paunikar — Portfolio",
  description: "Designer & developer portfolio.",
  openGraph: {
    title: "Tanuja Paunikar — Portfolio",
    description: "Designer & developer portfolio.",
    images: [
      {
        url: "/images/og-tanujapaunikar.png",
        width: 1200,
        height: 630,
        alt: "Tanuja Paunikar — Product Designer",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tanuja Paunikar — Portfolio",
    description: "Designer & developer portfolio.",
    images: ["/images/og-tanujapaunikar.png"],
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
        <SmoothScroll>
          <Cursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
