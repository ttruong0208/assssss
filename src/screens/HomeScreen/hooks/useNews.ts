import { useState, useEffect } from "react";
import { NewsService, News } from "@/api/services/newsService";

export const useNews = () => {
  const [news, setNews] = useState<News[]>([]);
  const [featuredNews, setFeaturedNews] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch regular news
        const newsResponse = await NewsService.listNews({
          limit: 4,
          page: 1,
          status: "published",
          sort: "publishedAt",
          order: "desc",
        });

        // Fetch featured/hot news
        const featuredResponse = await NewsService.listNews({
          limit: 3,
          page: 1,
          status: "published",
          isHot: true,
          sort: "publishedAt",
          order: "desc",
        });

        if (newsResponse.success && newsResponse.data) {
          setNews(newsResponse.data.docs || []);
        } else {
          setError(newsResponse.error || "Không thể tải tin tức");
        }

        if (featuredResponse.success && featuredResponse.data) {
          setFeaturedNews(featuredResponse.data.docs || []);
        }
      } catch (err) {
        setError("Đã xảy ra lỗi khi tải tin tức");
        console.error("Error fetching news:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  return { news, featuredNews, isLoading, error };
};
