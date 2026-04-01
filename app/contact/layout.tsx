import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Matthew Pinho for event coverage, athlete portraits, and commercial photography.",
  openGraph: {
    title: "Contact | Matthew Pinho",
    description: "Book your next sports or commercial project.",
  }
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
