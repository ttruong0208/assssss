import { ApiService, ApiResponse } from "../api";
import { API_ENDPOINTS } from "../endpoints";
import { PaginationParams, PaginatedResponse } from "./brandService";

/**
 * Product Service
 * Handles all product-related API calls
 */

export interface Product {
  id: string;
  name: string;
  description?: string;
  sku?: string;
  price: number;
  originalPrice?: number;
  images?: string[];
  rating?: number;
  soldQuantity?: number;
  category?: {
    id: string;
    name: string;
  };
  brand?: {
    id: string;
    name: string;
  };
  shop?: {
    id: string;
    name: string;
  };
  quantity?: number;
  status?: string;
  isActive?: boolean;
  isHot?: boolean;
  thumbnail?: {
    url: string;
    alt: string;
  };
  sizes?: Array<{
    name: string;
    image?: string;
    price?: number;
  }>;
  createdAt?: string;
  updatedAt?: string;
}

export interface ListProductsParams extends PaginationParams {
  shop?: string;
  category?: string;
  brand?: string;
  status?: string;
  isActive?: boolean | string;
  isHot?: boolean | string;
  isFreeShip?: boolean | string;
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  price?: number;
  status?: string;
  category?: string;
  brand?: string;
  shop?: string;
  isActive?: boolean;
  isHot?: boolean;
}

export interface FavoriteProductResponse {
  favorited: boolean;
}

export class ProductService {
  /**
   * Get paginated list of products with filters
   */
  static async listProducts(
    params?: ListProductsParams
  ): Promise<ApiResponse<PaginatedResponse<Product>>> {
    return ApiService.get<PaginatedResponse<Product>>(
      API_ENDPOINTS.PRODUCTS.LIST,
      params
    );
  }

  /**
   * Get detailed information of a specific product
   */
  static async getProductById(id: string): Promise<ApiResponse<Product>> {
    return ApiService.get<Product>(API_ENDPOINTS.PRODUCTS.BY_ID(id));
  }

  /**
   * Update product information (shop owner only)
   */
  static async updateProduct(
    id: string,
    data: UpdateProductRequest
  ): Promise<ApiResponse<Product>> {
    return ApiService.put<Product>(API_ENDPOINTS.PRODUCTS.BY_ID(id), data);
  }

  /**
   * Delete a product (shop owner only)
   */
  static async deleteProduct(id: string): Promise<ApiResponse<void>> {
    return ApiService.delete<void>(API_ENDPOINTS.PRODUCTS.BY_ID(id));
  }

  /**
   * Toggle favorite status for a product
   */
  static async favoriteProduct(
    id: string
  ): Promise<ApiResponse<FavoriteProductResponse>> {
    return ApiService.post<FavoriteProductResponse>(
      API_ENDPOINTS.PRODUCTS.FAVORITE(id)
    );
  }

  /**
   * Get paginated list of user's favorite products
   */
  static async getMyFavoriteProducts(
    params?: ListProductsParams
  ): Promise<ApiResponse<PaginatedResponse<Product>>> {
    return ApiService.get<PaginatedResponse<Product>>(
      API_ENDPOINTS.PRODUCTS.MY_FAVORITES,
      params
    );
  }
}
