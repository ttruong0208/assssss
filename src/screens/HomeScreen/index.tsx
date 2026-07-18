"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BannerSection } from "./components/BannerSection";
import { CategorySection } from "./components/CategorySection";
import { HotProductsSection } from "./components/HotProductsSection";
import { FreeShipSection } from "./components/FreeShipSection";
import { NewProductsSection } from "./components/NewProductsSection";
import { ProfessionalSection } from "./components/ProfessionalSection";
import { EventsSection } from "./components/EventsSection";
import { NewsSection } from "./components/NewsSection";
import { useHotProducts } from "./hooks/useHotProducts";
import { useFreeShipProducts } from "./hooks/useFreeShipProducts";
import { useNewProducts } from "./hooks/useNewProducts";
import { useEvents } from "./hooks/useEvents";
import { useNews } from "./hooks/useNews";
import { useCategories } from "./hooks/useCategories";

export const HomeScreen = () => {
  const router = useRouter();
  const [activeCategoryId, setActiveCategoryId] = useState<
    string | undefined
  >();
  const { categories, isLoading: isLoadingCategories } = useCategories();
  const { products: hotProducts, isLoading: isLoadingHot } = useHotProducts();
  const { products: freeShipProducts, isLoading: isLoadingFreeShip } =
    useFreeShipProducts();
  const { products: newProducts, isLoading: isLoadingNew } = useNewProducts();
  const { events, isLoading: isLoadingEvents } = useEvents();
  const { news, featuredNews, isLoading: isLoadingNews } = useNews();

  return (
    <div className="min-h-screen bg-white">
      {/* Banner Section */}
      <BannerSection />

      {/* Category Section */}
      <CategorySection
        categories={categories.filter((category) => !category.parent)}
        isLoading={isLoadingCategories}
        getCategoryHref={(category) => {
          // Set active category theo item được click
          setActiveCategoryId(category.id);
          router.push(`/category/${category.id}`);
        }}
        activeCategoryId={activeCategoryId}
      />

      {/* Hot Products Section */}
      <HotProductsSection products={hotProducts} isLoading={isLoadingHot} />

      {/* Free Ship Section */}
      <FreeShipSection
        products={freeShipProducts}
        isLoading={isLoadingFreeShip}
      />

      {/* New Products Section */}
      <NewProductsSection products={newProducts} isLoading={isLoadingNew} />

      {/* Professional Section */}
      <ProfessionalSection screen="home" position="middle" />

      {/* Events Section */}
      <EventsSection events={events} isLoading={isLoadingEvents} />

      {/* News Section */}
      <NewsSection
        news={news}
        featuredNews={featuredNews}
        isLoading={isLoadingNews}
      />
    </div>
  );
};
