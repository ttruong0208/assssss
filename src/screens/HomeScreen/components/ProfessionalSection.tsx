"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProfessionalBanners } from "@/screens/HomeScreen/hooks/useProfessionalBanners";
import { useBannerCarousel } from "@/screens/HomeScreen/hooks/useBannerCarousel";

export const ProfessionalSection = ({
  screen,
  position,
}: {
  screen:
    | "home"
    | "product"
    | "product-list"
    | "product-detail"
    | "event"
    | "event-list"
    | "event-detail"
    | "news"
    | "news-list"
    | "news-detail"
    | "cart"
    | "checkout"
    | "profile"
    | "other";
  position: "top" | "middle" | "bottom";
}) => {
  const { banners, isLoading } = useProfessionalBanners(screen, position);
  const {
    currentBanner,
    isHovered,
    setIsHovered,
    canGoPrevious,
    canGoNext,
    handlePrevious,
    handleNext,
    currentIndex,
  } = useBannerCarousel(banners);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Banner - Carousel từ API */}
        {isLoading ? (
          <div className="relative h-96 md:h-[600px] rounded-lg overflow-hidden bg-gray-200 animate-pulse"></div>
        ) : currentBanner ? (
          <div
            className="relative h-96 md:h-[600px] rounded-lg overflow-hidden group shadow-md hover:shadow-lg transition-shadow"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Link
              href={currentBanner.link || "#"}
              className="relative block w-full h-full"
            >
              {currentBanner.image?.url ? (
                <>
                  <Image
                    src={currentBanner.image.url}
                    alt={
                      currentBanner.image.alt || currentBanner.title || "Banner"
                    }
                    fill
                    className="object-cover transition-transform duration-500"
                    key={currentIndex}
                  />
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/10"></div>
                </>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-red-700 via-red-600 to-red-800"></div>
              )}
            </Link>

            {/* Navigation Arrows - Hiển thị khi hover và có thể điều hướng */}
            {banners.length > 1 && (
              <>
                {/* Left Arrow - Ẩn khi ở ảnh đầu tiên */}
                {canGoPrevious && (
                  <Button
                    onClick={handlePrevious}
                    className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-700 shadow-lg rounded-full p-2 transition-opacity duration-300 ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                    aria-label="Previous banner"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                )}

                {/* Right Arrow - Ẩn khi ở ảnh cuối */}
                {canGoNext && (
                  <Button
                    onClick={handleNext}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-700 shadow-lg rounded-full p-2 transition-opacity duration-300 ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                    aria-label="Next banner"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                )}
              </>
            )}

            {/* Dots Indicator - Dot hiện tại màu xanh */}
            {banners.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {banners.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex ? "bg-blue-500" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/promotions/survive-cosmetics"
            className="relative h-96 md:h-[600px] rounded-lg overflow-hidden group shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="w-full h-full bg-gradient-to-br from-red-700 via-red-600 to-red-800 relative overflow-hidden">
              {/* Background gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-red-900/30 via-red-800/10 to-transparent"></div>

              {/* Large Yellow Number "1" - Right side */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 text-yellow-400 text-[12rem] md:text-[18rem] font-black leading-none opacity-70">
                1
              </div>

              {/* Text Content - Left side */}
              <div className="absolute left-6 top-6 flex flex-col gap-1 z-10">
                <div className="text-yellow-400 text-4xl md:text-5xl font-black leading-tight drop-shadow-lg">
                  Survive
                </div>
                <div className="text-yellow-400 text-xs md:text-sm font-medium leading-tight drop-shadow-md opacity-90">
                  PreviousCreate 1 Ovan
                </div>
                <div className="text-yellow-400 text-5xl md:text-6xl font-black leading-tight drop-shadow-lg">
                  Cosmetics
                </div>
                <div className="text-yellow-400 text-xs md:text-sm font-medium leading-tight drop-shadow-md opacity-80 mt-2">
                  sales flash image
                </div>
              </div>

              {/* Mock Cosmetic Products - Bottom center */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-end gap-3 z-10">
                {/* Gold cap */}
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-lg"></div>
                {/* White jar with gold lid */}
                <div className="w-10 h-12 bg-white rounded-lg shadow-lg relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-3 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-t-lg"></div>
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-6 h-8 bg-pink-100 rounded-b-lg"></div>
                </div>
                {/* Red lipstick open */}
                <div className="w-6 h-14 bg-gradient-to-b from-red-500 to-red-700 rounded-t-full shadow-lg relative">
                  <div className="absolute top-0 w-full h-2 bg-yellow-400 rounded-t-full"></div>
                  <div className="absolute top-2 w-full h-3 bg-red-600 rounded-t-full"></div>
                </div>
                {/* White tube */}
                <div className="w-5 h-10 bg-white rounded-t-full shadow-lg relative">
                  <div className="absolute top-0 w-full h-2 bg-gray-300 rounded-t-full"></div>
                </div>
              </div>

              {/* Button */}
              <div className="absolute bottom-4 left-6 z-10">
                <div className="bg-red-600 text-white text-xs font-medium px-4 py-2 rounded shadow-lg">
                  coscomba
                </div>
              </div>

              {/* Product code */}
              <div className="absolute bottom-4 right-6 text-yellow-400/60 text-xs font-mono z-10">
                c982-y252
              </div>
            </div>
          </Link>
        )}

        {/* Right Side - Two smaller banners (50% width, stacked) */}
        <div className="flex flex-col gap-4">
          {/* Top Right - Women's Fashion Mannequins */}
          <Link
            href="/sales/womens-fashion"
            className="relative h-48 md:h-[290px] rounded-lg overflow-hidden group shadow-md hover:shadow-lg transition-shadow flex-1"
          >
            <div className="w-full h-full bg-gradient-to-br from-pink-100 via-pink-50 to-pink-200 relative">
              {/* Sale Text */}
              <div className="absolute top-4 left-4 text-white text-2xl md:text-3xl font-bold italic drop-shadow-lg tracking-wide">
                Sale
              </div>

              {/* Women's Fashion Sales Text */}
              <div className="absolute top-10 left-4 text-white text-xs md:text-sm font-semibold drop-shadow-md">
                Women&apos;s Fashion Sales
              </div>

              {/* Mannequins with Outfits */}
              <div className="absolute bottom-4 left-0 right-0 flex items-end justify-center gap-2 md:gap-3 px-2">
                {/* Mannequin 1 - Teal Dress */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-6 h-16 bg-teal-500 rounded-t-full relative">
                    <div className="absolute -left-1 top-3 w-3 h-3 bg-gradient-to-br from-teal-400 via-orange-300 to-gray-300 rounded"></div>
                  </div>
                  <div className="w-2 h-2 bg-amber-100 rounded-full"></div>
                </div>

                {/* Mannequin 2 - Yellow Dress */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-6 h-20 bg-yellow-500 rounded-t-full relative">
                    <div className="absolute top-6 w-full h-2 bg-pink-400"></div>
                  </div>
                  <div className="w-2 h-2 bg-orange-300 rounded-full"></div>
                </div>

                {/* Mannequin 3 - White Blouse + Pink Pants */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-6 h-16 bg-white rounded-t-full relative">
                    <div className="absolute -left-1 top-1 w-3 h-3 bg-gradient-to-br from-teal-400 via-orange-300 to-white rounded"></div>
                    <div className="absolute bottom-0 w-full h-6 bg-pink-400 rounded-b-full"></div>
                  </div>
                  <div className="w-2 h-2 bg-orange-300 rounded-full"></div>
                </div>

                {/* Mannequin 4 - Coral Blazer */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-6 h-16 bg-orange-400 rounded-t-full relative">
                    <div className="absolute top-1 w-full h-5 bg-white rounded"></div>
                    <div className="absolute bottom-0 w-full h-6 bg-teal-400 rounded-b-full"></div>
                  </div>
                  <div className="w-2 h-2 bg-amber-700 rounded-full"></div>
                </div>
              </div>
            </div>
          </Link>

          {/* Bottom Right - Professional Women in Office */}
          <Link
            href="/categories/professional-wear"
            className="relative h-48 md:h-[290px] rounded-lg overflow-hidden group shadow-md hover:shadow-lg transition-shadow flex-1"
          >
            <div className="w-full h-full bg-gradient-to-br from-gray-50 via-white to-pink-50 relative">
              {/* Windows with cityscape */}
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-blue-100/50 via-transparent to-transparent">
                {/* Window frames */}
                <div className="absolute top-4 right-4 w-24 h-32 border-2 border-gray-300 rounded bg-white/20 backdrop-blur-sm">
                  <div className="absolute inset-1 bg-gradient-to-b from-blue-200/30 to-gray-300/20 rounded"></div>
                </div>
                <div className="absolute top-4 right-32 w-24 h-32 border-2 border-gray-300 rounded bg-white/20 backdrop-blur-sm">
                  <div className="absolute inset-1 bg-gradient-to-b from-blue-200/30 to-gray-300/20 rounded"></div>
                </div>
              </div>

              {/* Large curved coral/pink graphic element */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-pink-200/40 via-coral-200/30 to-transparent rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>

              {/* Office Furniture */}
              <div className="absolute bottom-0 left-0 w-full h-1/4">
                {/* Desk */}
                <div className="absolute bottom-0 left-4 w-24 h-3 bg-gray-200 rounded shadow-md"></div>
                {/* Monitor */}
                <div className="absolute bottom-4 left-6 w-16 h-12 bg-gray-800 rounded shadow-lg">
                  <div className="absolute inset-1 bg-blue-100 rounded"></div>
                </div>
              </div>

              {/* Professional Women - Standing figures */}
              <div className="absolute bottom-8 left-0 right-0 flex items-end justify-center gap-2 md:gap-3 px-2 z-10">
                {/* Woman 1 - Coral/pink blazer */}
                <div className="flex flex-col items-center gap-0.5">
                  <div className="w-8 h-20 bg-gradient-to-b from-pink-300 to-pink-400 rounded-t-full relative">
                    <div className="absolute top-0 w-full h-6 bg-pink-200 rounded-t-full"></div>
                    <div className="absolute bottom-0 w-full h-8 bg-pink-500 rounded-b-full"></div>
                  </div>
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                </div>

                {/* Woman 2 - Teal/light blue blazer with glasses */}
                <div className="flex flex-col items-center gap-0.5">
                  <div className="w-8 h-20 bg-gradient-to-b from-teal-400 to-teal-500 rounded-t-full relative">
                    <div className="absolute top-0 w-full h-6 bg-teal-300 rounded-t-full"></div>
                    <div className="absolute bottom-0 w-full h-8 bg-teal-600 rounded-b-full"></div>
                  </div>
                  <div className="w-3 h-3 bg-gray-700 rounded-full relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-2 border-2 border-gray-600 rounded"></div>
                  </div>
                </div>

                {/* Woman 3 - Mustard yellow/gold blazer (central, prominent) */}
                <div className="flex flex-col items-center gap-0.5 scale-110">
                  <div className="w-10 h-24 bg-gradient-to-b from-yellow-500 to-orange-500 rounded-t-full relative shadow-lg">
                    <div className="absolute top-0 w-full h-8 bg-yellow-400 rounded-t-full"></div>
                    <div className="absolute bottom-0 w-full h-10 bg-orange-600 rounded-b-full"></div>
                  </div>
                  <div className="w-4 h-4 bg-amber-200 rounded-full"></div>
                </div>

                {/* Woman 4 - Dark navy/black blazer */}
                <div className="flex flex-col items-center gap-0.5">
                  <div className="w-8 h-20 bg-gradient-to-b from-gray-800 to-gray-900 rounded-t-full relative">
                    <div className="absolute top-0 w-full h-6 bg-gray-700 rounded-t-full"></div>
                    <div className="absolute bottom-0 w-full h-8 bg-gray-900 rounded-b-full"></div>
                  </div>
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                </div>

                {/* Woman 5 - Mustard yellow/gold blazer (partially visible) */}
                <div className="flex flex-col items-center gap-0.5 opacity-60">
                  <div className="w-6 h-16 bg-gradient-to-b from-yellow-500 to-orange-500 rounded-t-full relative">
                    <div className="absolute top-0 w-full h-5 bg-yellow-400 rounded-t-full"></div>
                    <div className="absolute bottom-0 w-full h-6 bg-orange-600 rounded-b-full"></div>
                  </div>
                  <div className="w-2 h-2 bg-amber-300 rounded-full"></div>
                </div>
              </div>

              {/* Text Overlay */}
              <div className="absolute top-4 left-4 z-20">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-1">
                  Professional Wear
                </h2>
                <p className="text-xs md:text-sm text-gray-600">
                  Modern business fashion
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
