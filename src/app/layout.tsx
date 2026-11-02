import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kinetic Grid | Run the Future Forward",
  description:
    "A fictional energy concept where movement becomes momentum, and momentum becomes power for the city.",
};

export const viewport: Viewport = {
  themeColor: "#04070d",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${montserrat.variable} antialiased`}>
      <body className="min-h-dvh overflow-x-clip">{children}</body>
    </html>
  );
}
