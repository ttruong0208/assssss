import { ApiService, ApiResponse } from "../api";
import { API_ENDPOINTS } from "../endpoints";
import { PaginationParams, PaginatedResponse } from "./brandService";

/**
 * Event Service
 * Handles all event-related API calls
 */

export interface Event {
  id: string;
  name: string;
  description?: string;
  content?: string;
  thumbnail?: string;
  image?: {
    url: string;
    alt: string;
  };
  status?:
    | "draft"
    | "pending"
    | "approved"
    | "ongoing"
    | "ended"
    | "cancelled"
    | "hidden";
  isHot?: boolean;
  isPinned?: boolean;
  isFree?: boolean;
  startDate?: string;
  endDate?: string;
  location?: string;
  likeCount?: number;
  commentCount?: number;
  registeredCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ListEventsParams extends PaginationParams {
  status?:
    | "draft"
    | "pending"
    | "approved"
    | "ongoing"
    | "ended"
    | "cancelled"
    | "hidden";
  isHot?: boolean | string;
  isPinned?: boolean | string;
  isFree?: boolean | string;
  search?: string;
  startDateFrom?: string;
  startDateTo?: string;
}

export interface CommentEventRequest {
  content: string;
  replyTo?: string;
}

export interface Comment {
  id: string;
  content: string;
  user: {
    id: string;
    name?: string;
    avatar?: string;
  };
  replyTo?: string;
  replies?: Comment[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ListEventCommentsParams extends PaginationParams {
  replyTo?: string;
}

export interface LikeEventResponse {
  liked: boolean;
  likeCount: number;
}

export class EventService {
  /**
   * Get paginated list of events with filters
   */
  static async listEvents(
    params?: ListEventsParams
  ): Promise<ApiResponse<PaginatedResponse<Event>>> {
    return ApiService.get<PaginatedResponse<Event>>(
      API_ENDPOINTS.EVENTS.LIST,
      params
    );
  }

  /**
   * Get detailed information of a specific event
   */
  static async getEventById(id: string): Promise<ApiResponse<Event>> {
    return ApiService.get<Event>(API_ENDPOINTS.EVENTS.BY_ID(id));
  }

  /**
   * Register current user for an event
   */
  static async registerForEvent(id: string): Promise<ApiResponse<void>> {
    return ApiService.post<void>(API_ENDPOINTS.EVENTS.REGISTER(id));
  }

  /**
   * Toggle like status for an event
   */
  static async likeEvent(id: string): Promise<ApiResponse<LikeEventResponse>> {
    return ApiService.post<LikeEventResponse>(API_ENDPOINTS.EVENTS.LIKE(id));
  }

  /**
   * Add a comment to an event
   */
  static async commentOnEvent(
    id: string,
    data: CommentEventRequest
  ): Promise<ApiResponse<Comment>> {
    return ApiService.post<Comment>(API_ENDPOINTS.EVENTS.COMMENT(id), data);
  }

  /**
   * Get paginated list of comments for an event
   */
  static async listEventComments(
    id: string,
    params?: ListEventCommentsParams
  ): Promise<ApiResponse<PaginatedResponse<Comment>>> {
    return ApiService.get<PaginatedResponse<Comment>>(
      API_ENDPOINTS.EVENTS.LIST_COMMENTS(id),
      params
    );
  }
}
