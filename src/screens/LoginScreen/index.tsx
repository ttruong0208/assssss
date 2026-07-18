"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppSelector } from "@/stores";
import { LoginForm } from "./components/LoginForm";
import { ToastService } from "@/services/ToastService";

/**
 * Login Screen Component
 * Main screen component for user authentication
 * Follows the screen structure pattern from AGENTS.md
 */
export const LoginScreen = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const isRegistered = searchParams.get("registered") === "true";

  useEffect(() => {
    if (!isAuthenticated) return;

    ToastService.info("Bạn đã đăng nhập.");
    const redirectUrl = searchParams.get("redirect") || "/affiliate";
    router.replace(redirectUrl);
  }, [isAuthenticated, router, searchParams]);

  if (isAuthenticated) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Đăng nhập
          </h1>
          <p className="text-muted-foreground">
            Chào mừng trở lại! Vui lòng đăng nhập vào tài khoản của bạn.
          </p>
        </div>

        {/* Success Message from Registration */}
        {isRegistered && (
          <div
            className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm"
            role="alert"
          >
            Đăng ký thành công! Vui lòng đăng nhập để tiếp tục.
          </div>
        )}

        {/* Login Form */}
        <LoginForm />
      </div>
    </div>
  );
};

