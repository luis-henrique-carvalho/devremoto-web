import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://devremoto.luis-carvalho.online"),
  title: {
    default: "dev.remoto · Radar de Vagas 100% Remotas e Ferramentas Tech",
    template: "%s · dev.remoto",
  },
  description:
    "Curadoria diária de vagas tech 100% home office no Brasil e artigos técnicos sobre novas ferramentas open-source, inteligência artificial e carreira.",
  openGraph: {
    title: "dev.remoto · Radar de Vagas 100% Remotas e Ferramentas Tech",
    description:
      "Curadoria diária de vagas tech 100% home office no Brasil e análises de ferramentas open-source.",
    url: "https://devremoto.luis-carvalho.online",
    siteName: "dev.remoto",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "dev.remoto · Vagas 100% Remotas e Ferramentas Tech",
    description: "Curadoria diária de vagas remotas no Brasil e ferramentas open-source.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${jetbrainsMono.variable} dark h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
