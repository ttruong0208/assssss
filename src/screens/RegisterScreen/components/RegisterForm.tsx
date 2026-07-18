"use client";

import Link from "next/link";
import { Mail, Lock, User, Phone, Gift } from "lucide-react";
import { TextInput } from "@/components/inputs/TextInput";
import { PasswordInput } from "@/components/inputs/PasswordInput";
import { Button } from "@/components/buttons/Button";
import { useRegister } from "../hooks/useRegister";

/**
 * Register Form Component
 * Displays registration form with all required and optional fields
 */
export const RegisterForm = () => {
  const { formState, errors, isLoading, handleSubmit, updateField } =
    useRegister();

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-5">
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
          showStrengthMeter={true}
          required
          disabled={isLoading}
          autoComplete="new-password"
        />

        {/* Confirm Password Input */}
        <PasswordInput
          label="Xác nhận mật khẩu"
          placeholder="Nhập lại mật khẩu"
          value={formState.confirmPassword}
          onChange={(e) => updateField("confirmPassword", e.target.value)}
          error={errors.confirmPassword}
          leftIcon={<Lock className="h-4 w-4" />}
          required
          disabled={isLoading}
          autoComplete="new-password"
        />

        {/* Name Input */}
        <TextInput
          label="Họ và tên"
          type="text"
          placeholder="Nhập họ và tên của bạn"
          value={formState.name}
          onChange={(e) => updateField("name", e.target.value)}
          error={errors.name}
          leftIcon={<User className="h-4 w-4" />}
          disabled={isLoading}
          autoComplete="name"
        />

        {/* Phone Input */}
        <TextInput
          label="Số điện thoại"
          type="tel"
          placeholder="Nhập số điện thoại (tùy chọn)"
          value={formState.mobile}
          onChange={(e) => updateField("mobile", e.target.value)}
          error={errors.mobile}
          leftIcon={<Phone className="h-4 w-4" />}
          disabled={isLoading}
          autoComplete="tel"
        />

        {/* Parent Ref Code Input */}
        <TextInput
          label="Mã giới thiệu"
          type="text"
          placeholder="Nhập mã giới thiệu (nếu có)"
          value={formState.parentRefCode}
          onChange={(e) => updateField("parentRefCode", e.target.value)}
          error={errors.parentRefCode}
          leftIcon={<Gift className="h-4 w-4" />}
          disabled={isLoading}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          loadingText="Đang đăng ký..."
          disabled={isLoading}
          className="mt-8"
        >
          Đăng ký
        </Button>

        {/* Login Link */}
        <div className="text-center text-sm text-muted-foreground">
          Đã có tài khoản?{" "}
          <Link
            href="/auth/login"
            className="text-primary hover:underline font-medium"
          >
            Đăng nhập ngay
          </Link>
        </div>
      </form>
    </div>
  );
};

