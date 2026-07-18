import { ApiService, ApiResponse } from "../api";
import { API_ENDPOINTS } from "../endpoints";
import { PaginationParams, PaginatedResponse } from "./brandService";

/**
 * News Service
 * Handles all news-related API calls
 */

export interface News {
  id: string;
  title: string;
  description?: string;
  content?: string;
  thumbnail?: string;
  image?: {
    url: string;
    alt: string;
  };
  status?: "draft" | "published" | "hidden";
  isHot?: boolean;
  isPinned?: boolean;
  author?: {
    id: string;
    name?: string;
    avatar?: string;
  };
  likeCount?: number;
  commentCount?: number;
  viewCount?: number;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ListNewsParams extends PaginationParams {
  status?: "draft" | "published" | "hidden";
  isHot?: boolean | string;
  isPinned?: boolean | string;
  search?: string;
}

export interface CommentNewsRequest {
  content: string;
  replyTo?: string;
}

export interface NewsComment {
  id: string;
  content: string;
  user: {
    id: string;
    name?: string;
    avatar?: string;
  };
  replyTo?: string;
  replies?: NewsComment[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ListNewsCommentsParams extends PaginationParams {
  replyTo?: string;
}

export interface LikeNewsResponse {
  liked: boolean;
  likeCount: number;
}

export class NewsService {
  /**
   * Get paginated list of news articles
   */
  static async listNews(
    params?: ListNewsParams
  ): Promise<ApiResponse<PaginatedResponse<News>>> {
    return ApiService.get<PaginatedResponse<News>>(
      API_ENDPOINTS.NEWS.LIST,
      params
    );
  }

  /**
   * Get detailed information of a specific news article
   */
  static async getNewsById(id: string): Promise<ApiResponse<News>> {
    return ApiService.get<News>(API_ENDPOINTS.NEWS.BY_ID(id));
  }

  /**
   * Toggle like status for a news article
   */
  static async likeNews(id: string): Promise<ApiResponse<LikeNewsResponse>> {
    return ApiService.post<LikeNewsResponse>(API_ENDPOINTS.NEWS.LIKE(id));
  }

  /**
   * Add a comment to a news article
   */
  static async commentOnNews(
    id: string,
    data: CommentNewsRequest
  ): Promise<ApiResponse<NewsComment>> {
    return ApiService.post<NewsComment>(API_ENDPOINTS.NEWS.COMMENT(id), data);
  }

  /**
   * Get paginated list of comments for a news article
   */
  static async listNewsComments(
    id: string,
    params?: ListNewsCommentsParams
  ): Promise<ApiResponse<PaginatedResponse<NewsComment>>> {
    return ApiService.get<PaginatedResponse<NewsComment>>(
      API_ENDPOINTS.NEWS.LIST_COMMENTS(id),
      params
    );
  }
}
