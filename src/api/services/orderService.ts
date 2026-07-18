import { ApiService, ApiResponse } from "../api";
import { API_ENDPOINTS } from "../endpoints";

/**
 * Order Service
 * Handles all order-related API calls
 */

export interface OrderItem {
  product: string;
  quantity: number;
}

export interface ShippingAddress {
  name: string;
  phone: string;
  address: string;
  ward: string;
  province: string;
  lat?: number;
  lng?: number;
}

export interface CreateOrderRequest {
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod?: "cod" | "bank_transfer" | "e_wallet" | "credit_card" | "debit_card";
  note?: string;
}

export interface Order {
  id: string;
  orderCode: string;
  items: Array<{
    product: {
      id: string;
      name: string;
      price: number;
      thumbnail?: string;
    };
    quantity: number;
    price: number;
  }>;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentStatus?: "pending" | "paid" | "partial" | "refunded" | "failed";
  status?: "pending" | "confirmed" | "preparing" | "picking" | "shipping" | "delivered" | "cancelled" | "returned";
  totalAmount: number;
  shippingFee?: number;
  discount?: number;
  note?: string;
  createdAt?: string;
  updatedAt?: string;
}

export class OrderService {
  /**
   * Create a new order from shopping cart items
   */
  static async createOrder(
    data: CreateOrderRequest
  ): Promise<ApiResponse<Order>> {
    return ApiService.post<Order>(API_ENDPOINTS.ORDERS.CREATE, data);
  }
}

