import { useState, useEffect } from "react";
import { Banner } from "@/api/services/bannerService";
import { getBannersByScreenAndPosition } from "@/lib/utils";

export const useBanners = (
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
    | "other",
  position: "top" | "middle" | "bottom"
) => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch banners cho trang chủ, vị trí giữa
        const data = await getBannersByScreenAndPosition(
          screen as
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
            | "other",
          position as "top" | "middle" | "bottom"
        );

        setBanners(data);
      } catch (err) {
        setError("Đã xảy ra lỗi khi tải banners");
        console.error("Error fetching banners:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanners();
  }, []);

  return { banners, isLoading, error };
};
