import type { Metadata } from "next";
import { AffiliateScreen } from "@/screens/AffiliateScreen";

export const metadata: Metadata = {
  title: "Affiliate | Chainivo",
  description: "Dashboard affiliate của Chainivo",
};

export default function AffiliatePage() {
  return <AffiliateScreen />;
}
