import type { Metadata } from "next";
import { RegisterScreen } from "@/screens/RegisterScreen";

export const metadata: Metadata = {
  title: "Đăng ký | Chainivo",
  description: "Tạo tài khoản mới trên Chainivo",
};

/**
 * Register Page
 * Next.js route page that wraps the RegisterScreen component
 */
export default function RegisterPage() {
  return <RegisterScreen />;
}

