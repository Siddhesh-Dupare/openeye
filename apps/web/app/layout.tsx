import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Main from "@/components/sidebar/SideBar";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OpenEye",
  description: "OpenEye AI workspace",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-inter">
        <SidebarProvider>
          <Main />
          <main className="flex min-h-screen min-w-0 flex-1 flex-col bg-background">
            <SidebarTrigger className="m-2 self-start" />
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
