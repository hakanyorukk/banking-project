import type { Metadata } from "next";
import { Inter, Lato } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

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
        <Toaster
          position="top-right"
          toastOptions={{
            className: "bg-green-500",
            style: {
              border: "1px solid #164e63",
              padding: "16px",
              color: "#f8fafc",
              backgroundColor: "#0f172a",
            },
            iconTheme: {
              primary: "#0ea5e9",
              secondary: "#FFFAEE",
            },
          }}
        />
      </body>
    </html>
  );
}
