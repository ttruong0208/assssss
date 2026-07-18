import { useState, useEffect } from "react";
import { ProductService, Product } from "@/api/services/productService";

export const useNewProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Fetch products sorted by creation date (newest first)
        const response = await ProductService.listProducts({
          limit: 10,
          page: 1,
          sort: "createdAt",
          order: "desc",
        });

        if (response.success && response.data) {
          setProducts(response.data.docs || []);
        } else {
          setError(response.error || "Không thể tải sản phẩm");
        }
      } catch (err) {
        setError("Đã xảy ra lỗi khi tải sản phẩm");
        console.error("Error fetching new products:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNewProducts();
  }, []);

  return { products, isLoading, error };
};

/**
 * Hook quản lý state chọn size và giá cho từng NewProductCard
 */
export const useNewProductCard = (product: Product) => {
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number | null>(
    null
  );
  const [selectedSize, setSelectedSize] = useState<any | null>(null);

  // Chọn mặc định size đầu tiên có quantity > 0 (nếu có)
  useEffect(() => {
    if (product.sizes && product.sizes.length > 0) {
      const firstAvailableIndex = product.sizes.findIndex((size: any) => {
        const qty = (size as any).quantity;
        return qty === undefined || qty === null || qty > 0;
      });

      if (firstAvailableIndex >= 0) {
        setSelectedSizeIndex(firstAvailableIndex);
        setSelectedSize(product.sizes[firstAvailableIndex]);
      } else {
        setSelectedSizeIndex(null);
        setSelectedSize(null);
      }
    } else {
      setSelectedSizeIndex(null);
      setSelectedSize(null);
    }
  }, [product.sizes]);

  const handleSelectSize = (index: number, size: any) => {
    setSelectedSizeIndex(index);
    setSelectedSize(size);
  };

  const displayPrice = selectedSize?.price ?? product.price;
  const displayOriginalPrice =
    selectedSize?.originalPrice ?? product.originalPrice;

  return {
    selectedSizeIndex,
    selectedSize,
    handleSelectSize,
    displayPrice,
    displayOriginalPrice,
  };
};
