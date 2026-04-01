import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Conheça Matthew Pinho, fotógrafo esportivo e de eventos capturando a pulsação do desporto através das lentes.",
};

export default function AboutPage() {
  return <AboutContent />;
}
