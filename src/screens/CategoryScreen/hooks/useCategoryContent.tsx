import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useNewProducts } from "@/screens/HomeScreen/hooks/useNewProducts";
import type { Category } from "@/api/services/categoryService";
import type { Product } from "@/api/services/productService";
import { ProductService } from "@/api/services/productService";
import {
  categoryContent,
  sortOptions as sortOptionsConfig,
  priceOptions,
} from "@/config/content";

type ProductList = ReturnType<typeof useNewProducts>["products"];

type UseCategoryContentParams = {
  newProducts: ProductList;
  categories: Category[];
  activeCategoryId?: string;
  selectedSort?: string;
};

export const useCategoryContent = ({
  newProducts,
  categories,
  activeCategoryId,
  selectedSort,
}: UseCategoryContentParams) => {
  const sortOptions = categoryContent.sortOptions;

  const params = useParams<{ id: string }>();
  const routeCategoryId = params?.id;

  // Lấy ngẫu nhiên tối đa 10 sản phẩm từ newProducts
  const randomProducts = useMemo(() => {
    if (!newProducts || newProducts.length <= 10) {
      return newProducts;
    }

    const shuffled = [...newProducts].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10);
  }, [newProducts]);

  // Ref để scroll ngang danh sách gợi ý
  const suggestionScrollRef = useRef<HTMLDivElement | null>(null);

  const handleScrollSuggestions = (direction: "left" | "right") => {
    const container = suggestionScrollRef.current;
    if (!container) return;

    const scrollAmount = 100; // ~ width mỗi card
    const delta = direction === "left" ? -scrollAmount : scrollAmount;

    container.scrollBy({
      left: delta,
      behavior: "smooth",
    });
  };

  // State cho danh sách sản phẩm theo category (từ API)
  const PAGE_SIZE = 9;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [isCategoryProductsLoading, setIsCategoryProductsLoading] =
    useState<boolean>(false);

  // Lấy id category ưu tiên:
  // - Nếu có activeCategoryId (từ click) -> dùng id đó
  // - Nếu không có -> lấy id phần tử đầu tiên trong categories (nếu có)
  // - Nếu vẫn không có -> dùng params.id từ URL
  const targetCategoryId = useMemo(() => {
    if (activeCategoryId) {
      return String(activeCategoryId);
    }

    if (categories && categories.length > 0) {
      return String(categories[0].id);
    }

    return routeCategoryId ? String(routeCategoryId) : undefined;
  }, [activeCategoryId, categories, routeCategoryId]);

  // Reset về trang 1 khi category mục tiêu hoặc selectedSort thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [targetCategoryId, selectedSort]);

  // Gọi API lấy sản phẩm theo category
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      if (!targetCategoryId) {
        setCategoryProducts([]);
        setTotalPages(1);
        return;
      }

      try {
        setIsCategoryProductsLoading(true);

        // Chuẩn bị params cho API
        const apiParams: any = {
          category: targetCategoryId,
          page: currentPage,
          limit: PAGE_SIZE,
        };

        // Nếu selectedSort là "Mới nhất", thêm sort và order
        if (selectedSort === "Mới nhất") {
          apiParams.sort = "createdAt";
          apiParams.order = "desc";
        }

        // Nếu selectedSort là "HOT", thêm isHot
        if (selectedSort === "HOT") {
          apiParams.isHot = true;
        }

        // Nếu selectedSort là "Có khuyến mãi", thêm discount: true
        if (selectedSort === "Có khuyến mãi") {
          apiParams.discount = true;
        }

        // Nếu selectedSort là "Không khuyến mãi", thêm discount: false
        if (selectedSort === "Không khuyến mãi") {
          apiParams.discount = false;
        }

        // Nếu selectedSort là "Từ A đến Z", thêm sort và order
        if (selectedSort === sortOptionsConfig.aToZ) {
          apiParams.sort = "name";
          apiParams.order = "asc";
        }

        // Nếu selectedSort là "Từ Z đến A", thêm sort và order
        if (selectedSort === sortOptionsConfig.zToA) {
          apiParams.sort = "name";
          apiParams.order = "desc";
        }

        // Nếu selectedSort là "Giá thấp đến cao", thêm sort và order
        if (selectedSort === priceOptions.lowToHigh) {
          apiParams.sort = "price";
          apiParams.order = "asc";
        }

        // Nếu selectedSort là "Giá cao đến thấp", thêm sort và order
        if (selectedSort === priceOptions.highToLow) {
          apiParams.sort = "price";
          apiParams.order = "desc";
        }

        const response = await ProductService.listProducts(apiParams);

        if (response.success && response.data) {
          setCategoryProducts(response.data.docs || []);
          setTotalPages(response.data.totalPages || 1);
        } else {
          setCategoryProducts([]);
          setTotalPages(1);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Failed to fetch products by category:", error);
        setCategoryProducts([]);
        setTotalPages(1);
      } finally {
        setIsCategoryProductsLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [targetCategoryId, currentPage, selectedSort]);

  const paginatedProducts = categoryProducts;

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  return {
    sortOptions,
    randomProducts,
    suggestionScrollRef,
    handleScrollSuggestions,
    paginatedProducts,
    currentPage,
    totalPages,
    goToPage,
    goToPreviousPage,
    goToNextPage,
    isCategoryProductsLoading,
  };
};
