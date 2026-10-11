
import { Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";

const notoBengali = Noto_Sans_Bengali({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali"],
  variable: "--font-noto-bengali",
  display: "swap",
});

export const metadata = {
  title: "বাজার দর | বাংলাদেশের নিত্যপণ্যের দাম",
  description:
    "চাল, ডাল, তেল, সবজি, মাছ ও মাংসের বাজারদর দেখুন।",
};

// Sample ticker data
const tickerProducts = [
  {
    id: "chal",
    name: "নাজিরশাইল চাল",
    price: 75,
    unit: "কেজি",
    change: 2.5,
    emoji: "🍚",
  },
  {
    id: "dal",
    name: "মসুর ডাল",
    price: 130,
    unit: "কেজি",
    change: -1.2,
    emoji: "🫘",
  },
  {
    id: "oil",
    name: "সয়াবিন তেল",
    price: 165,
    unit: "লিটার",
    change: 0,
    emoji: "🍾",
  },
  {
    id: "alu",
    name: "আলু",
    price: 55,
    unit: "কেজি",
    change: -2,
    emoji: "🥔",
  },
  {
    id: "peyaj",
    name: "পেঁয়াজ",
    price: 90,
    unit: "কেজি",
    change: 5,
    emoji: "🧅",
  },
  {
    id: "dim",
    name: "ডিম (ফার্ম)",
    price: 145,
    unit: "ডজন",
    change: -3.5,
    emoji: "🥚",
  },
];

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body
        className={`${notoBengali.className} flex min-h-screen flex-col`}
      >
        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
              fontFamily: "inherit",
              fontSize: "14px",
            },
          }}
        />

        <Suspense
          fallback={
            <div className="h-16 border-b bg-white" />
          }
        >
          <Navbar tickerProducts={tickerProducts} />
        </Suspense>

        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
