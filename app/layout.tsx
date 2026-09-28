import "./globals.css";
import type { Metadata } from "next";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import Smooth from "@/components/Smooth";
import Shader from "@/components/Shader";
import Cursor from "@/components/Cursor";
import Curtain from "@/components/Curtain";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { site } from "@/data/site";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--f-display" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--f-mono" });
export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description: site.about,
};
const themeInit = `try{var t=localStorage.getItem("theme")||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${mono.variable}`}>
      <head><script dangerouslySetInnerHTML={{ __html: themeInit }} /></head>
      <body>
        <Smooth>
          <Shader />
          <Nav />
          <main id="top" className="relative z-10">{children}</main>
          <Footer />
        </Smooth>
        <Cursor />
        <Curtain />
      </body>
    </html>
  );
}
