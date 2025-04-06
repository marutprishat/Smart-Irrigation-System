// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapInit from "@/components/bootstrap-init";
//import Navigation from "./components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AgroNet-4-BHARAT",
  description: "Smart IoT-Based Farming System",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className={`${inter.className} h-full`}>
        <div className="min-h-full">
          <BootstrapInit />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
