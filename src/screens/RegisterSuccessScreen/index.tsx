"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Copy, Share2 } from "lucide-react";
import { Button } from "@/components/buttons/Button";
import { ToastService } from "@/services/ToastService";

export const RegisterSuccessScreen = () => {
  const searchParams = useSearchParams();
  const refCode = searchParams.get("refCode")?.trim() || "";

  const inviteLink = useMemo(() => {
    if (!refCode || typeof window === "undefined") return "";
    return `${window.location.origin}/auth/register?ref=${encodeURIComponent(refCode)}`;
  }, [refCode]);

  const copyValue = async (text: string, label: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      ToastService.copied(label);
    } catch {
      ToastService.error("Không thể sao chép. Vui lòng thử lại.");
    }
  };

  const handleShare = async () => {
    if (!inviteLink) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Mời bạn tham gia Chainivo",
          text: "Đăng ký bằng link mời của mình nhé!",
          url: inviteLink,
        });
        return;
      } catch {
        // fallback copy
      }
    }

    await copyValue(inviteLink, "Link mời");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-xl rounded-xl border bg-card p-6 md:p-8">
        <div className="text-center mb-6">
          <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <h1 className="text-2xl font-semibold">Đăng ký thành công</h1>
          <p className="text-muted-foreground mt-1">
            Tài khoản đã được tạo. Dưới đây là thông tin affiliate của bạn.
          </p>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border bg-background p-4">
            <p className="text-sm text-muted-foreground mb-2">Mã giới thiệu</p>
            <p className="text-xl font-semibold break-all">{refCode || "--"}</p>
            <Button
              variant="outline"
              className="mt-3"
              onClick={() => copyValue(refCode, "Mã giới thiệu")}
              disabled={!refCode}
            >
              <Copy className="w-4 h-4" />
              Copy mã giới thiệu
            </Button>
          </div>

          <div className="rounded-lg border bg-background p-4">
            <p className="text-sm text-muted-foreground mb-2">Link mời đăng ký</p>
            <p className="text-sm break-all">{inviteLink || "--"}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <Button
                variant="outline"
                onClick={() => copyValue(inviteLink, "Link mời")}
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
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/auth/login?registered=true" className="flex-1 min-w-[200px]">
            <Button fullWidth>Đăng nhập ngay</Button>
          </Link>
          <Link href="/affiliate" className="flex-1 min-w-[200px]">
            <Button fullWidth variant="outline">
              Mở dashboard affiliate
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
