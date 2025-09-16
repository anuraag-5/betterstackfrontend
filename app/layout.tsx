import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { delaFont, neueFont, poppinsFont } from "@/app/fonts/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nexus",
  description: "Monitor your apps and prevent downtime",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ poppinsFont.className } antialiased`}
      >
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
