export const categoryContent = {
  sortBy: "Sắp xếp theo",
  allProducts: "Tất cả sản phẩm",
  viewAll: "Xem tất cả",
  noProducts: "Không có sản phẩm",
  previous: "Trước",
  next: "Sau",
  sortOptions: [
    "Mới nhất",
    "HOT",
    "Bán chạy",
    "Khuyến mại",
    "Sắp xếp",
    "Giá sản phẩm ",
  ],
} as const;

export const categoryFilterSidebar = {
  selectBrand: "Chọn thương hiệu",
  brands: ["Apple", "Samsung", "Nokia"],
  price: "Giá bán",
  priceRanges: [
    "<100.000 VND",
    "100.000 - 500.000 VND",
    "500.000 - 1.000.000 VND",
    ">1.000.000 VND",
  ],
  freeShip: "Free ship",
  hasFreeShip: "Có Free ship",
  rating: "Đánh giá",
  starIcon: "⭐",
} as const;

export const productSuggestionsSection = {
  title: "Gợi ý cho bạn",
  scrollLeft: "Cuộn trái",
  scrollRight: "Cuộn phải",
} as const;

export const promotionOptions = {
  hasPromotion: "Có khuyến mãi",
  noPromotion: "Không khuyến mãi",
} as const;

export const sortOptions = {
  aToZ: "Từ A đến Z",
  zToA: "Từ Z đến A",
} as const;

export const priceOptions = {
  lowToHigh: "Giá thấp đến cao",
  highToLow: "Giá cao đến thấp",
} as const;

export const productCard = {
  noImage: "No Image",
  sold: "Đã bán",
  outOfStock: "Hết hàng",
  addToCart: "Thêm vào giỏ hàng",
} as const;
