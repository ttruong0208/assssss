import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { Toaster } from "@/components/ui/sonner";
import { LayoutWrapper } from "@/components/layout/LayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sàn thương mại điện tử Chainivo",
  description: "Sàn thương mại điện tử Chainivo",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'light') {
                  document.documentElement.classList.remove('dark')
                  document.documentElement.classList.add('light')
                } else {
                  document.documentElement.classList.remove('light')
                  document.documentElement.classList.add('dark')
                }
              } catch (_) {
                document.documentElement.classList.remove('light')
                document.documentElement.classList.add('dark')
              }
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {/* <TokenRefreshProvider> */}
          <LayoutWrapper>{children}</LayoutWrapper>
          <Toaster position="top-right" expand={false} richColors />
          {/* </TokenRefreshProvider> */}
        </AuthProvider>
      </body>
    </html>
  );
}
