import Footer from "@/components/footer";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import Provider from "@/lib/trpc/provider";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import "../../globals.css";

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
          <body>
            <Header />
            {children}
            <Footer />
          </body>
          <Toaster richColors theme="light" />
        </ClerkProvider>
      </Provider>
    </html>
  );
}
