"use client";

import Link from "next/link";
import { NewProductCard } from "./NewProductCard";
import { Product } from "@/api/services/productService";

interface NewProductsSectionProps {
  products?: Product[];
  isLoading?: boolean;
}

export const NewProductsSection = ({
  products = [],
  isLoading = false,
}: NewProductsSectionProps) => {
  // Ẩn section nếu không loading và không có products
  if (!isLoading && products.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-black">Sản phẩm mới</h2>
        <Link
          href="/products?sort=createdAt&order=desc"
          className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          Xem tất cả
        </Link>
      </div>

      {/* Products Grid - 5 columns */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 rounded-lg aspect-square animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <NewProductCard
              key={product.id}
              product={product}
              brandName={product.brand?.name}
            />
          ))}
        </div>
      )}
    </div>
  );
};
