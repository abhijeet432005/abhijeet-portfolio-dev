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
import Preloader from "@/components/Preloader";
import { absoluteUrl, siteUrl } from "@/lib/seo";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--f-display" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--f-mono" });
export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: `${site.name} | Freelance Web Developer in New Delhi, India`,
    template: `%s | ${site.name}`,
  },
  description:
    "Abhijeet Kumar is a freelance web developer in New Delhi, India, building frontend, backend, full-stack, Shopify, and AI projects from design through launch.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: absoluteUrl("/"),
    siteName: site.name,
    title: `${site.name} | Freelance Web Developer in New Delhi, India`,
    description:
      "Abhijeet Kumar builds frontend, backend, full-stack, Shopify, and AI experiences for businesses and startups in New Delhi, India.",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Freelance Web Developer in New Delhi, India`,
    description:
      "Abhijeet Kumar builds frontend, backend, full-stack, Shopify, and AI experiences for businesses and startups.",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};
const themeInit = `try{var t=localStorage.getItem("theme")||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${absoluteUrl("/")}#person`,
        name: site.name,
        url: absoluteUrl("/"),
        jobTitle: "Freelance Web Developer, Full-Stack & AI Engineer",
        description:
          "Abhijeet Kumar is a freelance web developer and full-stack AI engineer based in New Delhi, India.",
        email: site.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: "New Delhi",
          addressCountry: "IN",
        },
        sameAs: site.socials.map((social) => social.href),
        knowsAbout: [
          "Frontend development",
          "Backend development",
          "Full-stack web development",
          "Shopify development",
          "AI integration",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${absoluteUrl("/")}#website`,
        url: absoluteUrl("/"),
        name: `${site.name} Portfolio`,
        inLanguage: "en-IN",
        publisher: { "@id": `${absoluteUrl("/")}#person` },
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body>
        <Smooth>
          <Shader />
          <Nav />
          <main id="top" className="relative z-10">{children}</main>
          <Footer />
        </Smooth>
        <Cursor />
        <Preloader />
        <Curtain />
      </body>
    </html>
  );
}
