"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/api/services/productService";
import { formatNumberWithSpaces } from "@/lib/utils";

interface NewProductCardProps {
  product: Product;
  brandName?: string;
}

export const NewProductCard = ({ product }: NewProductCardProps) => {
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

  // Tính giá thấp nhất từ tất cả sizes (nếu có sizes với price)
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
      className="group flex flex-col bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
    >
      {/* Product Image - Square với background hồng nhạt */}
      <div className="relative w-full aspect-square bg-pink-50 overflow-hidden">
        {(product as any).thumbnail?.url ? (
          <Image
            src={(product as Product).thumbnail?.url || ""}
            alt={(product as Product).thumbnail?.alt || ""}
            fill
            className="object-cover group-hover:scale-105 transition-transform"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 bg-pink-50">
            No Image
          </div>
        )}
        {/* Brand Badge - Màu xanh nhạt với chữ trắng */}
        {(product as Product).brand?.name && (
          <div className="absolute top-2 left-2 bg-blue-300 text-white text-xs font-medium px-2 py-1 rounded-md">
            {(product as Product).brand?.name}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        {/* Product Title - 2 dòng */}
        <h3 className="text-sm font-normal text-black line-clamp-2 min-h-[2.5rem] leading-snug">
          {productName}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2 mt-auto pt-2">
          {isOutOfStock() ? (
            <span className="text-base font-bold text-red-500">Hết hàng</span>
          ) : (
            <>
              <span className="text-lg font-bold text-red-600">
                {formatNumberWithSpaces(Number(displayPrice))}
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};
