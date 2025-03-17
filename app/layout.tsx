import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Providers from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SecureBlog - Stay Secure in the Digital World",
  description:
    "SecureBlog provides expert insights, the latest news, and practical advice on cybersecurity to help protect your digital life. Learn about threat intelligence, privacy guides, and security alerts.",
  keywords: [
    "cybersecurity",
    "threat intelligence",
    "privacy protection",
    "security alerts",
    "online safety",
  ],
  twitter: {
    card: "summary_large_image",
    title: "SecureBlog - Stay Secure in the Digital World",
    description:
      "Expert insights and practical advice on cybersecurity to protect your digital life.",
    images: ["/icon0.svg"],
    creator: "@secureblog",
  },
  openGraph: {
    title: "SecureBlog - Stay Secure in the Digital World",
    description:
      "SecureBlog provides expert insights, the latest news, and practical advice on cybersecurity to help protect your digital life. Learn about threat intelligence, privacy guides, and security alerts.",
    url: `${process.env.NEXT_PUBLIC_URL!}`,
    siteName: "SecureBlog",
    images: [
      {
        url: "/web-app-manifest-512x512.png", // Must be an absolute URL
        width: 512,
        height: 512,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon1.png",
    shortcut: "/icon1.png",
    apple: "/apple-icon.png",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_URL!}`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
