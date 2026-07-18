/**
 * Build API URL from endpoint
 * @param endpoint - API endpoint path
 * @returns Full API URL
 */
export const buildApiUrl = (endpoint: string): string => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  return `${baseUrl}${endpoint}`;
};

/**
 * Build frontend URL from path
 * @param path - Frontend path
 * @returns Full frontend URL
 */
export const buildFrontendUrl = (path: string): string => {
  const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_BASE_URL || "";
  return `${baseUrl}${path}`;
};
