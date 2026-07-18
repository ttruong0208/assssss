import { useState, useEffect } from "react";
import { CategoryService, Category } from "@/api/services/categoryService";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await CategoryService.listCategories({
          status: "active",
          limit: 12,
          page: 1,
        });

        if (response.success && response.data) {
          setCategories(response.data.docs || []);
        } else {
          setError(response.error || "Không thể tải danh mục");
        }
      } catch (err) {
        setError("Đã xảy ra lỗi khi tải danh mục");
        console.error("Error fetching categories:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, isLoading, error };
};
