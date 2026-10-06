import Cta from "@/components/Cta";
import { about } from "@/data/about";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Abhijeet Kumar, a New Delhi-based freelance full-stack developer building responsive websites, e-commerce experiences, and production-ready web apps.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (<>
    <section className="px-5 pb-20 pt-40 md:px-10">
      <p data-reveal className="mb-6 font-mono text-xs uppercase tracking-widest text-muted">About</p>
      <h1 data-reveal className="max-w-5xl text-5xl font-semibold leading-[0.95] tracking-tighter md:text-8xl">{about.title}</h1>
      <div className="mt-16 grid gap-8 md:grid-cols-2">
        <div className="space-y-5 text-lg text-muted">{about.paragraphs.map((p, i) => <p key={i} data-reveal>{p}</p>)}</div>
        <div className="grid grid-cols-3 gap-4">
          {about.stats.map((s) => (
            <div key={s.label} data-reveal className="rounded-3xl border border-line bg-card p-5 backdrop-blur">
              <div className="text-4xl font-semibold tracking-tight md:text-5xl">{s.value}</div>
              <div className="mt-2 text-sm text-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
    <section className="px-5 py-20 md:px-10">
      <h2 data-reveal className="mb-10 text-4xl font-semibold tracking-tighter md:text-6xl">Toolkit</h2>
      <div className="grid gap-6 md:grid-cols-4">
        {about.skills.map((g) => (
          <div key={g.group} data-reveal className="border-t border-line pt-5">
            <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">{g.group}</h3>
            {g.items.map((i) => <p key={i} className="py-0.5">{i}</p>)}
          </div>
        ))}
      </div>
    </section>
    <section className="px-5 py-20 md:px-10">
      <h2 data-reveal className="mb-10 text-4xl font-semibold tracking-tighter md:text-6xl">Journey</h2>
      {about.timeline.map((t) => (
        <div key={t.title} data-reveal className="grid gap-2 border-t border-line py-8 md:grid-cols-12">
          <span className="font-mono text-sm text-muted md:col-span-3">{t.year}</span>
          <h3 className="text-2xl md:col-span-4">{t.title}</h3>
          <p className="text-muted md:col-span-5">{t.text}</p>
        </div>
      ))}
    </section>
    <Cta text="Let’s work together." />
  </>);
}
