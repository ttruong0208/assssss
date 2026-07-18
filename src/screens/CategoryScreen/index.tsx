"use client";

import { useEffect, useState } from "react";
import type { Category } from "@/api/services/categoryService";
import { ProfessionalSection } from "@/screens/HomeScreen/components/ProfessionalSection";
import { CategorySection } from "@/screens/HomeScreen/components/CategorySection";
import { CategoryContent } from "@/screens/CategoryScreen/components/CategoryContent";
import { useCategoryScreen } from "@/screens/CategoryScreen/hooks/useCategoryScreen";
import { EventsSection } from "../HomeScreen/components/EventsSection";
import { useEvents } from "../HomeScreen/hooks/useEvents";
import { LoadingSpinner } from "@/lib/loadingSpinner";

export const CategoryScreen = () => {
  const {
    selectedSort,
    setSelectedSort,
    categories,
    isLoading,
    newProducts,
    isLoadingNew,
    handleCategoryClick,
  } = useCategoryScreen();
  const { events, isLoading: isLoadingEvents } = useEvents();
  const isScreenLoading = isLoading || isLoadingNew || isLoadingEvents;
  const [activeCategoryId, setActiveCategoryId] = useState<
    string | undefined
  >();

  // Set mặc định category active là phần tử đầu tiên khi lần đầu load danh sách
  useEffect(() => {
    if (categories && categories.length > 0) {
      setActiveCategoryId((prev) => prev ?? categories[0].id);
    }
  }, [categories]);

  const handleCategoryClickWithActive = (category: Category) => {
    // Cập nhật id category đang active
    setActiveCategoryId(category.id);
    // Giữ nguyên logic điều hướng / fetch data cũ
    handleCategoryClick(category);
  };

  return (
    <div className="min-h-screen bg-white">
      {isScreenLoading && <LoadingSpinner />}
      {/* Banner chuyên nghiệp phía trên */}
      <ProfessionalSection screen="home" position="top" />
      <CategorySection
        categories={categories}
        isLoading={isLoading}
        getCategoryHref={handleCategoryClickWithActive}
        activeCategoryId={activeCategoryId}
      />
      <CategoryContent
        selectedSort={selectedSort}
        onSelectSort={setSelectedSort}
        categories={categories}
        isCategoryLoading={isLoading}
        newProducts={newProducts}
        isNewLoading={isLoadingNew}
        onCategoryClick={handleCategoryClickWithActive}
        activeCategoryId={activeCategoryId}
      />
      <EventsSection events={events} isLoading={isLoadingEvents} />
    </div>
  );
};
