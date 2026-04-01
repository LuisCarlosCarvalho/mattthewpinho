import { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contato",
  description: "Trabalhe comigo: Cobertura de eventos, retratos de atletas e campanhas comerciais.",
};

export default function ContactPage() {
  return <ContactContent />;
}
