import type { Metadata } from "next";
import "./globals.css"; // Even if empty, keep this import
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Daily STX Raffle",
  description: "Try your luck on the Stacks Blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}