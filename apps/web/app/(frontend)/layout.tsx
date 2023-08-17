import { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@kirin/utils";

import { siteConfig } from "@config/site";
import { KirinProps } from "@types";
import { Providers } from "./providers";

import "@styles";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Kirin",
    "Chat",
    "App",
    "Client",
    "Matrix",
    "Matrix.org",
    "Element",
  ],
  authors: [
    {
      name: "d-one",
      url: "https://d-one.design",
    },
  ],
  creator: "d-one",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function Layout({ lang, children }: KirinProps) {
  return (
    <html className="font-sans" lang={lang} suppressHydrationWarning>
      <body
        className={cn("min-h-screen font-sans antialiased", fontSans.variable)}
      >
        <head />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
