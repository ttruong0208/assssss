"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { EventCard } from "./EventCard";
import { Event } from "@/api/services/eventService";
import { Button } from "@/components/ui/button";

interface EventsSectionProps {
  events?: Event[];
  isLoading?: boolean;
}

export const EventsSection = ({
  events = [],
  isLoading = false,
}: EventsSectionProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Lọc và sắp xếp events: lấy 10 item có createdAt mới nhất
  const sortedEvents = [...events]
    .sort((a, b) => {
      const dateA = a.createdAt || a.startDate || "";
      const dateB = b.createdAt || b.startDate || "";
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    })
    .slice(0, 10);

  // Kiểm tra khả năng scroll
  const checkScrollability = () => {
    if (!scrollContainerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Kiểm tra lần đầu
    checkScrollability();

    // Lắng nghe sự kiện scroll
    container.addEventListener("scroll", checkScrollability);

    // Kiểm tra lại khi resize
    window.addEventListener("resize", checkScrollability);

    return () => {
      container.removeEventListener("scroll", checkScrollability);
      window.removeEventListener("resize", checkScrollability);
    };
  }, [sortedEvents]);

  // Xử lý scroll trái
  const handleScrollLeft = () => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
    scrollContainerRef.current.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  };

  // Xử lý scroll phải
  const handleScrollRight = () => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
    scrollContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  // Chỉ ẩn section sau khi tất cả hooks đã chạy để tránh lỗi
  // "Rendered fewer hooks than expected"
  const shouldHide = !isLoading && sortedEvents.length === 0;
  if (shouldHide) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-black">Sự kiện Ovan</h2>
        <Link
          href="/events"
          className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          Xem tất cả
        </Link>
      </div>

      {/* Events Horizontal Scroll với Navigation Buttons */}
      {isLoading ? (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 rounded-lg min-w-[300px] md:min-w-[350px] h-80 animate-pulse flex-shrink-0"
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          {/* Button mũi tên trái - Nằm ngoài scroll container */}
          <Button
            onClick={handleScrollLeft}
            disabled={!canScrollLeft}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 shadow-lg rounded-full p-2 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          {/* Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex-1 flex gap-4 overflow-x-auto scroll-smooth pb-4 hide-scrollbar"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {sortedEvents.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                showCountdown={index > 0} // Show countdown for cards 2, 3, 4
              />
            ))}
          </div>
          {/* Button mũi tên phải - Nằm ngoài scroll container */}
          <Button
            onClick={handleScrollRight}
            disabled={!canScrollRight}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 shadow-lg rounded-full p-2 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
      )}
    </div>
  );
};
