import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Paramjeet Pradhan",
  description:
    "Building intelligent systems at the intersection of LLMs and scalable infrastructure.",
  openGraph: {
    title: "Paramjeet Pradhan",
    description:
      "Building intelligent systems at the intersection of LLMs and scalable infrastructure.",
    url: "https://paramjeet.dev",
    siteName: "Paramjeet Pradhan",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      style={{ background: "var(--bg)", color: "var(--fg)" }}
    >
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Nav />
        <main
          style={{
            maxWidth: 680,
            width: "100%",
            margin: "0 auto",
            padding: "2rem 1.25rem 6rem",
            flex: 1,
          }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
