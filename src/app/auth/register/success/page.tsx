import type { Metadata } from "next";
import { RegisterSuccessScreen } from "@/screens/RegisterSuccessScreen";

export const metadata: Metadata = {
  title: "Đăng ký thành công | Chainivo",
  description: "Thông tin mã giới thiệu sau khi đăng ký",
};

export default function RegisterSuccessPage() {
  return <RegisterSuccessScreen />;
}
