"use client";

import { useState, useRef, useEffect } from "react";
import { Category } from "@/api/services/categoryService";
import { ProductCard } from "@/components/products/ProductCard";
import { useNewProducts } from "@/screens/HomeScreen/hooks/useNewProducts";
import { useCategoryContent } from "@/screens/CategoryScreen/hooks/useCategoryContent";
import { CategoryFilterSidebar } from "./CategoryFilterSidebar";
import { ProductSuggestionsSection } from "./ProductSuggestionsSection";
import {
  categoryContent,
  promotionOptions,
  sortOptions as sortOptionsConfig,
  priceOptions,
} from "@/config/content";
import { brandColors } from "@/config/colors";
import { LoadingSpinner } from "@/lib/loadingSpinner";
import { ChevronDown } from "lucide-react";

type CategoryContentProps = {
  selectedSort: string;
  onSelectSort: (value: string) => void;
  categories: Category[];
  isCategoryLoading: boolean;
  newProducts: ReturnType<typeof useNewProducts>["products"];
  isNewLoading: boolean;
  onCategoryClick: (category: Category) => void;
  activeCategoryId?: string;
};

export const CategoryContent = ({
  selectedSort,
  onSelectSort,
  categories,
  newProducts,
  activeCategoryId,
}: CategoryContentProps) => {
  const [isPromotionDropdownOpen, setIsPromotionDropdownOpen] = useState(false);
  const promotionDropdownRef = useRef<HTMLDivElement>(null);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const sortDropdownRef = useRef<HTMLDivElement>(null);
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);
  const priceDropdownRef = useRef<HTMLDivElement>(null);

  const {
    sortOptions,
    randomProducts,
    paginatedProducts,
    currentPage,
    totalPages,
    goToPage,
    goToPreviousPage,
    goToNextPage,
    isCategoryProductsLoading,
  } = useCategoryContent({
    newProducts,
    categories,
    activeCategoryId,
    selectedSort,
  });

  // Đóng dropdown khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        promotionDropdownRef.current &&
        !promotionDropdownRef.current.contains(event.target as Node)
      ) {
        setIsPromotionDropdownOpen(false);
      }
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSortDropdownOpen(false);
      }
      if (
        priceDropdownRef.current &&
        !priceDropdownRef.current.contains(event.target as Node)
      ) {
        setIsPriceDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {isCategoryProductsLoading && <LoadingSpinner />}
      {/* Thanh tabs sắp xếp (mock) */}
      <div className="container mx-auto px-4 pt-4">
        <div className="flex items-center gap-6 mb-4">
          <span className="text-2xl font-bold text-black whitespace-nowrap">
            {categoryContent.sortBy}
          </span>
          <div className="flex flex-wrap gap-4 text-sm">
            {sortOptions.map((label) => {
              const isPromotion = label === "Khuyến mại";
              const isSort = label === "Sắp xếp";
              const isPrice = label.trim() === "Giá sản phẩm";
              // Button "Khuyến mại" active khi selectedSort là "Có khuyến mãi" hoặc "Không khuyến mãi"
              // Button "Sắp xếp" active khi selectedSort là "Từ A đến Z" hoặc "Từ Z đến A"
              // Button "Giá" active khi selectedSort là "Giá thấp đến cao" hoặc "Giá cao đến thấp"
              const isActive = isPromotion
                ? selectedSort === promotionOptions.hasPromotion ||
                  selectedSort === promotionOptions.noPromotion
                : isSort
                ? selectedSort === sortOptionsConfig.aToZ ||
                  selectedSort === sortOptionsConfig.zToA
                : isPrice
                ? selectedSort === priceOptions.lowToHigh ||
                  selectedSort === priceOptions.highToLow
                : selectedSort === label;

              // Lấy text hiển thị cho button "Sắp xếp"
              const getSortButtonText = () => {
                if (isSort) {
                  if (selectedSort === sortOptionsConfig.aToZ) {
                    return sortOptionsConfig.aToZ;
                  }
                  if (selectedSort === sortOptionsConfig.zToA) {
                    return sortOptionsConfig.zToA;
                  }
                  return label;
                }
                return label;
              };

              // Lấy text hiển thị cho button "Khuyến mại"
              const getPromotionButtonText = () => {
                if (isPromotion) {
                  if (selectedSort === promotionOptions.hasPromotion) {
                    return promotionOptions.hasPromotion;
                  }
                  if (selectedSort === promotionOptions.noPromotion) {
                    return promotionOptions.noPromotion;
                  }
                  return label;
                }
                return label;
              };

              // Lấy text hiển thị cho button "Giá"
              const getPriceButtonText = () => {
                if (isPrice) {
                  if (selectedSort === priceOptions.lowToHigh) {
                    return priceOptions.lowToHigh;
                  }
                  if (selectedSort === priceOptions.highToLow) {
                    return priceOptions.highToLow;
                  }
                  return label.trim();
                }
                return label;
              };

              // Nếu là button "Sắp xếp", hiển thị với dropdown
              if (isSort) {
                return (
                  <div key={label} ref={sortDropdownRef} className="relative">
                    <button
                      type="button"
                      onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                      className="min-w-[150px] px-6 py-2 inline-flex items-center justify-center gap-2 rounded-sm border text-sm font-medium transition-colors cursor-pointer"
                      style={{
                        backgroundColor: isActive
                          ? brandColors.primary_background
                          : brandColors.secondary_background,
                        color: isActive
                          ? brandColors.primary_text
                          : brandColors.secondary_text,
                        borderColor: brandColors.border_color,
                        boxShadow: isActive
                          ? "0 8px 18px rgba(37,99,235,0.45)"
                          : undefined,
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = "#F5FBFF";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor =
                            brandColors.secondary_background;
                        }
                      }}
                    >
                      {getSortButtonText()}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          isSortDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown menu */}
                    {isSortDropdownOpen && (
                      <div
                        className="absolute top-full left-0 mt-1 min-w-[200px] bg-white border rounded-md shadow-lg z-50"
                        style={{ borderColor: brandColors.border_color }}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            onSelectSort(sortOptionsConfig.aToZ);
                            setIsSortDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                          style={{ color: brandColors.secondary_text }}
                        >
                          {sortOptionsConfig.aToZ}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            onSelectSort(sortOptionsConfig.zToA);
                            setIsSortDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                          style={{ color: brandColors.secondary_text }}
                        >
                          {sortOptionsConfig.zToA}
                        </button>
                      </div>
                    )}
                  </div>
                );
              }

              // Nếu là button "Giá", hiển thị với dropdown
              if (isPrice) {
                return (
                  <div key={label} ref={priceDropdownRef} className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setIsPriceDropdownOpen(!isPriceDropdownOpen)
                      }
                      className="min-w-[150px] px-6 py-2 inline-flex items-center justify-center gap-2 rounded-sm border text-sm font-medium transition-colors cursor-pointer"
                      style={{
                        backgroundColor: isActive
                          ? brandColors.primary_background
                          : brandColors.secondary_background,
                        color: isActive
                          ? brandColors.primary_text
                          : brandColors.secondary_text,
                        borderColor: brandColors.border_color,
                        boxShadow: isActive
                          ? "0 8px 18px rgba(37,99,235,0.45)"
                          : undefined,
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = "#F5FBFF";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor =
                            brandColors.secondary_background;
                        }
                      }}
                    >
                      {getPriceButtonText()}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          isPriceDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown menu */}
                    {isPriceDropdownOpen && (
                      <div
                        className="absolute top-full left-0 mt-1 min-w-[200px] bg-white border rounded-md shadow-lg z-50"
                        style={{ borderColor: brandColors.border_color }}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            onSelectSort(priceOptions.lowToHigh);
                            setIsPriceDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                          style={{ color: brandColors.secondary_text }}
                        >
                          {priceOptions.lowToHigh}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            onSelectSort(priceOptions.highToLow);
                            setIsPriceDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                          style={{ color: brandColors.secondary_text }}
                        >
                          {priceOptions.highToLow}
                        </button>
                      </div>
                    )}
                  </div>
                );
              }

              // Nếu là button "Khuyến mại", hiển thị với dropdown
              if (isPromotion) {
                return (
                  <div
                    key={label}
                    ref={promotionDropdownRef}
                    className="relative"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setIsPromotionDropdownOpen(!isPromotionDropdownOpen)
                      }
                      className="min-w-[150px] px-6 py-2 inline-flex items-center justify-center gap-2 rounded-sm border text-sm font-medium transition-colors cursor-pointer"
                      style={{
                        backgroundColor: isActive
                          ? brandColors.primary_background
                          : brandColors.secondary_background,
                        color: isActive
                          ? brandColors.primary_text
                          : brandColors.secondary_text,
                        borderColor: brandColors.border_color,
                        boxShadow: isActive
                          ? "0 8px 18px rgba(37,99,235,0.45)"
                          : undefined,
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = "#F5FBFF";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor =
                            brandColors.secondary_background;
                        }
                      }}
                    >
                      {getPromotionButtonText()}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          isPromotionDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown menu */}
                    {isPromotionDropdownOpen && (
                      <div
                        className="absolute top-full left-0 mt-1 min-w-[200px] bg-white border rounded-md shadow-lg z-50"
                        style={{ borderColor: brandColors.border_color }}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            onSelectSort(promotionOptions.hasPromotion);
                            setIsPromotionDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                          style={{ color: brandColors.secondary_text }}
                        >
                          {promotionOptions.hasPromotion}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            onSelectSort(promotionOptions.noPromotion);
                            setIsPromotionDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                          style={{ color: brandColors.secondary_text }}
                        >
                          {promotionOptions.noPromotion}
                        </button>
                      </div>
                    )}
                  </div>
                );
              }

              // Các button khác giữ nguyên
              return (
                <button
                  type="button"
                  key={label}
                  onClick={() => onSelectSort(label)}
                  className="min-w-[150px] px-6 py-2 inline-flex items-center justify-center rounded-sm border text-sm font-medium transition-colors cursor-pointer"
                  style={{
                    backgroundColor: isActive
                      ? brandColors.primary_background
                      : brandColors.secondary_background,
                    color: isActive
                      ? brandColors.primary_text
                      : brandColors.secondary_text,
                    borderColor: brandColors.border_color,
                    boxShadow: isActive
                      ? "0 8px 18px rgba(37,99,235,0.45)"
                      : undefined,
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = "#F5FBFF";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor =
                        brandColors.secondary_background;
                    }
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Layout sidebar + nội dung chính */}
      <div className="container mx-auto px-4 pb-10 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Sidebar bộ lọc */}
        <CategoryFilterSidebar />

        {/* Nội dung chính */}
        <main className="lg:col-span-2 h-full w-full space-y-10">
          {/* Gợi ý cho bạn */}
          <ProductSuggestionsSection products={randomProducts} />

          {/* Tất cả sản phẩm */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {categoryContent.allProducts}
              </h2>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                {categoryContent.viewAll}
              </button>
            </div>

            <div className="space-y-6">
              {isCategoryProductsLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[...Array(9)].map((_, idx) => (
                    <div
                      key={idx}
                      className="h-72 bg-gray-200 rounded-lg animate-pulse"
                    />
                  ))}
                </div>
              ) : paginatedProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-40">
                  <p className="text-sm md:text-base text-gray-700 font-medium">
                    {categoryContent.noProducts}
                  </p>
                </div>
              )}

              {/* Phân trang */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 rounded border text-xs md:text-sm text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    {categoryContent.previous}
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }).map((_, index) => {
                      const page = index + 1;
                      const isActive = page === currentPage;

                      return (
                        <button
                          key={page}
                          type="button"
                          onClick={() => goToPage(page)}
                          className={`h-8 w-8 rounded text-xs md:text-sm flex items-center justify-center border transition-colors ${
                            isActive
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 rounded border text-xs md:text-sm text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    {categoryContent.next}
                  </button>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </>
  );
};
