import ModalProvider from "@/providers/ModalProvider";
import QueryClientProvider from "@/providers/QueryClientProvider";
import SupabaseProvider from "@/providers/SupabaseProvider";
import { ToasterProvider } from "@/providers/ToasterProvider";
import UserProvider from "@/providers/UserProvider";
import { Theme } from "@radix-ui/themes";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@radix-ui/themes/styles.css';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KooSang-project",
  description: "side project for KooSang",
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme>
          <ToasterProvider />
          <QueryClientProvider>
            <SupabaseProvider>
              <UserProvider>
                <ModalProvider />
                {children}
              </UserProvider>
            </SupabaseProvider>
          </QueryClientProvider>
        </Theme>
      </body>
    </html>
  );
}
