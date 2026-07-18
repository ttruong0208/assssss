import type { Metadata } from "next";
import { LoginScreen } from "@/screens/LoginScreen";

export const metadata: Metadata = {
  title: "Đăng nhập | Chainivo",
  description: "Đăng nhập vào tài khoản Chainivo của bạn",
};

/**
 * Login Page
 * Next.js route page that wraps the LoginScreen component
 */
export default function LoginPage() {
  return <LoginScreen />;
}

