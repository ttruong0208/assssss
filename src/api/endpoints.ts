/**
 * API Endpoints Constants
 * All endpoints extracted from OpenAPI specification
 */

export const API_ENDPOINTS = {
  // Address endpoints
  ADDRESS: {
    CREATE: "/api/v1/address",
    MY_ADDRESSES: "/api/v1/address/my-address",
  },

  // Authentication endpoints
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    REGISTER: "/api/users",
    REFRESH_TOKEN: "/api/v1/auth/refresh-token",
    REGISTER_DEVICE: "/api/v1/auth/register-device",
  },

  // Users endpoints
  USERS: {
    ME: "/api/users/me",
  },

  // Banners endpoints
  BANNERS: {
    LIST: "/api/v1/banners",
  },

  // Brands endpoints
  BRANDS: {
    LIST: "/api/v1/brands",
  },

  // Categories endpoints
  CATEGORIES: {
    LIST: "/api/v1/categories",
  },

  // Events endpoints
  EVENTS: {
    LIST: "/api/v1/events",
    BY_ID: (id: string) => `/api/v1/events/${id}`,
    REGISTER: (id: string) => `/api/v1/events/${id}/register`,
    LIKE: (id: string) => `/api/v1/events/${id}/like`,
    COMMENT: (id: string) => `/api/v1/events/${id}/comment`,
    LIST_COMMENTS: (id: string) => `/api/v1/events/${id}/list-comment`,
  },

  // News endpoints
  NEWS: {
    LIST: "/api/v1/news",
    BY_ID: (id: string) => `/api/v1/news/${id}`,
    LIKE: (id: string) => `/api/v1/news/${id}/like`,
    COMMENT: (id: string) => `/api/v1/news/${id}/comment`,
    LIST_COMMENTS: (id: string) => `/api/v1/news/${id}/list-comment`,
  },

  // Orders endpoints
  ORDERS: {
    CREATE: "/api/v1/orders",
  },

  // Products endpoints
  PRODUCTS: {
    LIST: "/api/v1/products",
    BY_ID: (id: string) => `/api/v1/products/${id}`,
    FAVORITE: (id: string) => `/api/v1/products/${id}/favorite`,
    MY_FAVORITES: "/api/v1/products/my-favorite-product",
  },

  // Shops endpoints
  SHOPS: {
    CREATE: "/api/v1/shops",
    BY_ID: (id: string) => `/api/v1/shops/${id}`,
    ORDER_STATS: (id: string) => `/api/v1/shops/${id}/order-stats`,
    ORDERS: (id: string) => `/api/v1/shops/${id}/orders`,
    PRODUCTS: (id: string) => `/api/v1/shops/${id}/products`,
    CREATE_PRODUCT: "/api/v1/shops/create-product",
    EDIT_PRODUCT: "/api/v1/shops/edit-product",
  },
} as const;

