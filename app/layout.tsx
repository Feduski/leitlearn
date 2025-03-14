import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Providers } from "./api/auth/Providers";
import { ReactNode } from "react";

export const metadata = {
  title: "LeitLearn",
  description: "Aprendé de manera rápida y sencilla con el método Leitls",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Providers>
            <NavBar />
            {children}
            <Footer />
          </Providers>
      </body>
    </html>
  );
}
