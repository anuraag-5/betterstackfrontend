import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { poppinsFont } from "@/app/fonts/fonts";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";

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
    <ClerkProvider>
      <html lang="en">
        <body className={`${poppinsFont.className} antialiased`}>
          {children}
          <Toaster position="top-center" />
        </body>
      </html>
    </ClerkProvider>
  );
}
