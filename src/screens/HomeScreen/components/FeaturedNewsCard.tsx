"use client";

import Image from "next/image";
import Link from "next/link";
import { ThumbsUp, MessageCircle, Share2 } from "lucide-react";
import { News } from "@/api/services/newsService";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface FeaturedNewsCardProps {
  news: News;
}

export const FeaturedNewsCard = ({ news }: FeaturedNewsCardProps) => {
  // Format time ago
  const getTimeAgo = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);

    if (diffInMinutes < 60) {
      return `${diffInMinutes} phút trước`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} giờ trước`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} ngày trước`;
    }
  };

  return (
    <Link
      href={`/news/${news.id}`}
      className="group flex gap-4 bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
    >
      {/* Image - Left (same size style as NewsCard) */}
      <div className="relative w-24 h-24 md:w-28 md:h-28 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
        {news?.image?.url ? (
          <Image
            src={news?.image?.url || ""}
            alt={news?.image?.alt || ""}
            fill
            className="object-cover group-hover:scale-105 transition-transform"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
            No Image
          </div>
        )}
      </div>

      {/* Content - Right */}
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        {/* Title */}
        <h3 className="text-sm md:text-base font-bold text-black line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
          {news.title || ""}
        </h3>

        {/* Author & Timestamp */}
        <div className="flex items-center gap-2">
          <Avatar className="w-6 h-6">
            <AvatarImage
              src={news.author?.avatar}
              alt={news.author?.name || "Author"}
            />
            <AvatarFallback className="bg-gray-300 text-gray-600 text-xs">
              {news.author?.name?.[0]?.toUpperCase() || "A"}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs text-gray-600">
            {news.author?.name || "Nguyễn Đức Long"}
          </span>
          <span className="text-xs text-gray-400">•</span>
          <span className="text-xs text-gray-600">
            Ruby • {getTimeAgo(news.publishedAt || news.createdAt)}
          </span>
        </div>

        {/* Engagement Metrics */}
        <div className="flex items-center gap-4 pt-2 border-t border-gray-100 mt-1">
          <div className="flex items-center gap-1.5">
            <ThumbsUp className="w-4 h-4 text-gray-600" />
            <span className="text-xs text-gray-600">
              {news.likeCount?.toLocaleString("vi-VN") || "1232"}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <MessageCircle className="w-4 h-4 text-gray-600" />
            <span className="text-xs text-gray-600">
              {news.commentCount?.toLocaleString("vi-VN") || "223"}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Share2 className="w-4 h-4 text-gray-600" />
            <span className="text-xs text-gray-600">Chia sẻ</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
