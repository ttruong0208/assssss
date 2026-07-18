"use client";

import Link from "next/link";
import { ProductCard } from "./ProductCard";
import { Product } from "@/api/services/productService";

interface HotProductsSectionProps {
  products?: Product[];
  isLoading?: boolean;
}

export const HotProductsSection = ({
  products = [],
  isLoading = false,
}: HotProductsSectionProps) => {
  // Nếu không loading và không có sản phẩm thì ẩn toàn bộ section
  if (!isLoading && products.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-black">Sản phẩm HOT</h2>
        <Link
          href="/products?filter=hot"
          className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          Xem tất cả
        </Link>
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 rounded-lg aspect-square animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
