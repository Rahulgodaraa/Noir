import Footer from "./component/Footer";
import NavbarClient from "./component/NavbarClient";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { CartProvider } from "./hooks/useCart";
import { Cormorant_Garamond, Inter } from "next/font/google";
import SmoothScroll from "./component/shared/SmoothScroll";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="antialiased font-sans bg-[#0A0A0A] text-white">
        <ThemeProvider>
          <LanguageProvider>
            <CartProvider>
              <SmoothScroll>
                <NavbarClient />
                <main className="">{children}</main>
                <Footer />
              </SmoothScroll>
            </CartProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}