import { useState, useEffect } from "react";
import { Banner } from "@/api/services/bannerService";

/**
 * Hook để quản lý carousel cho banners
 * @param banners - Danh sách banners
 * @returns State và handlers cho carousel
 */
export const useBannerCarousel = (banners: Banner[]) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Tự động chuyển ảnh mỗi 5 giây
  useEffect(() => {
    if (banners.length === 0) return;

    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentIndex((prev) => {
          // Nếu đã đến cuối, quay về đầu
          if (prev >= banners.length - 1) {
            return 0;
          }
          return prev + 1;
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length, isHovered]);

  // Xử lý chuyển ảnh trước
  const handlePrevious = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Xử lý chuyển ảnh tiếp theo
  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentIndex < banners.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // Kiểm tra có thể điều hướng
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < banners.length - 1;

  // Lấy banner hiện tại
  const currentBanner = banners[currentIndex];

  return {
    currentIndex,
    currentBanner,
    isHovered,
    setIsHovered,
    canGoPrevious,
    canGoNext,
    handlePrevious,
    handleNext,
  };
};
