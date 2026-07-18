import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

// Session object từ API
export interface UserSession {
  id: string;
  createdAt: string;
  expiresAt: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  bio?: string;
  walletAddress?: string;
  role: string;

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
  sessions?: UserSession[];

  // Ma gioi thieu & Rank
  refCode?: string;
  rank?: any; // TODO: Define Rank type when needed
  rankId?: string;
  points?: number;

  // Thong tin them
  childrenCount?: number;
  totalInvestmentAmount?: number;
  totalNFTCount?: number;

  // 2FA
  isTwoFactorEnabled?: boolean;
  twoFactorBackupCodes?: string[];

  // Timestamps
  createdAt?: string;
  updatedAt?: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Async thunk de refresh user profile va avatar
export const refreshUserProfile = createAsyncThunk(
  'auth/refreshUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      // TODO: Implement user service when available
      // const response = await UserService.getMe();
      return rejectWithValue('User service not implemented');
    } catch (error: any) {
      return rejectWithValue(error?.message || 'Lỗi khi làm mới hồ sơ');
    }
  }
);

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Login action - Called after successful API call
    setLoginSuccess: (
      state,
      action: PayloadAction<{ user: AuthUser; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },

    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // Set error
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    // Set user
    setUser: (state, action: PayloadAction<AuthUser | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },

    // Update user profile
    updateProfile: (state, action: PayloadAction<Partial<AuthUser>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Logout action
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },

    // Initialize auth from storage
    // Logic nay duoc goi khi app reload de restore authentication state
    initializeAuth: (state) => {
      // Kiem tra token va user info trong localStorage
      // Neu hop le thi restore vao Redux state
      // Logic cu the duoc xu ly boi redux-persist auto-restore
      // Action nay chi can trigger validation neu can

      // NOTE: redux-persist se tu dong restore state.user va state.token
      // Nen khong can manual logic tai day
      // Neu muon validate token expiry, nen dung async thunk thay vi reducer
    },

    // Update 2FA status
    update2FAStatus: (state, action: PayloadAction<boolean>) => {
      if (state.user) {
        state.user.isTwoFactorEnabled = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle refreshUserProfile async thunk
      .addCase(refreshUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshUserProfile.fulfilled, (state, action) => {
        // Cap nhat user profile moi, bao gom avatarUrl
        if (state.user) {
          state.user = {
            ...state.user,
            ...action.payload,
          };
        }
        state.isLoading = false;
      })
      .addCase(refreshUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setLoginSuccess,
  setLoading,
  setError,
  setUser,
  updateProfile,
  clearError,
  logout,
  initializeAuth,
  update2FAStatus,
} = authSlice.actions;

export default authSlice.reducer;
