import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Evan | Fullstack Web Developer & AI Engineer",
  description: "Modern portfolio showcasing high-performance web applications and AI-powered solutions.",
  icons: {
    icon: "/kimse.png",
    apple: "/kimse.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.variable} ${outfit.variable} antialiased`}>
          <div className="fixed inset-0 -z-10 bg-gradient-mesh" />
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
