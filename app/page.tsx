import Hero from "@/components/Hero";
import Faq from "@/components/Faq";
import Marquee from "@/components/Marquee";
import ProjectList from "@/components/ProjectList";
import Cta from "@/components/Cta";
import TransitionLink from "@/components/TransitionLink";
import { home } from "@/data/home";

export const metadata = {
  alternates: { canonical: "/" },
};

const h2 = "text-5xl font-semibold tracking-tighter md:text-7xl";
export default function Home() {
  const { stack, services, process, testimonials, faqs } = home;
  return (<>
    <Hero />
    <div className="overflow-hidden border-y border-line py-5 font-mono text-sm uppercase">
      <div className="flex w-max gap-12 [animation:marquee_30s_linear_infinite]">
        {[...stack, ...stack].map((s, i) => <span key={i}>{s} <span className="text-muted">✦</span></span>)}
      </div>
    </div>
    <section className="px-5 py-32 md:px-10">
      <h2 data-reveal className={`mb-16 ${h2}`}>Freelance web development services</h2>
      <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <div key={s.title} data-reveal data-cursor className="bg-bg/70 p-8 backdrop-blur transition-colors hover:bg-fg hover:text-bg md:p-10">
            <span className="font-mono text-xs opacity-60">0{i + 1}</span>
            <h3 className="mb-3 mt-16 text-2xl font-medium">{s.title}</h3>
            <p className="opacity-70">{s.text}</p>
          </div>
        ))}
      </div>
    </section>
    <section className="px-5 py-24 md:px-10">
      <div className="mb-12 flex items-end justify-between"><h2 data-reveal className={h2}>Selected work</h2>
        <TransitionLink href="/work" className="text-sm underline underline-offset-4">All projects →</TransitionLink></div>
      <ProjectList limit={3} />
    </section>
    <section className="px-5 py-24 md:px-10">
      <h2 data-reveal className={`mb-12 ${h2}`}>Process</h2>
      <div className="grid gap-6 md:grid-cols-4">
        {process.map((p, i) => (
          <div key={p.title} data-reveal data-delay={i * 0.1} className="border-t border-line pt-6">
            <span className="font-mono text-xs text-muted">0{i + 1}</span>
            <h3 className="mt-2 text-2xl">{p.title}</h3><p className="mt-2 text-muted">{p.text}</p>
          </div>
        ))}
      </div>
    </section>
    <section className="py-24">
      <h2 data-reveal className={`mb-12 px-5 md:px-10 ${h2}`}>Kind words</h2>
      <Marquee items={testimonials} />
    </section>
    <section className="px-5 py-24 md:px-10">
      <h2 data-reveal className={`mb-12 ${h2}`}>FAQ</h2>
      <div data-reveal><Faq items={faqs} /></div>
    </section>
    <Cta />
  </>);
}
