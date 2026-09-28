"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null), ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!matchMedia("(pointer:fine)").matches) return;
    const dx = gsap.quickTo(dot.current, "x", { duration: 0.1 }), dy = gsap.quickTo(dot.current, "y", { duration: 0.1 });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.5, ease: "power3" }), ry = gsap.quickTo(ring.current, "y", { duration: 0.5, ease: "power3" });
    const move = (e: PointerEvent) => { dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY); };
    const over = (e: MouseEvent) => {
      const hot = (e.target as HTMLElement).closest("a,button,input,textarea,select,[data-cursor]");
      gsap.to(ring.current, { scale: hot ? 2.2 : 1, duration: 0.4, ease: "power3.out" });
    };
    addEventListener("pointermove", move); addEventListener("mouseover", over);
    return () => { removeEventListener("pointermove", move); removeEventListener("mouseover", over); };
  }, []);
  const base = "fixed left-0 top-0 z-[100] pointer-events-none rounded-full hidden [@media(pointer:fine)]:block -translate-x-1/2 -translate-y-1/2";
  return (<>
    <div ref={ring} className={`${base} h-9 w-9 border border-white mix-blend-difference`} />
    <div ref={dot} className={`${base} h-1.5 w-1.5 bg-white mix-blend-difference`} />
  </>);
}
