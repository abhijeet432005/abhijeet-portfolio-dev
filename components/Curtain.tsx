"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { site } from "@/data/site";

const PANELS = 5;

export default function Curtain() {
  const path = usePathname();

  useEffect(() => {
    // fires on first load AND after every route change — reveals the page
    const tl = gsap.timeline({ delay: 0.1 });
    tl.to(".curtain-panel", {
      yPercent: -100,
      duration: 0.9,
      ease: "expo.inOut",
      stagger: 0.06,
    }, 0)
    .to("#curtain-word span", {
      yPercent: -120,
      opacity: 0,
      duration: 0.5,
      ease: "power3.in",
      stagger: 0.015,
    }, 0)
    .fromTo("main", {
      scale: 1.04,
      opacity: 0.5,
      filter: "blur(6px)",
    }, {
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1.1,
      ease: "power3.out",
    }, 0.15);
  }, [path]);

  return (
    <div id="curtain" className="pointer-events-none fixed inset-0 z-[90] flex">
      {Array.from({ length: PANELS }).map((_, i) => (
        <div key={i} className="curtain-panel h-full flex-1 bg-fg" />
      ))}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <span id="curtain-word" className="flex text-4xl font-semibold tracking-tight text-bg md:text-7xl">
          {site.name.split("").map((c, i) => (
            <span key={i} className="inline-block">{c === " " ? "\u00A0" : c}</span>
          ))}
        </span>
      </div>
    </div>
  );
}