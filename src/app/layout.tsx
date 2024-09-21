import ModalProvider from "@/providers/ModalProvider";
import QueryClientProvider from "@/providers/QueryClientProvider";
import { ToasterProvider } from "@/providers/ToasterProvider";

import { MockServiceProvider } from "@/providers/MockServiceProvider";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KooSang-project",
  description: "side project for KooSang",
};

export const revalidate = 0;

//mswStart() // 서버단 실행

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme>
          <ToasterProvider />
          <MockServiceProvider />
          <QueryClientProvider>
            <ModalProvider />
            {children}
          </QueryClientProvider>
        </Theme>
      </body>
    </html>
  );
}
