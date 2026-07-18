import { ApiService, ApiResponse } from "../api";
import { API_ENDPOINTS } from "../endpoints";

/**
 * Brand Service
 * Handles all brand-related API calls
 */

export interface Brand {
  id: string;
  name: string;
  description?: string;
  logo?: string;
  status?: "active" | "inactive";
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginationParams {
  limit?: number;
  page?: number;
  sort?: string;
  order?: "asc" | "desc";
}

export interface ListBrandsParams extends PaginationParams {
  status?: "active" | "inactive";
  search?: string;
}

export interface PaginatedResponse<T> {
  docs: T[];
  totalDocs: number;
  totalPages: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
}

export class BrandService {
  /**
   * Get paginated list of product brands
   */
  static async listBrands(
    params?: ListBrandsParams
  ): Promise<ApiResponse<PaginatedResponse<Brand>>> {
    return ApiService.get<PaginatedResponse<Brand>>(
      API_ENDPOINTS.BRANDS.LIST,
      params
    );
  }
}

