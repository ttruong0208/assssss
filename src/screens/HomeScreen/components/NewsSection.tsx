"use client";

import Link from "next/link";
import { NewsCard } from "./NewsCard";
import { FeaturedNewsCard } from "./FeaturedNewsCard";
import { News } from "@/api/services/newsService";

interface NewsSectionProps {
  news?: News[];
  featuredNews?: News[];
  isLoading?: boolean;
}

export const NewsSection = ({
  news = [],
  featuredNews = [],
  isLoading = false,
}: NewsSectionProps) => {
  // Ẩn component nếu không có dữ liệu và không đang loading
  if (!isLoading && news.length === 0) {
    return null;
  }

  // Lọc và sắp xếp news: lấy 4 item có createdAt mới nhất (hoặc publishedAt nếu không có createdAt)
  const sortedNews = [...news]
    .sort((a, b) => {
      const dateA = a.createdAt || a.publishedAt || "";
      const dateB = b.createdAt || b.publishedAt || "";
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    })
    .slice(0, 4);

  // Lọc featuredNews: chỉ lấy những item có isHot = true, tối đa 3 item
  const hotNews = featuredNews
    .filter((item) => item.isHot === true)
    .slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Tin tức mới (2/3 width) */}
        <div className="lg:col-span-2">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-black">Tin tức mới</h2>
            <Link
              href="/news"
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Xem tất cả
            </Link>
          </div>

          {/* News Cards */}
          {isLoading ? (
            <div className="flex flex-col gap-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-200 rounded-lg h-28 animate-pulse"
                />
              ))}
            </div>
          ) : sortedNews.length > 0 ? (
            <div className="flex flex-col gap-4">
              {sortedNews.map((item) => (
                <NewsCard key={item.id} news={item} />
              ))}
            </div>
          ) : null}
        </div>

        {/* Right Column - Tin nổi bật (1/3 width) */}
        <div className="lg:col-span-1">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-black">Tin nổi bật</h2>
          </div>

          {/* Featured News Cards */}
          {isLoading ? (
            <div className="flex flex-col gap-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-200 rounded-lg aspect-square animate-pulse"
                />
              ))}
            </div>
          ) : hotNews.length > 0 ? (
            <div className="flex flex-col gap-4">
              {hotNews.map((item) => (
                <FeaturedNewsCard key={item.id} news={item} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
