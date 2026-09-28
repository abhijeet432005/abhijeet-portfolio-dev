"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { site } from "@/data/site";

export default function Curtain() {
  const path = usePathname();
  useEffect(() => {
    gsap.to("#curtain", { yPercent: -100, duration: 1, ease: "expo.inOut", delay: 0.15 });
    gsap.fromTo("#curtain-text", { opacity: 1 }, { opacity: 0, duration: 0.4 });
  }, [path]);
  return (
    <div id="curtain" className="fixed inset-0 z-[90] flex items-center justify-center bg-fg text-bg">
      <span id="curtain-text" className="text-4xl font-semibold tracking-tight md:text-7xl">{site.name}</span>
    </div>
  );
}
