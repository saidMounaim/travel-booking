import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Travel Booking",
  description:
    "Explore curated tours effortlessly with our travel app. Your gateway to unforgettable adventures.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-[#f8fafc] ${inter.className}`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
