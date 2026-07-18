"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Youtube, Facebook, Twitter, Instagram } from "lucide-react";
import { brandColors } from "@/config/colors";
import { FOOTER_MENU_ITEMS, FOOTER_SOCIAL_LINKS } from "./constants";

export const Footer = () => {
  const [email, setEmail] = useState("");

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement email subscription logic
    console.log("Email submitted:", email);
    setEmail("");
  };

  // Map icon names to icon components
  const iconMap = {
    YouTube: Youtube,
    Facebook: Facebook,
    Twitter: Twitter,
    Instagram: Instagram,
  };

  const socialLinks = FOOTER_SOCIAL_LINKS.map((social) => ({
    ...social,
    icon: iconMap[social.name as keyof typeof iconMap],
  }));

  return (
    <footer className="bg-white dark:bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Left Column - Logo & Description */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3 w-fit">
              <div className="relative w-14 h-14 flex-shrink-0">
                <Image
                  src="/logo%20chainivo.svg"
                  alt="CHAINIVO Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex items-center">
                <span
                  className="text-2xl font-bold tracking-tight whitespace-nowrap"
                  style={{ color: brandColors.primary_background }}
                >
                  CH
                  <span
                    className="px-0.5 py-0.5 rounded-tl-xl rounded-br-xl font-bold inline-block"
                    style={{
                      background: brandColors.Logo_background,
                      color: brandColors.primary_text,
                    }}
                  >
                    AI
                  </span>
                  <span>NIVO</span>
                </span>
              </div>
            </Link>
            <p
              className="text-sm leading-relaxed max-w-md"
              style={{ color: brandColors.footer_text }}
            >
              Ứng dụng thương mại điện tử cho phép doanh nghiệp và cửa hàng tự
              xây dựng và quản lý chương trình affiliate, chủ động thiết lập cơ
              chế hoa hồng, mở rộng kênh bán hàng qua cộng tác viên, thúc đẩy
              doanh thu nhờ mạng lưới đối tác linh hoạt.
            </p>
          </div>

          {/* Middle Column - Menu */}
          <div>
            <h3
              className="text-lg font-bold mb-4"
              style={{ color: brandColors.title_text }}
            >
              Menu
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                {FOOTER_MENU_ITEMS.left.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm hover:text-gray-700 transition-colors"
                    style={{ color: brandColors.link_text }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                {FOOTER_MENU_ITEMS.right.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm hover:text-gray-700 transition-colors"
                    style={{ color: brandColors.link_text }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Email Subscription */}
          <div>
            <h3
              className="text-lg font-bold mb-4"
              style={{ color: brandColors.title_text }}
            >
              Đăng ký liên hệ
            </h3>
            <form onSubmit={handleEmailSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                required
              />
              <Button
                type="submit"
                className="w-full rounded-md h-9"
                style={{
                  backgroundColor: brandColors.primary_background,
                  color: brandColors.primary_text,
                }}
              >
                Đăng ký
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Section - Copyright & Social Media */}
        <div className="border-t border-gray-200 dark:border-border pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-black">
              ©2025. All rights reserved by CHAINIVO JSC COMPANY
            </p>
            <div className="flex items-center gap-4 flex-wrap justify-center md:justify-end">
              <span className="text-sm text-black whitespace-nowrap">
                Theo dõi chúng tôi:
              </span>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="text-black hover:text-blue-600 transition-colors"
                    >
                      <Icon className="w-5 h-5" />
                    </Link>
                  );
                })}
                {/* TikTok icon - using a simple SVG since lucide-react doesn't have it */}
                <Link
                  href="#"
                  aria-label="TikTok"
                  className="text-black hover:text-blue-600 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
