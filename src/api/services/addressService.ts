import { ApiService, ApiResponse } from "../api";
import { API_ENDPOINTS } from "../endpoints";

/**
 * Address Service
 * Handles all address-related API calls
 */

export interface CreateAddressRequest {
  name: string;
  phone: string;
  address: string;
  ward: string;
  city: string;
  lat?: number;
  lng?: number;
  isDefault?: boolean;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  ward: string;
  city: string;
  lat?: number;
  lng?: number;
  isDefault: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export class AddressService {
  /**
   * Create a new shipping address
   */
  static async createAddress(
    data: CreateAddressRequest
  ): Promise<ApiResponse<Address>> {
    return ApiService.post<Address>(API_ENDPOINTS.ADDRESS.CREATE, data);
  }

  /**
   * Get all addresses for the authenticated user
   */
  static async getMyAddresses(): Promise<ApiResponse<Address[]>> {
    return ApiService.get<Address[]>(API_ENDPOINTS.ADDRESS.MY_ADDRESSES);
  }
}

