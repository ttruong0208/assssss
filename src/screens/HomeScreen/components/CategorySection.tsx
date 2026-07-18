"use client";

import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Baby,
  UtensilsCrossed,
  Shirt,
  Home,
  Smartphone,
  Car,
  Dumbbell,
  Gamepad2,
  Heart,
  Briefcase,
  Palette,
} from "lucide-react";
import type { Category } from "@/api/services/categoryService";

// Fallback icons và colors để map với categories từ API
const FALLBACK_ICONS = [
  BookOpen,
  Baby,
  UtensilsCrossed,
  Shirt,
  Home,
  Smartphone,
  Car,
  Dumbbell,
  Gamepad2,
  Heart,
  Briefcase,
  Palette,
];

const FALLBACK_COLORS: string[] = [
  "bg-blue-500",
  "bg-pink-500",
  "bg-green-500",
  "bg-pink-400",
  "bg-orange-500",
  "bg-purple-500",
  "bg-blue-600",
  "bg-red-500",
  "bg-indigo-500",
  "bg-red-400",
  "bg-gray-600",
  "bg-yellow-500",
];

interface CategorySectionProps {
  categories?: Category[];
  isLoading?: boolean;
  getCategoryHref: (category: Category) => void;
  activeCategoryId?: string;
}

export const CategorySection = ({
  categories = [],
  isLoading = false,
  getCategoryHref,
  activeCategoryId,
}: CategorySectionProps) => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-4">
        {isLoading
          ? // Skeleton loading
            [...Array(12)].map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 p-4 rounded-lg animate-pulse"
              >
                <div className="w-16 h-16 bg-gray-200 rounded-lg" />
                <div className="h-3 w-16 bg-gray-200 rounded" />
              </div>
            ))
          : categories.slice(0, 12).map((category, index) => {
              const Icon =
                FALLBACK_ICONS[index % FALLBACK_ICONS.length] || BookOpen;
              const colorClass =
                FALLBACK_COLORS[index % FALLBACK_COLORS.length] ||
                "bg-blue-500";
              const isActive = activeCategoryId === category.id;

              return (
                <button
                  key={category.id}
                  onClick={() => getCategoryHref(category)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-colors group ${
                    isActive ? "bg-gray-100" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform overflow-hidden ">
                    {category.image ? (
                      <Image
                        src={(category.image as any).url || ""}
                        alt={category.name}
                        width={48}
                        height={48}
                        className="object-cover rounded-full"
                      />
                    ) : (
                      <Icon className="w-8 h-8 text-white" />
                    )}
                  </div>
                  <span className="text-xs text-center text-black font-medium">
                    {category.name}
                  </span>
                </button>
              );
            })}
      </div>
    </div>
  );
};
