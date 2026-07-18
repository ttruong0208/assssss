"use client";

import { usePathname } from "next/navigation";
import { Header } from "./header";
import { Footer } from "./footer";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

/**
 * LayoutWrapper Component
 * Điều kiện render Header và Footer dựa trên pathname
 * Không hiển thị Header cho các trang auth nhưng vẫn hiển thị Footer
 */
export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith("/auth");

  return (
    <div className="flex flex-col min-h-screen">
      {!isAuthPage && <Header />}
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
