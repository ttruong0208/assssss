/**
 * Services Index
 * Export all service classes for convenient importing
 */

export { AddressService } from "./addressService";
export type { CreateAddressRequest, Address } from "./addressService";

export { AuthService } from "./authService";
export type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  RegisterDeviceRequest,
} from "./authService";

export { BannerService } from "./bannerService";
export type { Banner, ListBannersParams } from "./bannerService";

export { BrandService } from "./brandService";
export type {
  Brand,
  PaginationParams,
  ListBrandsParams,
  PaginatedResponse,
} from "./brandService";

export { CategoryService } from "./categoryService";
export type { Category, ListCategoriesParams } from "./categoryService";

export { EventService } from "./eventService";
export type {
  Event,
  ListEventsParams,
  CommentEventRequest,
  Comment,
  ListEventCommentsParams,
  LikeEventResponse,
} from "./eventService";

export { NewsService } from "./newsService";
export type {
  News,
  ListNewsParams,
  CommentNewsRequest,
  NewsComment,
  ListNewsCommentsParams,
  LikeNewsResponse,
} from "./newsService";

export { OrderService } from "./orderService";
export type {
  OrderItem,
  ShippingAddress,
  CreateOrderRequest,
  Order as OrderType,
} from "./orderService";

export { ProductService } from "./productService";
export type {
  Product,
  ListProductsParams,
  UpdateProductRequest,
  FavoriteProductResponse,
} from "./productService";

export { ShopService } from "./shopService";
export type {
  Shop,
  CreateShopRequest,
  UpdateShopRequest,
  ShopOrderStats,
  GetShopOrderStatsParams,
  GetShopOrdersParams,
  ShopOrder,
  CreateProductRequest,
  EditProductRequest,
} from "./shopService";

export { UserService } from "./userService";
