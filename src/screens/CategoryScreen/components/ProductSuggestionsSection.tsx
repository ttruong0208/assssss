"use client";

import { useRef } from "react";
import { ProductCard } from "@/components/products/ProductCard";
import type { Product } from "@/api/services/productService";
import { productSuggestionsSection, categoryContent } from "@/config/content";

type ProductSuggestionsSectionProps = {
  products: Product[];
};

export const ProductSuggestionsSection = ({
  products,
}: ProductSuggestionsSectionProps) => {
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

  return (
    <section>
      <div className="flex items-center justify-between ">
        <h2 className="text-2xl font-bold text-gray-900">
          {productSuggestionsSection.title}
        </h2>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
          {categoryContent.viewAll}
        </button>
      </div>

      <div className="relative flex items-center ">
        {/* Nút scroll trái */}
        <button
          type="button"
          aria-label={productSuggestionsSection.scrollLeft}
          className="flex absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-1/2 h-9 w-9 items-center justify-center rounded-full bg-white shadow-md border border-gray-200 hover:bg-gray-50"
          onClick={() => handleScrollSuggestions("left")}
        >
          <span className="text-lg leading-none text-gray-700">{"<"}</span>
        </button>

        {/* Danh sách sản phẩm gợi ý */}
        <div
          ref={suggestionScrollRef}
          className="flex gap-4 overflow-x-auto hide-scrollbar "
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="w-64 flex-shrink-0 sm:w-60 md:w-64 lg:w-64 "
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Nút scroll phải */}
        <button
          type="button"
          aria-label={productSuggestionsSection.scrollRight}
          className="flex absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-1/2 h-9 w-9 items-center justify-center rounded-full bg-white shadow-md border border-gray-200 hover:bg-gray-50"
          onClick={() => handleScrollSuggestions("right")}
        >
          <span className="text-lg leading-none text-gray-700">{">"}</span>
        </button>
      </div>
    </section>
  );
};
