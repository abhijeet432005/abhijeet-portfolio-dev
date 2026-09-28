"use client";
import { useRouter, usePathname } from "next/navigation";
import gsap from "gsap";

export default function TransitionLink({ href, children, className, onClick }: { href: string; children: React.ReactNode; className?: string; onClick?: () => void }) {
  const router = useRouter(), path = usePathname();
  const go = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick?.();
    if (href === path) return;
    gsap.set("#curtain-text", { opacity: 0 });
    gsap.fromTo("#curtain", { yPercent: 100 }, { yPercent: 0, duration: 0.75, ease: "expo.inOut", onComplete: () => router.push(href) });
  };
  return <a href={href} onClick={go} className={className}>{children}</a>;
}
