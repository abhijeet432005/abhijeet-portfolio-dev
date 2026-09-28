"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import TransitionLink from "./TransitionLink";
import { home } from "@/data/home";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { eyebrow, words, sub, cta } = home.hero;
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".w", { yPercent: 115, rotate: 4, duration: 1.3, ease: "expo.out", stagger: 0.07, delay: 1.0 });
      gsap.from(".hf", { opacity: 0, y: 20, duration: 1, delay: 1.7, stagger: 0.1 });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={ref} className="flex min-h-svh flex-col justify-end px-5 pb-12 pt-32 md:px-10">
      <p className="hf mb-6 font-mono text-xs uppercase tracking-widest text-muted">{eyebrow}</p>
      <h1 className="text-[clamp(3rem,10.5vw,10rem)] font-semibold leading-[0.92] tracking-tighter">
        {words.map((w, i) => (<span key={i} className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-top"><span className="w inline-block">{w}</span></span>))}
      </h1>
      <div className="mt-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <p className="hf max-w-md text-lg text-muted">{sub}</p>
        <TransitionLink href="/contact" data-cursor className="hf w-fit rounded-full bg-fg px-7 py-4 font-medium text-bg transition-transform hover:scale-105">{cta}</TransitionLink>
      </div>
    </section>
  );
}
