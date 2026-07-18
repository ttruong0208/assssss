// Export store and types
export { store, persistor } from './store';
export type { RootState, AppDispatch } from './store';

// Export auth slice actions and types
export {
  setLoginSuccess,
  setLoading,
  setError,
  setUser,
  updateProfile,
  clearError,
  logout,
  initializeAuth,
  update2FAStatus,
  refreshUserProfile,
} from './authSlice';
export type { AuthUser, UserSession } from './authSlice';

// Export typed hooks
export { useAppDispatch, useAppSelector } from './hooks';

// Export logout action (alias for logout from authSlice)
export { logout as logoutAction } from './authSlice';

