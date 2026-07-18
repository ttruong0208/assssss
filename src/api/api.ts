import { ToastService } from "@/services/ToastService";
import { LocalStorageService } from "../services/LocalStorageService";
import axios, { AxiosInstance, AxiosResponse } from "axios";


const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = LocalStorageService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    // Handle 401 errors - clear auth and redirect
    if (error.response?.status === 401) {
      try {
        LocalStorageService.clearAuthData();
      } catch {}
      
      if (typeof window !== "undefined") {
        ToastService.error(
          "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại để tiếp tục"
        );
      }
    }

    return Promise.reject(error);
  }
);

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface AvatarObject {
  id: string;
  url: string;
  filename: string;
  alt?: string;
  caption?: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  type: string;
}

// Rank object khi populate tu relationship
export interface RankObject {
  id: string;
  name: string;
  level: string;
  requiredPoints?: number;
  benefits?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Day du response tu /api/users/me (PayloadCMS)
export interface UserMeResponse {
  user: {
    id: string;
    email: string;
    collection: string;
    _strategy: string;
    _verified?: boolean;

    // Thong tin co ban
    name?: string;
    avatar?: string | AvatarObject; // Co the la ID hoac object neu depth > 0
    bio?: string;

    // Thong tin vi
    walletAddress?: string;

    // Vai tro & Quyen han
    role: string; // 'user' | 'investor' | 'creator' | 'moderator' | 'admin'

    // Trang thai xac minh
    isEmailVerified?: boolean;
    isKYCVerified?: boolean;
    isWalletVerified?: boolean;

    // Trang thai tai khoan
    isActive?: boolean;
    isSuspended?: boolean;
    suspensionReason?: string;

    // Theo doi dang nhap
    lastLogin?: string;

    // Ma gioi thieu
    refCode?: string;

    // Rank & Points
    rank?: string | RankObject; // Co the la ID hoac object neu depth > 0
    points?: number;

    // 2FA
    is2FAEnabled?: boolean;

    // Timestamps
    createdAt: string;
    updatedAt: string;
  };
  message?: string;
  exp?: number;
}

// Simplified user profile cho app su dung
export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string; // Da parse tu avatar.url
  bio?: string;
  walletAddress?: string;
  role: string;
  isEmailVerified?: boolean;
  isKYCVerified?: boolean;
  isWalletVerified?: boolean;
  isActive?: boolean;
  isSuspended?: boolean;
  suspensionReason?: string;
  lastLogin?: string;
  refCode?: string;
  rank?: RankObject; // Da parse neu co
  rankId?: string; // ID cua rank neu chua populate
  points?: number;
  is2FAEnabled?: boolean; // 2FA activation status
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateProfileResponse {
  userId: string;
  name?: string;
  avatar?: AvatarObject;
  avatarUrl?: string; // Backend trả về cả avatarUrl string để dễ sử dụng
  updatedAt: string;
}
export interface ApiTransactionHistoryResponse<T = any> {
  docs?: T;
  error?: string;
  message?: string;
}

export class ApiService {
  static async get<T>(endpoint: string, params?: any): Promise<ApiResponse<T>> {
    try {
      const response = await api.get(endpoint, { params });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message,
      };
    }
  }

  static async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    try {
      const response = await api.post(endpoint, data);

      // Handle Payload CMS direct response format (for auth endpoints)
      if (response.data && !("success" in response.data)) {
        return {
          success: true,
          data: response.data,
        };
      }

      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message,
        message: error.response?.data?.message || error.message,
      };
    }
  }

  static async postFormData<T>(
    endpoint: string,
    formData: FormData
  ): Promise<ApiResponse<T>> {
    try {
      const response = await api.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message,
        message: error.response?.data?.message || error.message,
      };
    }
  }

  static async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    try {
      const response = await api.put(endpoint, data);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message,
      };
    }
  }

  static async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    try {
      const response = await api.patch(endpoint, data);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message,
      };
    }
  }

  static async patchFormData<T>(
    endpoint: string,
    formData: FormData
  ): Promise<ApiResponse<T>> {
    try {
      const response = await api.patch(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message,
        message: error.response?.data?.message || error.message,
      };
    }
  }

  static async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await api.delete(endpoint);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || error.message,
      };
    }
  }

}

export default api;
