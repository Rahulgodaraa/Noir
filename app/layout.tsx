import Footer from "./component/Footer";
import NavbarClient from "./component/NavbarClient";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode // ✅ Changed from React.Component to React.ReactNode
}) {
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