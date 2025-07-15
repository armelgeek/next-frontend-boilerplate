"use client";

import { Inter } from "next/font/google";
import { ThemeProvider } from "@/shared/providers/theme-provider";
import { Toaster } from "@/shared/components/atoms/ui/toaster";
import "@/shared/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RestoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ThemeProvider
        defaultTheme="restaurant"
        storageKey="resto-theme"
      >
        <div className={`${inter.className} antialiased`}>
          {children}
          <Toaster />
        </div>
      </ThemeProvider>
    </>
  );
}
