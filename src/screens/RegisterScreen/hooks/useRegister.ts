"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/stores";
import { setLoading, setError, clearError, setLoginSuccess } from "@/stores";
import {
  AuthService,
  RegisterRequest,
  LoginRequest,
} from "@/api/services/authService";
import { ToastService } from "@/services/ToastService";
import { LocalStorageService } from "@/services/LocalStorageService";
import type { AuthUser } from "@/stores/authSlice";

interface RegisterFormState {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  mobile: string;
  parentRefCode: string;
}

interface RegisterErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  name?: string;
  mobile?: string;
  parentRefCode?: string;
  general?: string;
}

/**
 * Custom hook for handling registration logic
 * Manages form state, validation, API calls, and navigation
 */
export const useRegister = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const [formState, setFormState] = useState<RegisterFormState>({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    mobile: "",
    parentRefCode: "",
  });

  const [errors, setErrors] = useState<RegisterErrors>({});
  const [isLoading, setIsLoading] = useState(false);

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

  const autoLoginAfterRegister = async (email: string, password: string) => {
    const tryCredentialsPayload: LoginRequest = {
      credentials: email,
      password,
    };
    const tryEmailPayload: LoginRequest = {
      email,
      password,
    };

    let loginResponse = await AuthService.login(tryCredentialsPayload);
    if (!loginResponse.success) {
      loginResponse = await AuthService.login(tryEmailPayload);
    }

    if (!loginResponse.success || !loginResponse.data) {
      return false;
    }

    const { user: apiUser, accessToken, refreshToken } = loginResponse.data;
    const authUser = mapUserToAuthUser(apiUser);

    LocalStorageService.setToken(accessToken);
    if (refreshToken) {
      LocalStorageService.setRefreshToken(refreshToken);
    }
    LocalStorageService.setUserInfo({
      id: authUser.id,
      email: authUser.email,
      collection: "users",
    });

    dispatch(setLoginSuccess({ user: authUser, token: accessToken }));
    return true;
  };

  const extractApiErrorMessage = (error: any): string => {
    const data = error?.response?.data;

    if (typeof data?.message === "string" && data.message.trim()) {
      return data.message;
    }

    if (Array.isArray(data?.errors) && data.errors.length > 0) {
      const firstError = data.errors[0];
      if (typeof firstError?.message === "string" && firstError.message.trim()) {
        return firstError.message;
      }
      if (
        Array.isArray(firstError?.messages) &&
        firstError.messages.length > 0 &&
        typeof firstError.messages[0]?.message === "string"
      ) {
        return firstError.messages[0].message;
      }
    }

    if (typeof data?.error === "string" && data.error.trim()) {
      return data.error;
    }

    return error?.message || "Đã xảy ra lỗi khi đăng ký";
  };

  useEffect(() => {
    // Affiliate link format: /auth/register?ref=<refCode>
    // Also support direct parentRefCode for compatibility.
    const refFromUrl =
      searchParams.get("ref")?.trim() || searchParams.get("parentRefCode")?.trim() || "";

    if (refFromUrl) {
      setFormState((prev) => {
        if (prev.parentRefCode === refFromUrl) return prev;
        return { ...prev, parentRefCode: refFromUrl };
      });
    }
  }, [searchParams]);

  /**
   * Validate email format
   */
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Validate phone format (Vietnamese format)
   */
  const validatePhone = (phone: string): boolean => {
    if (!phone) return true; // Phone is optional
    const phoneRegex = /^[0-9]{10,11}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ""));
  };

  /**
   * Validate password strength
   */
  const validatePasswordStrength = (password: string): {
    isValid: boolean;
    error?: string;
  } => {
    if (password.length < 8) {
      return {
        isValid: false,
        error: "Mật khẩu phải có ít nhất 8 ký tự",
      };
    }

    if (!/[a-z]/.test(password)) {
      return {
        isValid: false,
        error: "Mật khẩu phải có ít nhất một chữ thường",
      };
    }

    if (!/[A-Z]/.test(password)) {
      return {
        isValid: false,
        error: "Mật khẩu phải có ít nhất một chữ hoa",
      };
    }

    if (!/\d/.test(password)) {
      return {
        isValid: false,
        error: "Mật khẩu phải có ít nhất một số",
      };
    }

    return { isValid: true };
  };

  /**
   * Validate form fields
   */
  const validateForm = (): boolean => {
    const newErrors: RegisterErrors = {};

    // Validate email
    if (!formState.email.trim()) {
      newErrors.email = "Email là bắt buộc";
    } else if (!validateEmail(formState.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    // Validate password
    if (!formState.password) {
      newErrors.password = "Mật khẩu là bắt buộc";
    } else {
      const passwordValidation = validatePasswordStrength(formState.password);
      if (!passwordValidation.isValid) {
        newErrors.password = passwordValidation.error;
      }
    }

    // Validate confirm password
    if (!formState.confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
    } else if (formState.password !== formState.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    // Validate name (required by backend)
    if (!formState.name.trim()) {
      newErrors.name = "Họ và tên là bắt buộc";
    } else if (formState.name.trim().length < 2) {
      newErrors.name = "Họ và tên phải có ít nhất 2 ký tự";
    }

    // Validate mobile (optional)
    if (formState.mobile && !validatePhone(formState.mobile)) {
      newErrors.mobile = "Số điện thoại không hợp lệ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
        const credentials: RegisterRequest = {
          email: formState.email.trim(),
          password: formState.password,
          name: formState.name.trim() || undefined,
          mobile: formState.mobile.trim() || undefined,
          phone: formState.mobile.trim() || undefined,
          parentRefCode: formState.parentRefCode.trim() || undefined,
        };

        const response = await AuthService.register(credentials);

        if (response.success && response.data) {
          const registeredRefCode = response.data.doc?.refCode?.trim();

          // Auto login right after register so user can open affiliate dashboard
          await autoLoginAfterRegister(
            formState.email.trim(),
            formState.password
          );

          // Show success toast
          ToastService.success("Đăng ký thành công!");

          // Redirect to success page with affiliate info
          if (registeredRefCode) {
            router.push(
              `/auth/register/success?refCode=${encodeURIComponent(registeredRefCode)}`
            );
          } else {
            router.push("/auth/login?registered=true");
          }
        } else {
          // Handle API error
          const errorMessage =
            response.error || response.message || "Đăng ký thất bại";
          setErrors({ general: errorMessage });
          dispatch(setError(errorMessage));
          ToastService.error(errorMessage);
        }
      } catch (error: any) {
        // Handle network or unexpected errors
        const errorMessage = extractApiErrorMessage(error);
        setErrors({ general: errorMessage });
        dispatch(setError(errorMessage));
        ToastService.apiError(error, "Đăng ký thất bại");
      } finally {
        setIsLoading(false);
        dispatch(setLoading(false));
      }
    },
    [formState, dispatch, router, autoLoginAfterRegister]
  );

  /**
   * Update form field
   */
  const updateField = useCallback(
    (field: keyof RegisterFormState, value: string) => {
      setFormState((prev) => ({ ...prev, [field]: value }));

      // Clear error for this field when user starts typing
      if (errors[field]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }

      // Clear confirm password error if password changes
      if (field === "password" && errors.confirmPassword) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.confirmPassword;
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

