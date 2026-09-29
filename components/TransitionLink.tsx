"use client";
import { useRouter, usePathname } from "next/navigation";
import gsap from "gsap";

export default function TransitionLink({ href, children, className, onClick }: { href: string; children: React.ReactNode; className?: string; onClick?: () => void }) {
  const router = useRouter(), path = usePathname();
  const go = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick?.();
    if (href === path) return;
    const tl = gsap.timeline();
    tl.set("#curtain-word span", { yPercent: 120, opacity: 0 })
      .to(".curtain-panel", {
        yPercent: 0,
        duration: 0.7,
        ease: "expo.inOut",
        stagger: 0.05,
      }, 0)
      .to("#curtain-word span", {
        yPercent: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.02,
      }, 0.25)
      .call(() => router.push(href));
  };
  return <a href={href} onClick={go} className={className}>{children}</a>;
}