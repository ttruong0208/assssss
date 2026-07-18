"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";
import { Product } from "@/api/services/productService";
import { formatNumberWithSpaces } from "@/lib/utils";
import { productCard } from "@/config/content";

export interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const toPlainText = (value: unknown): string => {
    if (typeof value === "string") return value;
    if (!value || typeof value !== "object") return "";

    const raw =
      (value as any).html ||
      (value as any).text ||
      (value as any).content ||
      "";

    if (typeof raw !== "string") return "";
    return raw.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  };

  const getLowestPrice = () => {
    if (product.sizes && product.sizes.length > 0) {
      const pricesWithValues = product.sizes
        .map((size: any) => {
          if (size.price != null) {
            return Number(size.price);
          }
          return null;
        })
        .filter((price): price is number => price !== null);

      if (pricesWithValues.length > 0) {
        return Math.min(...pricesWithValues);
      }
    }
    return product.price;
  };

  const displayPrice = getLowestPrice();
  const productName = toPlainText(product.name) || "Sản phẩm";

  // Kiểm tra hết hàng: nếu có sizes thì kiểm tra xem có size nào còn hàng không
  const isOutOfStock = () => {
    if (product.sizes && product.sizes.length > 0) {
      // Kiểm tra xem có size nào còn hàng không
      const hasAvailableSize = product.sizes.some((size: any) => {
        const qty = (size as any).quantity;
        return qty === undefined || qty === null || qty > 0;
      });
      return !hasAvailableSize;
    }
    return (product.quantity ?? 0) <= 0;
  };
  return (
    <Link
      href=""
      className="group flex  flex-col bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
    >
      {/* Product Image */}
      <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
        {(product as any).thumbnail?.url ? (
          <Image
            src={(product as any).thumbnail?.url || ""}
            alt={(product as any).thumbnail?.alt || ""}
            fill
            className="object-cover group-hover:scale-105 transition-transform"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            {productCard.noImage}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        {/* Product Title */}
        <h3 className="text-sm font-medium text-black leading-snug overflow-hidden text-ellipsis whitespace-nowrap">
          {productName}
        </h3>

        {/* Rating and Sales */}
        <div className="flex items-center gap-2 text-sm text-black min-h-[1.5rem]">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{product.rating}</span>
          </div>
          <span className="text-gray-400">|</span>
          <span className="text-gray-600">
            {productCard.sold} {product?.soldQuantity ?? 0}
          </span>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex flex-col gap-0.5">
            {isOutOfStock() ? (
              <span className="text-base font-bold text-red-500 ">
                {productCard.outOfStock}
              </span>
            ) : (
              <>
                <span className="text-base font-bold text-black">
                  {formatNumberWithSpaces(displayPrice)} ₫
                </span>
              </>
            )}
          </div>
          {!isOutOfStock() && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // TODO: Add to cart logic
              }}
              className=" rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
              aria-label={productCard.addToCart}
            >
              <ShoppingCart className="w-5 h-5 text-gray-700" />
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};
