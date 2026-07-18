import api, { ApiResponse, UserMeResponse, UserProfile } from "../api";
import { API_ENDPOINTS } from "../endpoints";

export class UserService {
  private static readonly PROFILE_ENDPOINTS = [
    API_ENDPOINTS.USERS.ME,
    "/api/v1/users/me",
    "/api/v1/auth/me",
  ];

  private static mapToUserProfile(rawUser: any): UserProfile {
    const avatarUrl =
      typeof rawUser?.avatar === "object" ? rawUser.avatar?.url : undefined;
    const rankObject =
      rawUser?.rank && typeof rawUser.rank === "object" ? rawUser.rank : undefined;
    const rankId = typeof rawUser?.rank === "string" ? rawUser.rank : undefined;

    return {
      id: rawUser?.id || "",
      email: rawUser?.email || "",
      name: rawUser?.name,
      avatarUrl,
      bio: rawUser?.bio,
      walletAddress: rawUser?.walletAddress,
      role: rawUser?.role || "user",
      isEmailVerified: rawUser?.isEmailVerified,
      isKYCVerified: rawUser?.isKYCVerified,
      isWalletVerified: rawUser?.isWalletVerified,
      isActive: rawUser?.isActive,
      isSuspended: rawUser?.isSuspended,
      suspensionReason: rawUser?.suspensionReason,
      lastLogin: rawUser?.lastLogin,
      refCode: rawUser?.refCode,
      rank: rankObject,
      rankId,
      points: rawUser?.points,
      is2FAEnabled: rawUser?.is2FAEnabled,
      createdAt: rawUser?.createdAt,
      updatedAt: rawUser?.updatedAt,
    };
  }

  private static extractRawUser(payload: any): any {
    return (
      payload?.data?.user ||
      payload?.user ||
      payload?.data?.doc ||
      payload?.doc ||
      payload?.data ||
      payload
    );
  }

  private static isUserLike(rawUser: any): boolean {
    return (
      !!rawUser &&
      typeof rawUser === "object" &&
      (typeof rawUser?.id === "string" ||
        typeof rawUser?.email === "string" ||
        typeof rawUser?.refCode === "string")
    );
  }

  static async getMyProfile(): Promise<ApiResponse<UserProfile>> {
    let lastError = "Không lấy được thông tin người dùng.";

    for (const endpoint of this.PROFILE_ENDPOINTS) {
      try {
        const response = await api.get<
          UserMeResponse | { success?: boolean; data?: UserMeResponse; user?: any }
        >(endpoint);

        const payload: any = response.data;
        const rawUser = this.extractRawUser(payload);

        if (this.isUserLike(rawUser)) {
          return {
            success: true,
            data: this.mapToUserProfile(rawUser),
          };
        }

        if (typeof payload?.message === "string" && payload.message.trim()) {
          lastError = payload.message;
        }
      } catch (error: any) {
        const status = error?.response?.status;
        const errorMessage =
          error?.response?.data?.error ||
          error?.response?.data?.message ||
          error?.message;

        if (status === 401 || status === 403) {
          return {
            success: false,
            error: "Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.",
          };
        }

        if (typeof errorMessage === "string" && errorMessage.trim()) {
          lastError = errorMessage;
        }
      }
    }

    return {
      success: false,
      error: lastError,
    };
  }
}
