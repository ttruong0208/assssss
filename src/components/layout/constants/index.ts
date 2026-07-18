/**
 * Constants cho Header và Footer components
 */

// Mock data - sẽ được thay thế bằng dữ liệu từ store/API
export const MOCK_NOTIFICATION_COUNT = 5;
export const MOCK_USER_RANK = "Ruby";
export const MOCK_MASKED_PHONE = "09*** 135";
export const MOCK_DEFAULT_USER_NAME = "Nguyễn Đức Long";
export const MOCK_DEFAULT_USER_FALLBACK = "User";

// Navigation links
export const HEADER_LINKS = {
  DOWNLOAD: "/download",
  COMMUNITY: "/community",
  NOTIFICATIONS: "/notifications",
  FAQ: "/faq",
  PROFILE: "/profile",
  LOGIN: "/auth/login",
  CART: "/cart",
  HOME: "/",
} as const;

// Text labels
export const HEADER_LABELS = {
  DOWNLOAD_APP: "Tải ứng dụng",
  COMMUNITY_PAGE: "Trang cộng đồng",
  NOTIFICATIONS: "Thông báo",
  FAQ: "FAQ",
  VIETNAM: "Việt Nam",
  LOGIN: "Đăng nhập",
  SEARCH_PLACEHOLDER: "Nhập tên sản phẩm tại đây",
  SEARCH_BUTTON: "Tìm kiếm",
  CART: "Giỏ hàng",
} as const;

// Footer menu items
export const FOOTER_MENU_ITEMS = {
  left: [
    { label: "Trang chủ", href: "/" },
    { label: "Tin tức", href: "/news" },
    { label: "Cộng đồng", href: "/community" },
  ],
  right: [
    { label: "Điều khoản sử dụng", href: "/terms" },
    { label: "Tuyển dụng", href: "/careers" },
    { label: "Liên hệ", href: "/contact" },
  ],
} as const;

// Footer social links (icons sẽ được import trong component)
export const FOOTER_SOCIAL_LINKS = [
  { name: "YouTube", href: "#", label: "YouTube" },
  { name: "Facebook", href: "#", label: "Facebook" },
  { name: "Twitter", href: "#", label: "Twitter" },
  { name: "Instagram", href: "#", label: "Instagram" },
] as const;
