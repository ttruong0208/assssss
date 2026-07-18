import { useState, useEffect } from "react";
import { ProductService, Product } from "@/api/services/productService";

export const useHotProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await ProductService.listProducts({
          isHot: true,
          limit: 10,
          page: 1,
        });

        if (response.success && response.data) {
          setProducts(response.data.docs || []);
        } else {
          setError(response.error || "Không thể tải sản phẩm");
        }
      } catch (err) {
        setError("Đã xảy ra lỗi khi tải sản phẩm");
        console.error("Error fetching hot products:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHotProducts();
  }, []);

  return { products, isLoading, error };
};
