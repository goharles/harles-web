import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Harles & Associates | Sustainability & ESG Solutions",
  description: "Harles & Associates is a multidisciplinary consultancy providing sustainability advisory, ESG compliance solutions, environmental assessments, and innovative digital tools.",
  keywords: "sustainability, ESG, environmental assessment, compliance, Ghana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} font-sans antialiased`}>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
