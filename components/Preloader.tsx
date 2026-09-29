"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { site } from "@/data/site";

function Digit({ value }: { value: number }) {
  return (
    <span className="relative inline-block h-[1em] w-[0.62em] overflow-hidden align-top">
      <span
        className="absolute inset-x-0 top-0 transition-transform duration-200 ease-out"
        style={{ transform: `translateY(-${value * 10}%)` }}
      >
        {Array.from({ length: 10 }).map((_, n) => (
          <span key={n} className="block h-[1em] leading-[1em]">
            {n}
          </span>
        ))}
      </span>
    </span>
  );
}

export default function Preloader() {
  const [show, setShow] = useState(true);
  const [pct, setPct] = useState(0);
  const [word, setWord] = useState(0);
  const wordTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    (window as any).__lenis?.stop();

    wordTimer.current = setInterval(
      () => setWord((w) => (w + 1) % site.loadingWords.length),
      380,
    );

    const ctx = gsap.context(() => {
      gsap.set(".pl-name span", { yPercent: 110 });
      gsap.set(".pl-panel", { yPercent: 0 });

      const counter = { v: 0 };
      const tl = gsap.timeline();

      tl.to(
        ".pl-name span",
        {
          yPercent: 0,
          duration: 1,
          ease: "expo.out",
          stagger: 0.04,
        },
        0,
      )
        .to(
          counter,
          {
            v: 100,
            duration: 2.2,
            ease: "power2.inOut",
            onUpdate: () => setPct(Math.round(counter.v)),
          },
          0.2,
        )
        .to(".pl-bar", { scaleX: 1, duration: 2.2, ease: "power2.inOut" }, 0.2)
        .to(
          ".pl-row, .pl-name",
          {
            yPercent: (i) => (i % 2 === 0 ? -110 : 110),
            opacity: 0,
            duration: 0.55,
            ease: "power3.in",
          },
          ">0.1",
        )
        .to(
          ".pl-panel",
          {
            yPercent: (i: number) => (i % 2 === 0 ? -100 : 100),
            duration: 1.15,
            ease: "power4.inOut",
            stagger: 0.07,
            onStart: () => window.dispatchEvent(new CustomEvent("app:reveal")),
          },
          ">0.03",
        )
        .call(() => {
          sessionStorage.setItem("preloaded", "1");
          (window as any).__lenis?.start();
          if (wordTimer.current) clearInterval(wordTimer.current);
          setShow(false);
        });
    });

    return () => {
      ctx.revert();
      if (wordTimer.current) clearInterval(wordTimer.current);
    };
  }, []);

  if (!show) return null;

  const d1 = Math.floor(pct / 100) % 10;
  const d2 = Math.floor(pct / 10) % 10;
  const d3 = pct % 10;
  const name = site.name.split("");

  return (
    <div className="fixed inset-0 z-100 flex flex-col justify-between overflow-hidden text-bg">
      <div className="absolute inset-0 flex">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="pl-panel h-svh flex-1 border-r border-line bg-fg last:border-r-0"
          />
        ))}
      </div>

      <div className="pl-row relative z-10 flex items-center justify-between px-5 py-6 md:px-10 md:py-8">
        <span className="font-mono text-xs uppercase tracking-widest text-muted">
          {site.role}
        </span>
        <span className="font-mono text-xs uppercase tracking-widest text-muted">
          {site.loadingWords[word]}
        </span>
      </div>

      <div className="pl-name relative z-10 flex flex-1 items-center justify-center px-5">
        <h1 className="flex overflow-hidden text-[clamp(2.5rem,9vw,7rem)] font-semibold leading-none tracking-tighter">
          {name.map((c, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <span className="inline-block">{c === " " ? "\u00A0" : c}</span>
            </span>
          ))}
        </h1>
      </div>

      <div className="pl-row relative z-10 px-5 pb-6 md:px-10 md:pb-8">
        <div className="flex items-end justify-between">
          <span className="font-mono text-3xl tabular-nums md:text-5xl">
            <Digit value={d1} />
            <Digit value={d2} />
            <Digit value={d3} />
            <span className="ml-1 text-sm text-muted">%</span>
          </span>
          <span className="mb-2 hidden font-mono text-xs uppercase tracking-widest text-muted sm:block">
            Crafting the experience
          </span>
        </div>
        <div className="mt-4 h-px w-full bg-line">
          <div className="pl-bar h-full w-full origin-left scale-x-0 bg-bg" />
        </div>
      </div>
    </div>
  );
}
