import { useState, useEffect } from "react";
import { EventService, Event } from "@/api/services/eventService";
import dayjs from "dayjs";

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Fetch events sorted by start date (upcoming events)
        const response = await EventService.listEvents({
          limit: 4,
          page: 1,
          sort: "startDate",
          order: "asc",
          status: "approved",
        });

        if (response.success && response.data) {
          setEvents(response.data.docs || []);
        } else {
          setError(response.error || "Không thể tải sự kiện");
        }
      } catch (err) {
        setError("Đã xảy ra lỗi khi tải sự kiện");
        console.error("Error fetching events:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { events, isLoading, error };
};

/**
 * Hook để tính toán countdown timer từ registrationEndDate đến thời gian hiện tại
 * @param registrationEndDate - Ngày kết thúc đăng ký (string hoặc Date)
 * @returns countdown object chứa days, hours, minutes hoặc null nếu đã hết hạn
 */
export const useEventCountdown = (
  registrationEndDate: string | Date | undefined | null
) => {
  const [countdown, setCountdown] = useState<{
    days: number;
    hours: number;
    minutes: number;
  } | null>(null);

  useEffect(() => {
    if (!registrationEndDate) {
      setCountdown(null);
      return;
    }

    const calculateCountdown = () => {
      const now = new Date().getTime();
      const endDate = new Date(registrationEndDate).getTime();
      const distance = endDate - now;

      if (distance < 0) {
        setCountdown(null);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      setCountdown({ days, hours, minutes });
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [registrationEndDate]);

  /**
   * Format số thành chuỗi 2 chữ số (ví dụ: 1 -> "01")
   */
  const formatTime = (value: number) => {
    return value.toString().padStart(2, "0");
  };

  return { countdown, formatTime };
};

/**
 * Hook để xác định loại button hiển thị dựa trên thời gian của event
 * @param event - Event object
 * @returns buttonType: "register" | "join" | null
 */
export const useEventButtonType = (event: Event) => {
  const [buttonType, setButtonType] = useState<"register" | "join" | null>(
    null
  );

  useEffect(() => {
    const now = dayjs();
    const registrationStartDate = (event as any)?.registrationStartDate
      ? dayjs((event as any).registrationStartDate)
      : null;
    const registrationEndDate = (event as any)?.registrationEndDate
      ? dayjs((event as any).registrationEndDate)
      : null;
    const startDate = event.startDate ? dayjs(event.startDate) : null;
    const endDate = event.endDate ? dayjs(event.endDate) : null;

    // Nếu thời gian hiện tại > endDate → ẩn button
    if (endDate && now.valueOf() > endDate.valueOf()) {
      setButtonType(null);
      return;
    }

    // Nếu thời gian hiện tại > startDate và < endDate → hiển thị "Tham gia"
    if (
      startDate &&
      endDate &&
      now.valueOf() > startDate.valueOf() &&
      now.valueOf() < endDate.valueOf()
    ) {
      setButtonType("join");
      return;
    }

    // Nếu thời gian hiện tại > registrationStartDate và < registrationEndDate → hiển thị "Đăng ký"
    if (
      registrationStartDate &&
      registrationEndDate &&
      now.valueOf() > registrationStartDate.valueOf() &&
      now.valueOf() < registrationEndDate.valueOf()
    ) {
      setButtonType("register");
      return;
    }

    // Mặc định không hiển thị button
    setButtonType(null);
  }, [
    event.startDate,
    event.endDate,
    (event as any)?.registrationStartDate,
    (event as any)?.registrationEndDate,
  ]);

  return buttonType;
};
