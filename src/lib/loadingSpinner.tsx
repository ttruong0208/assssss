import Image from "next/image";
import { brandColors } from "@/config/colors";

export const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-24 h-24 flex items-center justify-center">
          <div className="relative z-10 w-16 h-16">
            <Image
              src="/logo%20chainivo.svg"
              alt="CHAINIVO Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
        {/* Text */}
        <span
          className="text-sm font-medium"
          style={{ color: brandColors.primary_text }}
        >
          Đang tải dữ liệu ...
        </span>
      </div>
    </div>
  );
};
