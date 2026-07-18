"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Category, CategoryService } from "@/api/services/categoryService";
import { useNewProducts } from "@/screens/HomeScreen/hooks/useNewProducts";

export const useCategoryScreen = () => {
  const [selectedSort, setSelectedSort] = useState<string>("Mới nhất");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const params = useParams<{ id: string }>();
  const router = useRouter();
  const categoryId = params?.id;

  const { products: newProducts, isLoading: isLoadingNew } = useNewProducts();

  useEffect(() => {
    const fetchCategories = async () => {
      if (!categoryId) return;

      try {
        setIsLoading(true);
        const response = await CategoryService.listCategories({
          status: "active",
          parent: String(categoryId),
        });

        if (response.success && response.data) {
          setCategories(response.data.docs || []);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error("Failed to fetch categories by parent:", error);
        setCategories([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [categoryId]);

  const handleCategoryClick = (category: Category) => {
    // router.push(`/category/${category.id}`);
  };

  return {
    selectedSort,
    setSelectedSort,
    categories,
    isLoading,
    newProducts,
    isLoadingNew,
    handleCategoryClick,
  };
};
