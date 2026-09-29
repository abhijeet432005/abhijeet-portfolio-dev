"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { projects } from "@/data/projects";

export default function ProjectList({ limit }: { limit?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rows = el.querySelectorAll<HTMLElement>(".proj-row");
    gsap.set(rows, { y: 40, opacity: 0 });

    const play = () => {
      gsap.to(rows, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "expo.out",
        stagger: 0.09,
        delay: 0.35, // lets the page title lift first, then rows cascade in
      });
    };

    window.addEventListener("app:reveal", play, { once: true });
    const fallback = setTimeout(play, 4000);
    const clearFallback = () => clearTimeout(fallback);
    window.addEventListener("app:reveal", clearFallback, { once: true });

    return () => {
      window.removeEventListener("app:reveal", play);
      window.removeEventListener("app:reveal", clearFallback);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div ref={ref}>
      {projects.slice(0, limit).map((p, i) => (
        <a
          key={p.title}
          href={p.live}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor
          className="proj-row group grid gap-3 border-t border-line py-8 transition-[padding-left] duration-500 ease-out hover:pl-4 md:grid-cols-12 md:items-center"
        >
          <span className="font-mono text-xs text-muted md:col-span-1">0{i + 1}</span>
          <h3 className="text-3xl font-medium tracking-tight md:col-span-5 md:text-5xl">{p.title}</h3>
          <p className="text-muted md:col-span-4">
            {p.text}
            <br />
            <span className="font-mono text-xs">{p.tags.join(" · ")} · {p.year}</span>
          </p>
          <span className="font-mono text-sm md:col-span-2 md:text-right">Live site ↗</span>
        </a>
      ))}
      <div className="border-t border-line" />
    </div>
  );
}
