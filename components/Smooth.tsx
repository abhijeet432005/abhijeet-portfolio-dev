"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Smooth({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ lerp: 0.085, anchors: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    (window as any).__lenis = lenis;
    return () => { gsap.ticker.remove(tick); lenis.destroy(); };
  }, []);
  useEffect(() => {
    (window as any).__lenis?.scrollTo(0, { immediate: true });
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(el, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: "expo.out",
          delay: Number(el.dataset.delay || 0), scrollTrigger: { trigger: el, start: "top 90%" } });
      });
    });
    return () => ctx.revert();
  }, [path]);
  return <>{children}</>;
}
