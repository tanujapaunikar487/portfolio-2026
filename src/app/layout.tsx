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
