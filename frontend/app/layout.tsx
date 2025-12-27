import type { Metadata } from "next";
import { Montserrat } from "next/font/google"; 
import "./globals.css";
import { Providers } from "./providers";

// Configure Montserrat for the whole app
const montserrat = Montserrat({ 
  subsets: ["latin"], 
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800", "900"], 
});

export const metadata: Metadata = {
  title: "OPENSEASON",
  description: "| Daily STX Raffle",
  icons: {
    icon: "/OpenSeason.png",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}