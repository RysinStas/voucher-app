import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CssBaseline } from "@mui/material";
import { Container } from "@mui/system";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Voucher",
  description: "Create Voucher app",
  viewport: "initial-scale=1, width=device-width",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          {children}
        </Container>
      </body>
    </html>
  );
}
