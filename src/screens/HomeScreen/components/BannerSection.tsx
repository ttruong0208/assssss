"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBanners } from "@/screens/HomeScreen/hooks/useBanners";
import { useBannerCarousel } from "@/screens/HomeScreen/hooks/useBannerCarousel";

export const BannerSection = () => {
  const { banners, isLoading } = useBanners("home", "top");
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
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-[20%_60%_20%] gap-4">
        {/* Left Banner - Retail Interior */}
        <Link
          href="/categories/retail"
          className="relative h-64 md:h-80 rounded-lg overflow-hidden group shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="w-full h-full bg-gradient-to-br from-white via-gray-50 to-gray-100 relative">
            {/* Yellow Wall */}
            <div className="absolute left-0 top-0 w-1/4 h-full bg-yellow-400"></div>

            {/* White Shelves */}
            <div className="absolute left-4 top-8 w-16 h-32 bg-white rounded shadow-sm flex flex-col gap-1 p-1">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-full h-3 bg-gray-200 rounded"></div>
              ))}
            </div>

            {/* Lounge Area */}
            <div className="absolute right-1/3 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
              {/* Table */}
              <div className="w-24 h-16 bg-white rounded shadow-md"></div>
              {/* Chairs */}
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                <div className="w-8 h-8 bg-yellow-400 rounded-full"></div>
                <div className="w-8 h-8 bg-teal-500 rounded-full"></div>
                <div className="w-8 h-8 bg-orange-500 rounded-full"></div>
              </div>
            </div>

            {/* Glass Windows */}
            <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-r from-transparent via-blue-100/30 to-blue-200/50 border-l-2 border-blue-200/50"></div>
          </div>
        </Link>

        {/* Middle Banner - Carousel từ API */}
        {isLoading ? (
          <div className="relative h-64 md:h-80 rounded-lg overflow-hidden bg-gray-200 animate-pulse"></div>
        ) : currentBanner ? (
          <div
            className="relative h-64 md:h-80 rounded-lg overflow-hidden group shadow-md hover:shadow-lg transition-shadow"
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
            className="relative h-64 md:h-80 rounded-lg overflow-hidden group shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="w-full h-full bg-gradient-to-br from-red-700 via-red-600 to-red-800 relative overflow-hidden">
              {/* Background gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-red-900/30 via-red-800/10 to-transparent"></div>

              {/* Large Yellow Number "1" - Right side */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 text-yellow-400 text-[10rem] md:text-[14rem] font-black leading-none opacity-70">
                1
              </div>

              {/* Text Content - Left side */}
              <div className="absolute left-6 top-6 flex flex-col gap-1 z-10">
                <div className="text-yellow-400 text-3xl md:text-4xl font-black leading-tight drop-shadow-lg">
                  Survive
                </div>
                <div className="text-yellow-400 text-4xl md:text-5xl font-black leading-tight drop-shadow-lg">
                  Cosmetics
                </div>
              </div>

              {/* Mock Cosmetic Products - Bottom left */}
              <div className="absolute bottom-6 left-6 flex items-end gap-2 z-10">
                {/* Lipstick 1 */}
                <div className="w-6 h-14 bg-gradient-to-b from-red-500 to-red-700 rounded-t-full shadow-lg relative">
                  <div className="absolute top-0 w-full h-2 bg-yellow-400 rounded-t-full"></div>
                </div>
                {/* Jar */}
                <div className="w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center relative">
                  <div className="w-5 h-5 bg-pink-200 rounded-full"></div>
                  <div className="absolute top-0 w-6 h-2 bg-white rounded-full"></div>
                </div>
                {/* Lipstick 2 */}
                <div className="w-5 h-10 bg-gradient-to-b from-orange-400 to-red-600 rounded-t-full shadow-lg"></div>
              </div>

              {/* Carousel Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              </div>
            </div>
          </Link>
        )}

        {/* Right Banner - Women's Fashion Sale */}
        <Link
          href="/sales/womens-fashion"
          className="relative h-64 md:h-80 rounded-lg overflow-hidden group shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="w-full h-full bg-gradient-to-br from-pink-100 via-pink-50 to-pink-200 relative">
            {/* Sale Text - Script/Elegant Style */}
            <div className="absolute top-4 left-4 text-white text-3xl md:text-4xl font-bold italic drop-shadow-lg tracking-wide">
              Sale
            </div>

            {/* Women's Fashion Sales Text */}
            <div className="absolute top-12 left-4 text-white text-xs md:text-sm font-semibold drop-shadow-md">
              Women&apos;s Fashion Sales
            </div>

            {/* Mannequins with Outfits */}
            <div className="absolute bottom-8 left-0 right-0 flex items-end justify-center gap-2 md:gap-4 px-4">
              {/* Outfit 1 - Teal Dress */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-20 bg-teal-500 rounded-t-full relative">
                  <div className="absolute -left-2 top-4 w-4 h-4 bg-gradient-to-br from-teal-400 via-orange-300 to-gray-300 rounded"></div>
                </div>
                <div className="w-3 h-3 bg-amber-100 rounded-full"></div>
              </div>

              {/* Outfit 2 - Yellow Dress */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-24 bg-yellow-500 rounded-t-full relative">
                  <div className="absolute top-8 w-full h-2 bg-pink-400"></div>
                </div>
                <div className="w-3 h-3 bg-orange-300 rounded-full"></div>
              </div>

              {/* Outfit 3 - White Blouse + Pink Pants */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-20 bg-white rounded-t-full relative">
                  <div className="absolute -left-2 top-2 w-4 h-4 bg-gradient-to-br from-teal-400 via-orange-300 to-white rounded"></div>
                  <div className="absolute bottom-0 w-full h-8 bg-pink-400 rounded-b-full"></div>
                </div>
                <div className="w-3 h-3 bg-orange-300 rounded-full"></div>
              </div>

              {/* Outfit 4 - Coral Blazer */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-20 bg-orange-400 rounded-t-full relative">
                  <div className="absolute top-2 w-full h-6 bg-white rounded"></div>
                  <div className="absolute bottom-0 w-full h-8 bg-teal-400 rounded-b-full"></div>
                </div>
                <div className="w-3 h-3 bg-amber-700 rounded-full"></div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
