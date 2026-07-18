import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { BannerService, Banner } from "@/api/services";

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx for conditional classes and tailwind-merge for conflict resolution
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format số với dấu cách ngăn cách giữa các nhóm 3 chữ số
 * Ví dụ: 1000000 -> "1 000 000"
 * @param value - Số cần format
 * @returns Chuỗi đã được format với dấu cách
 */
export function formatNumberWithSpaces(value: number | string): string {
  if (value === null || value === undefined) return "0";
  // Chuyển sang string và loại bỏ các ký tự không phải số
  const numStr = String(value).replace(/\D/g, "");

  if (!numStr) return "0";

  // Format với regex: thêm dấu cách sau mỗi 3 chữ số từ phải sang trái
  return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/**
 * Lấy danh sách banner theo screen và position
 * @param screen - Màn hình hiển thị (home, product, product-list, product-detail, event, event-list, event-detail, news, news-list, news-detail, cart, checkout, profile, other)
 * @param position - Vị trí hiển thị (top, middle, bottom)
 * @returns Mảng các banner hoặc mảng rỗng nếu không có dữ liệu
 */
export async function getBannersByScreenAndPosition(
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
    | "other",
  position: "top" | "middle" | "bottom"
): Promise<Banner[]> {
  try {
    const response = await BannerService.listBanners({
      screen,
      position,
      isActive: true,
      sort: "order",
      order: "asc",
    });

    if (response.success && response.data && response.data.docs) {
      return response.data.docs;
    }

    return [];
  } catch (error) {
    console.error("Error fetching banners:", error);
    return [];
  }
}
