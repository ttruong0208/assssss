import { ApiService, ApiResponse } from "../api";
import { API_ENDPOINTS } from "../endpoints";
import { PaginationParams, PaginatedResponse } from "./brandService";
import { Product, ListProductsParams } from "./productService";

/**
 * Shop Service
 * Handles all shop-related API calls
 */

export interface Shop {
  id: string;
  name: string;
  description?: string;
  status?: "active" | "inactive" | "closed";
  address?: {
    name?: string;
    lat?: number;
    lng?: number;
  };
  phone?: string;
  email?: string;
  logo?: string;
  banner?: string;
  owner?: {
    id: string;
    name?: string;
    email?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateShopRequest {
  name: string;
  description?: string;
  status?: "active" | "inactive" | "closed";
  address?: {
    name?: string;
    lat?: number;
    lng?: number;
  };
  phone?: string;
  email?: string;
  logo?: string;
  banner?: string;
}

export interface UpdateShopRequest {
  name?: string;
  description?: string;
  status?: "active" | "inactive" | "closed";
  address?: {
    name?: string;
    lat?: number;
    lng?: number;
  };
  phone?: string;
  email?: string;
  logo?: string;
  banner?: string;
}

export interface ShopOrderStats {
  statusCounts: {
    pending: number;
    confirmed: number;
    preparing: number;
    picking: number;
    shipping: number;
    delivered: number;
    cancelled: number;
    returned: number;
  };
  paymentStatusCounts: {
    pending: number;
    paid: number;
    partial: number;
    refunded: number;
    failed: number;
  };
}

export interface GetShopOrderStatsParams {
  startDate?: string;
  endDate?: string;
}

export interface GetShopOrdersParams extends PaginationParams {
  status?: string;
  paymentStatus?: string;
  paymentMethod?: string;
  customer?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
}

export interface ShopOrder {
  id: string;
  orderCode: string;
  customer?: {
    id: string;
    name?: string;
    email?: string;
  };
  items: Array<{
    product: Product;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  paymentStatus?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProductRequest {
  shop: string;
  category: string;
  name: string;
  price: number;
  brand?: string;
  description?: string;
  sku?: string;
  originalPrice?: number;
  thumbnail?: string;
  images?: Array<{
    image: string;
  }>;
  quantity?: number;
  sizes?: Array<{
    name: string;
    image?: string;
    price?: number;
  }>;
}

export interface EditProductRequest {
  productId: string;
  category?: string;
  brand?: string;
  name?: string;
  description?: string;
  sku?: string;
  price?: number;
  originalPrice?: number;
  thumbnail?: string;
  images?: Array<{
    image: string;
  }>;
  quantity?: number;
  sizes?: Array<{
    name: string;
    image?: string;
    price?: number;
  }>;
  status?: "draft" | "active" | "inactive" | "out_of_stock" | "discontinued";
}

export class ShopService {
  /**
   * Create a new shop for the authenticated user
   */
  static async createShop(
    data: CreateShopRequest
  ): Promise<ApiResponse<Shop>> {
    return ApiService.post<Shop>(API_ENDPOINTS.SHOPS.CREATE, data);
  }

  /**
   * Get detailed information of a specific shop
   */
  static async getShopById(id: string): Promise<ApiResponse<Shop>> {
    return ApiService.get<Shop>(API_ENDPOINTS.SHOPS.BY_ID(id));
  }

  /**
   * Update shop information (shop owner or admin only)
   */
  static async updateShop(
    id: string,
    data: UpdateShopRequest
  ): Promise<ApiResponse<Shop>> {
    return ApiService.patch<Shop>(API_ENDPOINTS.SHOPS.BY_ID(id), data);
  }

  /**
   * Get order statistics for a shop
   */
  static async getShopOrderStats(
    id: string,
    params?: GetShopOrderStatsParams
  ): Promise<ApiResponse<ShopOrderStats>> {
    return ApiService.get<ShopOrderStats>(
      API_ENDPOINTS.SHOPS.ORDER_STATS(id),
      params
    );
  }

  /**
   * Get paginated list of orders for a shop
   */
  static async getShopOrders(
    id: string,
    params?: GetShopOrdersParams
  ): Promise<ApiResponse<PaginatedResponse<ShopOrder>>> {
    return ApiService.get<PaginatedResponse<ShopOrder>>(
      API_ENDPOINTS.SHOPS.ORDERS(id),
      params
    );
  }

  /**
   * Get paginated list of products for a shop
   */
  static async getShopProducts(
    id: string,
    params?: ListProductsParams
  ): Promise<ApiResponse<PaginatedResponse<Product>>> {
    return ApiService.get<PaginatedResponse<Product>>(
      API_ENDPOINTS.SHOPS.PRODUCTS(id),
      params
    );
  }

  /**
   * Create a new product for a shop (shop owner or admin only)
   */
  static async createProduct(
    data: CreateProductRequest
  ): Promise<ApiResponse<Product>> {
    return ApiService.post<Product>(API_ENDPOINTS.SHOPS.CREATE_PRODUCT, data);
  }

  /**
   * Update product information (shop owner or admin only)
   */
  static async editProduct(
    data: EditProductRequest
  ): Promise<ApiResponse<Product>> {
    return ApiService.patch<Product>(API_ENDPOINTS.SHOPS.EDIT_PRODUCT, data);
  }
}

