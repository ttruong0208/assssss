import { ApiService, ApiResponse } from "../api";
import { API_ENDPOINTS } from "../endpoints";
import { PaginationParams, PaginatedResponse } from "./brandService";

/**
 * Banner Service
 * Handles all banner-related API calls
 */

export interface Banner {
  id: string;
  image: {
    url: string;
    alt?: string;
  };
  title?: string | null;
  description?: string | null;
  screen:
    | "home"
    | "product"
    | "product-list"
    | "product-detail"
    | "event"
    | "event-list"
    | "event-detail"
    | "news"
    | "news-list"
    | "news-detail"
    | "cart"
    | "checkout"
    | "profile"
    | "other";
  position: "top" | "middle" | "bottom";
  order: number;
  link?: string | null;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ListBannersParams extends PaginationParams {
  screen?:
    | "home"
    | "product"
    | "product-list"
    | "product-detail"
    | "event"
    | "event-list"
    | "event-detail"
    | "news"
    | "news-list"
    | "news-detail"
    | "cart"
    | "checkout"
    | "profile"
    | "other";
  position?: "top" | "middle" | "bottom";
  isActive?: boolean | string;
  search?: string;
}

export class BannerService {
  /**
   * Lấy danh sách banner với filter, search, sort và pagination
   * GET /api/v1/banners
   *
   * Query parameters:
   * - limit?: number (mặc định: 10, tối đa: 100) - Số lượng banner mỗi trang
   * - page?: number (mặc định: 1) - Trang hiện tại
   * - sort?: string (mặc định: 'order') - Sắp xếp theo field (order, createdAt, updatedAt)
   * - order?: 'asc' | 'desc' (mặc định: 'asc') - Thứ tự sắp xếp
   *
   * Filters:
   * - screen?: string - Màn hình hiển thị (home, product, product-list, product-detail, event, event-list, event-detail, news, news-list, news-detail, cart, checkout, profile, other)
   * - position?: string - Vị trí hiển thị (top, middle, bottom)
   * - isActive?: 'true' | 'false' - Trạng thái hoạt động (mặc định: 'true' nếu không chỉ định)
   * - search?: string - Tìm kiếm theo tiêu đề hoặc mô tả
   *
   * Response:
   * - docs: Danh sách banner với thông tin đầy đủ (populate image)
   *   - Mỗi banner bao gồm:
   *     - id: string - ID banner
   *     - image: Media object - Hình ảnh banner
   *     - title: string | null - Tiêu đề banner
   *     - description: string | null - Mô tả banner
   *     - screen: string - Màn hình hiển thị
   *     - position: string - Vị trí hiển thị
   *     - order: number - Thứ tự sắp xếp
   *     - link: string | null - Link khi click vào banner
   *     - isActive: boolean - Trạng thái hoạt động
   *     - createdAt: string - Ngày tạo
   *     - updatedAt: string - Ngày cập nhật
   * - totalDocs: Tổng số banner
   * - totalPages: Tổng số trang
   * - page: Trang hiện tại
   * - limit: Số lượng mỗi trang
   * - hasNextPage: Có trang tiếp theo
   * - hasPrevPage: Có trang trước
   * - nextPage: Số trang tiếp theo (null nếu không có)
   * - prevPage: Số trang trước (null nếu không có)
   */
  static async listBanners(
    params?: ListBannersParams
  ): Promise<ApiResponse<PaginatedResponse<Banner>>> {
    return ApiService.get<PaginatedResponse<Banner>>(
      API_ENDPOINTS.BANNERS.LIST,
      params
    );
  }
}
