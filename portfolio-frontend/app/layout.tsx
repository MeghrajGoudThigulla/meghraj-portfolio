import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import MetricsTracker from "@/components/MetricsTracker";
import SkipLink from "@/components/SkipLink";
import CursorSparks from "@/components/CursorSparks";
import CustomCursor from "@/components/CustomCursor";
import { defaultMetadata, personJsonLd } from "./seo";
import { ToastProvider } from "@/components/Toast";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'dark';
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd),
          }}
        />
      </head>
      <body
        className={`${dmSans.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} bg-brand-bg text-brand-charcoal antialiased font-sans`}
      >
        <ToastProvider>
          <SkipLink />
          <MetricsTracker />
          <CursorSparks />
          <CustomCursor />
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
