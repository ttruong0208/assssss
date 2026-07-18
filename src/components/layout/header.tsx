"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CloudDownload,
  Users,
  Bell,
  FileQuestion,
  ShoppingCart,
  Search,
  Star,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/stores/hooks";
import { brandColors } from "@/config/colors";
import {
  MOCK_NOTIFICATION_COUNT,
  MOCK_USER_RANK,
  MOCK_MASKED_PHONE,
  MOCK_DEFAULT_USER_NAME,
  MOCK_DEFAULT_USER_FALLBACK,
  HEADER_LINKS,
  HEADER_LABELS,
} from "./constants";

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const user = useAppSelector((state) => state.auth.user);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  // Mock data - replace with actual data from store/API
  const notificationCount = MOCK_NOTIFICATION_COUNT;
  const userRank = MOCK_USER_RANK;
  const maskedPhone = MOCK_MASKED_PHONE;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search logic
    console.log("Searching for:", searchQuery);
  };

  const primaryColor = brandColors.primary_background;
  const primaryTextColor = brandColors.primary_text;
  const logoBackgroundColor = brandColors.Logo_background;

  return (
    <header style={{ backgroundColor: primaryColor, color: primaryTextColor }}>
      {/* Top Bar */}
      <div className="border-b" style={{ borderColor: `${primaryColor}4D` }}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-10 text-sm flex-wrap">
            {/* Left Side */}
            <div className="flex items-center gap-4 md:gap-6 flex-wrap">
              <Link
                href={HEADER_LINKS.DOWNLOAD}
                className="flex items-center gap-1.5 hover:text-yellow-300 transition-colors"
              >
                <CloudDownload className="w-4 h-4 text-yellow-400" />
                <span>{HEADER_LABELS.DOWNLOAD_APP}</span>
              </Link>
              <Link
                href={HEADER_LINKS.COMMUNITY}
                className="flex items-center gap-1.5 hover:text-yellow-300 transition-colors"
              >
                <Users className="w-4 h-4" />
                <span>{HEADER_LABELS.COMMUNITY_PAGE}</span>
              </Link>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4 md:gap-6 flex-wrap">
              {/* Notifications */}
              <Link
                href={HEADER_LINKS.NOTIFICATIONS}
                className="flex items-center gap-1.5 hover:text-yellow-300 transition-colors relative"
              >
                <div className="relative">
                  <Bell className="w-4 h-4" />
                  {notificationCount > 0 && (
                    <span
                      className="absolute -top-1.5 -right-1.5 h-4 w-4 flex items-center justify-center rounded-full bg-red-500 text-[10px] font-bold border"
                      style={{
                        color: primaryTextColor,
                        borderColor: primaryTextColor,
                      }}
                    >
                      {notificationCount}
                    </span>
                  )}
                </div>
                <span>{HEADER_LABELS.NOTIFICATIONS}</span>
              </Link>

              {/* FAQ */}
              <Link
                href={HEADER_LINKS.FAQ}
                className="flex items-center gap-1.5 hover:text-yellow-300 transition-colors"
              >
                <FileQuestion className="w-4 h-4 text-yellow-400" />
                <span>{HEADER_LABELS.FAQ}</span>
              </Link>

              {/* Language Selector */}
              <div className="flex items-center gap-1.5 cursor-pointer hover:text-yellow-300 transition-colors">
                <Star className="w-4 h-4 text-red-400 fill-red-400" />
                <span>{HEADER_LABELS.VIETNAM}</span>
              </div>

              {/* User Profile */}
              {isAuthenticated && user ? (
                <Link
                  href={HEADER_LINKS.PROFILE}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src={user.avatarUrl || undefined}
                      alt={user.name || MOCK_DEFAULT_USER_FALLBACK}
                    />
                    <AvatarFallback
                      className="text-xs"
                      style={{
                        backgroundColor: primaryColor,
                        color: primaryTextColor,
                      }}
                    >
                      {user.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium leading-tight">
                      {user.name || MOCK_DEFAULT_USER_NAME}
                    </span>
                    <span className="text-xs leading-tight">
                      <span className="text-red-300">{userRank}</span>
                      <span style={{ color: primaryTextColor }}>
                        {" "}
                        • {maskedPhone}
                      </span>
                    </span>
                  </div>
                </Link>
              ) : (
                <Link href={HEADER_LINKS.LOGIN}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/30 hover:bg-white/10"
                    style={{ color: primaryTextColor }}
                  >
                    {HEADER_LABELS.LOGIN}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Logo */}
          <Link
            href={HEADER_LINKS.HOME}
            className="flex items-center gap-3 flex-shrink-0 order-1"
          >
            <div className="relative w-12 h-12">
              <Image
                src="/logo%20chainivo.svg"
                alt="CHAINIVO Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex items-center">
              <span
                className="text-2xl font-bold tracking-tight"
                style={{ color: primaryTextColor }}
              >
                CH
                <span
                  className="px-1 py-0.5 rounded-tl-xl rounded-br-xl font-bold inline-block"
                  style={{
                    background: logoBackgroundColor,
                    color: primaryTextColor,
                  }}
                >
                  AI
                </span>
                <span className="">NIVO</span>
              </span>
            </div>
          </Link>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="flex-1 flex items-center gap-0 order-3 md:order-2 min-w-0 mx-4"
          >
            <div className=" flex-1 min-w-0 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <Input
                type="search"
                placeholder={HEADER_LABELS.SEARCH_PLACEHOLDER}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 h-11 bg-white text-gray-900 placeholder:text-gray-400 border-0 rounded-l-lg rounded-r-none focus-visible:ring-2 focus-visible:ring-[#1C33FF] focus-visible:ring-offset-0"
              />
            </div>
            <Button
              type="submit"
              className=" h-11 px-6 rounded-r-lg rounded-l-none whitespace-nowrap flex-shrink-0 border-0 transition-colors cursor-pointer"
              style={{
                backgroundColor: "#008DFF",
                color: primaryTextColor,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.9";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
            >
              {HEADER_LABELS.SEARCH_BUTTON}
            </Button>
          </form>

          {/* Cart */}
          <Link
            href={HEADER_LINKS.CART}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0 order-2 md:order-3"
          >
            <ShoppingCart className="w-6 h-6 text-yellow-400" />
            <span className="font-medium hidden sm:inline">
              {HEADER_LABELS.CART}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};
