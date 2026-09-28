import TransitionLink from "./TransitionLink";
export default function Cta({ text = "Have a project in mind?" }: { text?: string }) {
  return (
    <section className="px-5 py-32 text-center md:px-10">
      <h2 data-reveal className="mx-auto max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tighter md:text-8xl">{text}</h2>
      <TransitionLink href="/contact" className="mt-10 inline-block rounded-full bg-fg px-8 py-4 font-medium text-bg transition-transform hover:scale-105">Let’s talk →</TransitionLink>
    </section>
  );
}
