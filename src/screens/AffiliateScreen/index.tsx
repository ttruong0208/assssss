"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Copy, Share2, Users, Trophy, Coins } from "lucide-react";
import { useAppSelector } from "@/stores";
import { UserService } from "@/api/services/userService";
import { UserProfile } from "@/api/api";
import { ToastService } from "@/services/ToastService";
import { Button } from "@/components/buttons/Button";
import { openManualCopyPrompt } from "@/lib/utils";

const manualCopy = (text: string, label: string) => {
  if (!text) return;
  const opened = openManualCopyPrompt(text, label);
  if (opened) {
    ToastService.info(`Đã mở hộp sao chép thủ công cho ${label}.`);
  } else {
    ToastService.error("Không thể mở hộp sao chép thủ công.");
  }
};

export const AffiliateScreen = () => {
  const authUser = useAppSelector((state) => state.auth.user);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!isAuthenticated) return;

      setIsLoading(true);
      const response = await UserService.getMyProfile();

      if (response.success && response.data) {
        setProfile(response.data);
      } else if (!authUser?.refCode) {
        ToastService.error(response.error || "Không tải được dữ liệu affiliate");
      }

      setIsLoading(false);
    };

    fetchProfile();
  }, [isAuthenticated, authUser?.refCode]);

  const refCode = profile?.refCode || authUser?.refCode || "";

  const inviteLink = useMemo(() => {
    if (!refCode || typeof window === "undefined") return "";
    return `${window.location.origin}/auth/register?ref=${encodeURIComponent(refCode)}`;
  }, [refCode]);

  const handleShare = useCallback(async () => {
    if (!inviteLink) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Mời bạn tham gia Chainivo",
          text: "Đăng ký qua link giới thiệu của mình nhé!",
          url: inviteLink,
        });
        return;
      } catch {
        // fallback copy
      }
    }

    manualCopy(inviteLink, "link mời");
  }, [inviteLink]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background px-4 py-10">
        <div className="mx-auto max-w-2xl rounded-xl border bg-card p-6 text-center">
          <h1 className="text-2xl font-semibold mb-2">Affiliate Dashboard</h1>
          <p className="text-muted-foreground mb-6">
            Vui lòng đăng nhập để xem mã giới thiệu và chia sẻ link mời của bạn.
          </p>
          <Link href="/auth/login?redirect=/affiliate">
            <Button>Đăng nhập để tiếp tục</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="rounded-xl border bg-card p-6">
          <h1 className="text-2xl font-semibold">Affiliate Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Quản lý mã giới thiệu, chia sẻ link mời và theo dõi trạng thái referral.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border bg-card p-5">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
              <Users className="w-4 h-4" />
              Mã giới thiệu
            </div>
            <p className="text-xl font-semibold break-all">{refCode || "--"}</p>
            <Button
              className="mt-3"
              variant="outline"
              onClick={() => manualCopy(refCode, "mã giới thiệu")}
              disabled={!refCode}
            >
              <Copy className="w-4 h-4" />
              Copy mã
            </Button>
          </div>

          <div className="rounded-xl border bg-card p-5">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
              <Trophy className="w-4 h-4" />
              Cấp bậc hiện tại
            </div>
            <p className="text-xl font-semibold">
              {profile?.rank?.name || profile?.rankId || "Chưa cập nhật"}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Đồng bộ theo dữ liệu tài khoản hiện tại.
            </p>
          </div>

          <div className="rounded-xl border bg-card p-5">
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
              <Coins className="w-4 h-4" />
              Điểm tích lũy
            </div>
            <p className="text-xl font-semibold">{profile?.points ?? 0}</p>
            <p className="text-xs text-muted-foreground mt-2">
              Hiển thị theo thông tin người dùng từ hệ thống.
            </p>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Link mời của bạn</h2>
            <p className="text-sm text-muted-foreground">
              Chia sẻ link này để người dùng mới tự điền mã giới thiệu khi đăng ký.
            </p>
          </div>

          <div className="rounded-lg border bg-background px-4 py-3 text-sm break-all">
            {inviteLink || "Chưa có link mời, vui lòng kiểm tra mã giới thiệu."}
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              onClick={() => manualCopy(inviteLink, "link mời")}
              disabled={!inviteLink}
            >
              <Copy className="w-4 h-4" />
              Copy link
            </Button>
            <Button onClick={handleShare} disabled={!inviteLink}>
              <Share2 className="w-4 h-4" />
              Chia sẻ nhanh
            </Button>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <h2 className="text-lg font-semibold mb-2">Theo dõi referral (MVP)</h2>
          <p className="text-sm text-muted-foreground">
            Số liệu chi tiết F1/F2 và lịch sử hoa hồng sẽ hiển thị khi backend mở
            endpoint thống kê affiliate. Hiện tại dashboard đã hoàn chỉnh phần
            mã giới thiệu, link mời, copy/share và dữ liệu tài khoản cơ bản.
          </p>
          {isLoading && (
            <p className="text-sm text-muted-foreground mt-3">Đang tải dữ liệu...</p>
          )}
        </div>
      </div>
    </div>
  );
};
