import "./globals.css";
import type { ReactNode } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { I18nProvider } from "../lib/i18n";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh">
      <body>
        <I18nProvider>
          <Header />
          <main className="min-h-[calc(100vh-120px)]">{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
