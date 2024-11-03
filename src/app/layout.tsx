import ModalProvider from "@/providers/ModalProvider";
import QueryClientProvider from "@/providers/QueryClientProvider";
import { ToasterProvider } from "@/providers/ToasterProvider";

import { MockServiceProvider } from "@/providers/MockServiceProvider";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import UserProvider from "@/providers/UserProvider";
import { mswStart } from "@/mocks";
import { DrawerProvider } from "@/providers/DrawerProvider";
const inter = Inter({ subsets: ["latin"] });

// 모바일 확대 축소 제한
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_API_BASE_URL!),
  keywords:["front-end","portfolio","구상모","koosang","KooSang-project"],
  title: {
    default:"KooSang-project",
    template: `%s | KooSang-project`
  },
  description: "side project for KooSang",
  openGraph:{
    description: "구상모의 놀이터입니다. 배운기술을 연마하고 사용하기 위한 사이트 입니다.",
    images:['']
  }
};

export const revalidate = 0;

mswStart(); // 서버단 실행

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
            <UserProvider>
              <DrawerProvider>
                <ModalProvider />
                {children}
              </DrawerProvider>
            </UserProvider>
          </QueryClientProvider>
        </Theme>
      </body>
    </html>
  );
}
