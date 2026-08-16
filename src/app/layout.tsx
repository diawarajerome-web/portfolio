import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jérôme Le Rhun — Portfolio",
  description: "Communication, Produit, Créativité",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
