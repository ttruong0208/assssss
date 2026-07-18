"use client";

import Link from "next/link";
import { Mail, Lock } from "lucide-react";
import { TextInput } from "@/components/inputs/TextInput";
import { PasswordInput } from "@/components/inputs/PasswordInput";
import { Button } from "@/components/buttons/Button";
import { useLogin } from "../hooks/useLogin";

/**
 * Login Form Component
 * Displays login form with email and password fields
 */
export const LoginForm = () => {
  const { formState, errors, isLoading, handleSubmit, updateField } = useLogin();

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Error Display */}
        {errors.general && (
          <div
            className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm"
            role="alert"
          >
            {errors.general}
          </div>
        )}

        {/* Email Input */}
        <TextInput
          label="Email"
          type="email"
          placeholder="Nhập email của bạn"
          value={formState.email}
          onChange={(e) => updateField("email", e.target.value)}
          error={errors.email}
          leftIcon={<Mail className="h-4 w-4" />}
          required
          disabled={isLoading}
          autoComplete="email"
        />

        {/* Password Input */}
        <PasswordInput
          label="Mật khẩu"
          placeholder="Nhập mật khẩu của bạn"
          value={formState.password}
          onChange={(e) => updateField("password", e.target.value)}
          error={errors.password}
          leftIcon={<Lock className="h-4 w-4" />}
          required
          disabled={isLoading}
          autoComplete="current-password"
        />

        {/* Forgot Password Link */}
        <div className="flex items-center justify-end">
          <Link
            href="/auth/forgot-password"
            className="text-sm text-primary hover:underline"
          >
            Quên mật khẩu?
          </Link>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          loadingText="Đang đăng nhập..."
          disabled={isLoading}
          className="mt-8"
        >
          Đăng nhập
        </Button>

        {/* Register Link */}
        <div className="text-center text-sm text-muted-foreground">
          Chưa có tài khoản?{" "}
          <Link
            href="/auth/register"
            className="text-primary hover:underline font-medium"
          >
            Đăng ký ngay
          </Link>
        </div>
      </form>
    </div>
  );
};

