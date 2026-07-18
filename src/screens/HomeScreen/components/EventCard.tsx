"use client";

import Image from "next/image";
import Link from "next/link";
import { Event } from "@/api/services/eventService";
import { Button } from "@/components/ui/button";
import {
  useEventCountdown,
  useEventButtonType,
} from "@/screens/HomeScreen/hooks/useEvents";

interface EventCardProps {
  event: Event;
  showCountdown?: boolean;
}

export const EventCard = ({ event, showCountdown = false }: EventCardProps) => {
  const locationText =
    typeof event.location === "string"
      ? event.location
      : (event.location as any)?.address || "";

  const registrationEndDate = (event as any)?.registrationEndDate;
  const { countdown, formatTime } = useEventCountdown(registrationEndDate);

  // Xác định button type dựa trên thời gian
  const calculatedButtonType = useEventButtonType(event);
  // Sử dụng propButtonType nếu được truyền vào, nếu không thì dùng calculatedButtonType
  const buttonType = calculatedButtonType;

  return (
    <Link
      href={`/events/${event.id}`}
      className="group flex flex-col rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow w-[300px] md:w-[340px] aspect-square bg-white flex-shrink-0"
    >
      {/* Image Section - Top */}
      <div className="relative w-full aspect-square overflow-hidden">
        {event?.image?.url ? (
          <Image
            src={event?.image?.url || ""}
            alt={event.image?.alt || ""}
            fill
            className={`object-cover group-hover:scale-105 transition-transform ${
              countdown ? "blur-sm" : ""
            }`}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400"></div>
        )}
        {/* Dark Overlay for text readability - Chỉ hiển thị khi có countdown */}
        {countdown && <div className="absolute inset-0 bg-black/10"></div>}
        {/* Countdown Timer - Center */}
        {countdown && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center justify-center gap-4 text-white">
              <div className="flex flex-col items-center">
                <span className="text-4xl md:text-5xl font-bold leading-none">
                  {formatTime(countdown.days)}
                </span>
                <span className="text-sm mt-1.5">Days</span>
              </div>
              <span className="text-2xl font-bold h-16 flex items-center text-white/80">
                |
              </span>
              <div className="flex flex-col items-center">
                <span className="text-4xl md:text-5xl font-bold leading-none">
                  {formatTime(countdown.hours)}
                </span>
                <span className="text-sm mt-1.5">Hours</span>
              </div>
              <span className="text-2xl font-bold h-16 flex items-center text-white/80">
                |
              </span>
              <div className="flex flex-col items-center">
                <span className="text-4xl md:text-5xl font-bold leading-none">
                  {formatTime(countdown.minutes)}
                </span>
                <span className="text-sm mt-1.5 border-b-2 border-purple-400 pb-0.5">
                  Minutes
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-3">
        {/* Description */}
        {event.name && (
          <b className="text-lg text-gray-600 mb-2 line-clamp-2">
            {event.name}
          </b>
        )}

        {/* Location and Button - Same row */}
        <div className="flex items-center justify-between gap-2 mt-auto">
          {/* Location */}
          {locationText && (
            <p className="text-xs text-gray-700 flex-1 line-clamp-1">
              {locationText}
            </p>
          )}

          {/* Button - Chỉ hiển thị nếu buttonType không null */}
          {buttonType === "join" && (
            <Button
              onClick={(e) => {
                e.preventDefault();
                // TODO: Handle join logic
              }}
              className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-md px-3 py-1.5 text-xs font-medium flex-shrink-0 cursor-pointer"
            >
              Tham gia
            </Button>
          )}
          {buttonType === "register" && (
            <Button
              onClick={(e) => {
                e.preventDefault();
                // TODO: Handle register logic
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-3 py-1.5 text-xs font-medium flex-shrink-0 cursor-pointer"
            >
              Đăng ký
            </Button>
          )}
        </div>
      </div>
    </Link>
  );
};
