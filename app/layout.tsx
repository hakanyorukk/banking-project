import type { Metadata } from "next";
import { Inter, Lato } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: {
    template: "%s / Truvia Bank",
    default: "Welcome / Truvia Bank",
  },
  description: "Truvia Bank is a modern banking platform for everyone",
  icons: "/bank.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${lato.variable} dark:bg-slate-900 dark:text-slate-200 bg-slate-100 text-slate-700 transition-colors duration-300`}
      >
        {children}
      </body>
    </html>
  );
}
