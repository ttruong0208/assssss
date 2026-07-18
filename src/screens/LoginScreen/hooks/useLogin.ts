"use client";

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/stores";
import {
  setLoading,
  setLoginSuccess,
  setError,
  clearError,
} from "@/stores";
import { AuthService, LoginRequest } from "@/api/services/authService";
import { LocalStorageService } from "@/services/LocalStorageService";
import { ToastService } from "@/services/ToastService";
import type { AuthUser } from "@/stores/authSlice";

interface LoginFormState {
  email: string;
  password: string;
}

interface LoginErrors {
  email?: string;
  password?: string;
  general?: string;
}

/**
 * Custom hook for handling login logic
 * Manages form state, validation, API calls, and Redux store updates
 */
export const useLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const [formState, setFormState] = useState<LoginFormState>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<LoginErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Validate email format
   */
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Validate form fields
   */
  const validateForm = (): boolean => {
    const newErrors: LoginErrors = {};

    // Validate email
    if (!formState.email.trim()) {
      newErrors.email = "Email là bắt buộc";
    } else if (!validateEmail(formState.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    // Validate password
    if (!formState.password) {
      newErrors.password = "Mật khẩu là bắt buộc";
    } else if (formState.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Map API user response to AuthUser type
   */
  const mapUserToAuthUser = (user: any): AuthUser => {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      avatarUrl: user.avatar,
      role: user.role || "user",
      isActive: user.status === "active",
      refCode: user.refCode,
      points: user.points,
      rank: user.rank,
      rankId: typeof user.rank === "string" ? user.rank : user.rank?.id,
    };
  };

  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Clear previous errors
      setErrors({});
      dispatch(clearError());

      // Validate form
      if (!validateForm()) {
        return;
      }

      setIsLoading(true);
      dispatch(setLoading(true));

      try {
        const emailInput = formState.email.trim();
        const tryCredentialsPayload: LoginRequest = {
          credentials: emailInput,
          password: formState.password,
        };
        const tryEmailPayload: LoginRequest = {
          email: emailInput,
          password: formState.password,
        };

        // Fallback để tương thích cả 2 kiểu contract BE:
        // 1) { credentials, password } và 2) { email, password }.
        let response = await AuthService.login(tryCredentialsPayload);
        if (!response.success) {
          response = await AuthService.login(tryEmailPayload);
        }

        if (response.success && response.data) {
          const { user: apiUser, accessToken, refreshToken } = response.data;

          // Map API user to AuthUser
          const authUser = mapUserToAuthUser(apiUser);

          // Save tokens to localStorage
          LocalStorageService.setToken(accessToken);
          if (refreshToken) {
            LocalStorageService.setRefreshToken(refreshToken);
          }

          // Save user info to localStorage
          LocalStorageService.setUserInfo({
            id: authUser.id,
            email: authUser.email,
            collection: "users",
          });

          // Dispatch success action to Redux store
          dispatch(setLoginSuccess({ user: authUser, token: accessToken }));

          // Show success toast
          ToastService.success("Đăng nhập thành công!");

          // Redirect to home or redirect URL
          const redirectUrl = searchParams.get("redirect") || "/";
          router.push(redirectUrl);
        } else {
          // Handle API error
          const errorMessage =
            response.error || response.message || "Đăng nhập thất bại";
          setErrors({ general: errorMessage });
          dispatch(setError(errorMessage));
          ToastService.error(errorMessage);
        }
      } catch (error: any) {
        // Handle network or unexpected errors
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "Đã xảy ra lỗi khi đăng nhập";
        setErrors({ general: errorMessage });
        dispatch(setError(errorMessage));
        ToastService.apiError(error, "Đăng nhập thất bại");
      } finally {
        setIsLoading(false);
        dispatch(setLoading(false));
      }
    },
    [formState, dispatch, router, searchParams]
  );

  /**
   * Update form field
   */
  const updateField = useCallback(
    (field: keyof LoginFormState, value: string) => {
      setFormState((prev) => ({ ...prev, [field]: value }));

      // Clear error for this field when user starts typing
      if (errors[field]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }

      // Clear general error
      if (errors.general) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.general;
          return newErrors;
        });
        dispatch(clearError());
      }
    },
    [errors, dispatch]
  );

  return {
    formState,
    errors,
    isLoading,
    handleSubmit,
    updateField,
  };
};

