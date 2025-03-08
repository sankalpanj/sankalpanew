import Provider from "@/lib/trpc/provider";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Sankalpa USA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider>
        <ClerkProvider>
          <body>{children}</body>
          <Toaster richColors />
        </ClerkProvider>
      </Provider>
    </html>
  );
}
