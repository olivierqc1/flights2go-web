import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Travel2Go — Where can your budget take you?",
  description:
    "Find complete trips (flight, train or bus + hotel) within your budget. Trouve des voyages complets selon ton budget. Encuentra viajes completos según tu presupuesto.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}