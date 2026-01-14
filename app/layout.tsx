import Footer from "./component/Footer";
import NavbarClient from "./component/NavbarClient";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
// import NavbarClient from "@/component/NavbarClient";
// import Footer from "@/component/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeProvider>
          <NavbarClient />
          <main className="pt-24">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
