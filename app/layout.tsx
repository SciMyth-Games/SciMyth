import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SciMyth Games — Full-Cycle Game Development Outsourcing",
  description:
    "SciMyth Games is a full-cycle game development outsourcing studio. From concept to launch, we deliver AAA-quality game development, art, QA, and co-development services.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎮</text></svg>",
  },
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
