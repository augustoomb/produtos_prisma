import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner" // toast do shadcn ui

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PagFreela",
  description: "Um app para testar funcionalidades do nextjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <Toaster /> 
    </html>
  );
}
