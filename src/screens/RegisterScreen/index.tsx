"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { RegisterForm } from "./components/RegisterForm";
import { useAppSelector } from "@/stores";
import { ToastService } from "@/services/ToastService";

/**
 * Register Screen Component
 * Main screen component for user registration
 * Follows the screen structure pattern from AGENTS.md
 */
export const RegisterScreen = () => {
  const router = useRouter();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) return;

    ToastService.info("Bạn đã đăng nhập. Không thể tạo tài khoản mới.");
    router.replace("/affiliate");
  }, [isAuthenticated, router]);

  if (isAuthenticated) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Đăng ký
          </h1>
          <p className="text-muted-foreground">
            Tạo tài khoản mới để bắt đầu sử dụng Chainivo
          </p>
        </div>

        {/* Register Form */}
        <RegisterForm />
      </div>
    </div>
  );
};

