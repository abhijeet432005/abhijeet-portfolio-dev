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
    gsap.set(".w", { yPercent: 115, rotate: 4 });
    gsap.set(".hf", { opacity: 0, y: 20 });

    const play = () => {
      gsap.to(".w", { yPercent: 0, rotate: 0, duration: 1.0, ease: "expo.out", stagger: 0.05 });
      gsap.to(".hf", { opacity: 1, y: 0, duration: 0.8, delay: 0.15, stagger: 0.08 });
    };

    window.addEventListener("app:reveal", play, { once: true });
    const fallback = setTimeout(play, 3500); // safety net if the event never fires
    window.addEventListener("app:reveal", () => clearTimeout(fallback), { once: true });
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
