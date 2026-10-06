import ContactForm from "@/components/ContactForm";
import { contact } from "@/data/contact";
import { site } from "@/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hire a Freelance Web Developer",
  description:
    "Have a website, Shopify store, backend, or AI project in mind? Contact Abhijeet Kumar, a freelance web developer in New Delhi, India.",
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <section className="grid gap-16 px-5 pb-32 pt-40 md:grid-cols-2 md:px-10">
      <div>
        <p data-reveal className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted"><span className="h-2 w-2 rounded-full bg-green-500" />{contact.availability}</p>
        <h1 data-reveal className="text-5xl font-semibold leading-[0.95] tracking-tighter md:text-8xl">{contact.title}</h1>
        <p data-reveal className="mt-8 max-w-md text-lg text-muted">{contact.text}</p>
        <div data-reveal className="mt-10 grid gap-2">
          <a href={`mailto:${site.email}`} className="text-xl underline-offset-4 hover:underline">{site.email}</a>
          <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="text-xl underline-offset-4 hover:underline">{site.phone}</a>
          <span className="text-muted">{site.city}</span>
          <div className="mt-4 flex flex-wrap gap-5">{site.socials.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">{s.label} ↗</a>)}</div>
        </div>
      </div>
      <div data-reveal><ContactForm /></div>
    </section>
  );
}
