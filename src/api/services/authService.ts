import { ApiService, ApiResponse } from "../api";
import { API_ENDPOINTS } from "../endpoints";

/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

export interface LoginRequest {
  credentials?: string;
  email?: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
  mobile?: string;
  phone?: string;
  parentRefCode?: string;
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    name?: string;
    phone?: string;
    avatar?: string;
    role: string;
    status: string;
  };
  accessToken: string;
  refreshToken: string;
}

export interface RegisterResponse {
  doc: {
    createdAt: string;
    updatedAt: string;
    name: string;
    status: string;
    refCode: string;
    emailVerify: boolean;
    isEnable2FA: boolean;
    isAdmin: boolean;
    email: string;
    id: string;
    sessions: any[];
  };
  message: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterDeviceRequest {
  deviceId: string;
  deviceType: "ios" | "android" | "web" | "other";
  fcmToken?: string;
  deviceModel?: string;
  osVersion?: string;
  appVersion?: string;
  deviceInfo?: Record<string, any>;
}

export class AuthService {
  /**
   * Register a new user account using Payload CMS API
   */
  static async register(
    credentials: RegisterRequest
  ): Promise<ApiResponse<RegisterResponse>> {
    return ApiService.post<RegisterResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      credentials
    );
  }

  /**
   * Authenticate user with email and password
   */
  static async login(
    credentials: LoginRequest
  ): Promise<ApiResponse<LoginResponse>> {
    return ApiService.post<LoginResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );
  }

  /**
   * Refresh access token using refresh token
   */
  static async refreshToken(
    token: string
  ): Promise<ApiResponse<RefreshTokenResponse>> {
    return ApiService.post<RefreshTokenResponse>(
      API_ENDPOINTS.AUTH.REFRESH_TOKEN,
      { refreshToken: token }
    );
  }

  /**
   * Register or update device information for push notifications
   */
  static async registerDevice(
    deviceInfo: RegisterDeviceRequest
  ): Promise<ApiResponse<void>> {
    return ApiService.post<void>(
      API_ENDPOINTS.AUTH.REGISTER_DEVICE,
      deviceInfo
    );
  }
}
