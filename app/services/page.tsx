import { Metadata } from "next";
import ServicesContent from "./ServicesContent";

export const metadata: Metadata = {
  title: "Serviços",
  description: "Fotografia de alto impacto: esportes, eventos, editorial e cobertura de torneios na Europa.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}
