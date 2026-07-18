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
 * Sao chép văn bản vào clipboard, có fallback cho môi trường không bảo mật (HTTP).
 * Ưu tiên dùng navigator.clipboard khi ở secure context, nếu không sẽ dùng
 * textarea tạm + document.execCommand('copy').
 * @param text - Văn bản cần sao chép
 * @returns true nếu sao chép thành công, false nếu thất bại
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!text) return false;
  if (typeof window === "undefined" || typeof document === "undefined") {
    return false;
  }

  try {
    // Try Clipboard API first. Some environments still allow it on non-HTTPS origins.
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fallback bên dưới
  }

  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "true");
    textarea.style.position = "fixed";
    textarea.style.top = "-9999px";
    textarea.style.left = "-9999px";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    const succeeded = document.execCommand("copy");
    document.body.removeChild(textarea);
    if (succeeded) return true;
  } catch {
    // fallback bên dưới
  }

  // Last fallback: contenteditable node + selection/range for stricter browsers.
  try {
    const selection = window.getSelection();
    if (!selection) return false;

    const activeElement = document.activeElement as HTMLElement | null;
    const previousRanges: Range[] = [];
    for (let i = 0; i < selection.rangeCount; i += 1) {
      const range = selection.getRangeAt(i);
      previousRanges.push(range.cloneRange());
    }

    const container = document.createElement("div");
    container.textContent = text;
    container.setAttribute("contenteditable", "true");
    container.style.position = "fixed";
    container.style.top = "0";
    container.style.left = "-9999px";
    container.style.whiteSpace = "pre";
    document.body.appendChild(container);

    const range = document.createRange();
    range.selectNodeContents(container);
    selection.removeAllRanges();
    selection.addRange(range);

    const copied = document.execCommand("copy");
    selection.removeAllRanges();
    previousRanges.forEach((savedRange) => selection.addRange(savedRange));
    document.body.removeChild(container);
    activeElement?.focus?.();

    return copied;
  } catch {
    return false;
  }
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
