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

    const els = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    // hide immediately so nothing flashes while the preloader/curtain still covers the page
    gsap.set(els, { y: 50, opacity: 0 });

    let ctx: gsap.Context | undefined;
    const setup = () => {
      ctx = gsap.context(() => {
        els.forEach((el) => {
          gsap.to(el, {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: "expo.out",
            delay: Number(el.dataset.delay || 0.5),
            scrollTrigger: { trigger: el, start: "top 100%" },
          });
        });
      });
    };

    window.addEventListener("app:reveal", setup, { once: true });
    // safety net: if the event is ever missed, still reveal after a short wait
    const fallback = setTimeout(setup, 4000);
    const clearFallback = () => clearTimeout(fallback);
    window.addEventListener("app:reveal", clearFallback, { once: true });

    return () => {
      ctx?.revert();
      window.removeEventListener("app:reveal", setup);
      window.removeEventListener("app:reveal", clearFallback);
      clearTimeout(fallback);
    };
  }, [path]);

  return <>{children}</>;
}