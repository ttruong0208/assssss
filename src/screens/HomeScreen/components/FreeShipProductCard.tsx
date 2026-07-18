"use client";

import Image from "next/image";
import Link from "next/link";
import { Truck } from "lucide-react";
import { Product } from "@/api/services/productService";
import { formatNumberWithSpaces } from "@/lib/utils";

interface FreeShipProductCardProps {
  product: Product;
  discountPercentage?: number;
  cashbackPercentage?: number;
  shippingDistance?: string;
}

export const FreeShipProductCard = ({ product }: FreeShipProductCardProps) => {
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

  // Tính giá gốc thấp nhất từ tất cả sizes (nếu có sizes với originalPrice)
  const getLowestOriginalPrice = () => {
    if (product.sizes && product.sizes.length > 0) {
      const originalPricesWithValues = product.sizes
        .map((size: any) => {
          if (size.originalPrice != null) {
            return Number(size.originalPrice);
          }
          return null;
        })
        .filter((price): price is number => price !== null);

      if (originalPricesWithValues.length > 0) {
        return Math.min(...originalPricesWithValues);
      }
    }
    return product.originalPrice;
  };

  const displayOriginalPrice = getLowestOriginalPrice();
  const productName = toPlainText(product.name) || "Sản phẩm";
  const productDescription = toPlainText(product.description);

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
      className="group flex flex-row bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
    >
      {/* Product Image - Portrait orientation */}
      <div className="relative w-32 h-40 md:w-40 md:h-48 flex-shrink-0 bg-gray-100 overflow-hidden">
        {(product as any).thumbnail?.url ? (
          <Image
            src={(product as any).thumbnail?.url || ""}
            alt={(product as any).thumbnail?.alt || ""}
            fill
            className="object-cover group-hover:scale-105 transition-transform"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
        {/* Discount Badge - Pink với text dark gray */}
        {product.originalPrice &&
        product.originalPrice > product.price &&
        Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        ) > 0 ? (
          <div className="absolute top-2 left-2 bg-pink-200 text-gray-700 text-xs font-bold px-2 py-1 rounded-md">
            -
            {Math.round(
              ((product.originalPrice - product.price) /
                product.originalPrice) *
                100
            )}
            %
          </div>
        ) : null}
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col gap-2 flex-1 min-w-0">
        {/* Product Name */}
        <h3 className="text-base font-bold text-black">
          {productName}
        </h3>

        {/* Cashback Info */}
        {/* <div className="text-sm text-gray-600">Hoàn {cashbackPercentage}%</div> */}

        {/* Product Description */}
        <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
          {productDescription}
        </p>

        {/* Shipping Info */}
        {/* <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
          <Truck className="w-4 h-4" />
          <span className="font-medium">{shippingDistance} Free</span>
        </div> */}

        {/* Price */}
        <div className="flex items-center gap-2 mt-auto pt-2">
          {isOutOfStock() ? (
            <span className="text-base font-bold text-red-500">Hết hàng</span>
          ) : (
            <>
              <span className="text-lg font-bold text-red-600">
                ${formatNumberWithSpaces(Number(displayPrice))}
              </span>
              {displayOriginalPrice && displayOriginalPrice > displayPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ${formatNumberWithSpaces(Number(displayOriginalPrice))}
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </Link>
  );
};
