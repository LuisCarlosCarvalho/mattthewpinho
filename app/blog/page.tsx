import { Metadata } from "next";
import { BlogContent } from "@/components/modules/BlogContent";

export const metadata: Metadata = {
  title: "Blog & News | Matthew Pinho Photography",
  description: "Stay updated with the latest world sports news. Real-time aggregator for Football, Motorsport, NBA, and Mind Sports.",
};

export default function BlogPage() {
  return <BlogContent />;
}
