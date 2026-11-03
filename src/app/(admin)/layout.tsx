import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";

import { TooltipProvider } from "@/components/ui/tooltip";
import { siteConfig } from "@/lib/site-config";

import "../globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "Admin · DoubleA Solar",
  robots: { index: false, follow: false },
};

/**
 * Eigenes Root-Layout für den Admin-Bereich: einsprachig Deutsch, ohne
 * Sprach-Routing und ohne öffentlichen Header/Footer.
 */
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de-CH" className={`${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full bg-background">
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
