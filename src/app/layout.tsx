import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Theme } from "@radix-ui/themes";
import "./globals.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import { Header } from "@/components/Header/Header";
import { ToasterProvider } from "@/providers/ToasterProvider";
import getSongsByUserId from "@/actions/getSongsByUserId";
import QueryClientProvider from "@/providers/QueryClientProvider";
import { Player } from "@/components/Player/Player";

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
  const userSongs = await getSongsByUserId();
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme>
          <ToasterProvider />
          <QueryClientProvider>
            <SupabaseProvider>
              <UserProvider>
                <ModalProvider />
                <Sidebar songs={userSongs}>
                  <Header>header</Header>
                  {children}
                </Sidebar>
                <Player/>
              </UserProvider>
            </SupabaseProvider>
          </QueryClientProvider>
        </Theme>
      </body>
    </html>
  );
}
