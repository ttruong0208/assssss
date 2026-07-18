import { useState, useEffect } from "react";
import { ProductService, Product } from "@/api/services/productService";

export const useFreeShipProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFreeShipProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // TODO: Add freeShip filter when API supports it
        const response = await ProductService.listProducts({
          isFreeShip: true,
          limit: 6,
          page: 1,
        });

        if (response.success && response.data) {
          console.log("response.data.docs", response.data.docs);
          setProducts(response.data.docs || []);
        } else {
          setError(response.error || "Không thể tải sản phẩm");
        }
      } catch (err) {
        setError("Đã xảy ra lỗi khi tải sản phẩm");
        console.error("Error fetching free ship products:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFreeShipProducts();
  }, []);

  return { products, isLoading, error };
};

/**
 * Hook quản lý state chọn size và giá cho FreeShipProductCard
 */
export const useFreeShipProductCard = (product: Product) => {
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

  const isOutOfStock = (() => {
    const sizeQty =
      (selectedSize as any)?.quantity ?? (selectedSize as any)?.quality;
    if (selectedSize) {
      return (sizeQty ?? 0) <= 0;
    }
    const productQty = (product as any).quantity ?? 0;
    return productQty <= 0;
  })();

  return {
    selectedSizeIndex,
    selectedSize,
    handleSelectSize,
    displayPrice,
    displayOriginalPrice,
    isOutOfStock,
  };
};
