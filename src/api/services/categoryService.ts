import { ApiService, ApiResponse } from "../api";
import { API_ENDPOINTS } from "../endpoints";
import { PaginationParams, PaginatedResponse } from "./brandService";

/**
 * Category Service
 * Handles all category-related API calls
 */

export interface Category {
  id: string;
  name: string;
  description?: string;
  slug?: string;
  parent?: string | Category;
  status?: "active" | "inactive" | "hidden";
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ListCategoriesParams extends PaginationParams {
  status?: "active" | "inactive" | "hidden";
  parent?: string;
  search?: string;
}

export class CategoryService {
  /**
   * Get paginated list of product categories
   */
  static async listCategories(
    params?: ListCategoriesParams
  ): Promise<ApiResponse<PaginatedResponse<Category>>> {
    return ApiService.get<PaginatedResponse<Category>>(
      API_ENDPOINTS.CATEGORIES.LIST,
      params
    );
  }
}

