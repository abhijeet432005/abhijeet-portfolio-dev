"use client";
const ic = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
export default function ThemeToggle() {
  const toggle = (e: React.MouseEvent) => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    const apply = () => { root.dataset.theme = next; try { localStorage.setItem("theme", next); } catch {} };
    if (!document.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) return apply();
    const x = e.clientX, y = e.clientY;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    document.startViewTransition(apply).ready.then(() =>
      root.animate({ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 800, easing: "cubic-bezier(.65,0,.35,1)", pseudoElement: "::view-transition-new(root)" }));
  };
  return (
    <button onClick={toggle} aria-label="Toggle theme" className="grid h-10 w-10 place-items-center rounded-full border border-line bg-card backdrop-blur">
      <svg {...ic} className="sun"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
      <svg {...ic} className="moon"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
    </button>
  );
}
