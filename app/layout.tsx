import { AppOrchestrator } from "@/components/app-orchestrator";
import { StripeWrapper } from "@/components/stripe-wrapper";
import { Toaster } from "@/components/ui/sonner";
import Provider from "@/lib/trpc/provider";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import "./globals.css";

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
            <StripeWrapper>{children}</StripeWrapper>
          </body>
          <Toaster richColors theme="light" />
          <AppOrchestrator />
        </ClerkProvider>
      </Provider>
    </html>
  );
}
