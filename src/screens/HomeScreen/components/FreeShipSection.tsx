"use client";

import Link from "next/link";
import { FreeShipProductCard } from "./FreeShipProductCard";
import { Product } from "@/api/services/productService";

interface FreeShipSectionProps {
  products?: Product[];
  isLoading?: boolean;
}

export const FreeShipSection = ({
  products = [],
  isLoading = false,
}: FreeShipSectionProps) => {
  // Nếu không loading và không có sản phẩm free ship thì ẩn section
  if (!isLoading && products.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-black">Free Ship</h2>
        <Link
          href="/products?filter=free-ship"
          className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          Xem tất cả
        </Link>
      </div>

      {/* Products Grid - 2 columns */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 rounded-lg h-64 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((product: Product) => (
            <FreeShipProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
