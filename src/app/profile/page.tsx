import type { Metadata } from "next";
import { AffiliateScreen } from "@/screens/AffiliateScreen";

export const metadata: Metadata = {
  title: "Hồ sơ | Chainivo",
  description: "Thông tin tài khoản và affiliate",
};

export default function ProfilePage() {
  return <AffiliateScreen />;
}
