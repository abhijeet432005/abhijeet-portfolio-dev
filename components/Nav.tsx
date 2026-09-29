"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import TransitionLink from "./TransitionLink";
import ThemeToggle from "./ThemeToggle";
import { site } from "@/data/site";
import { projects } from "@/data/projects";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const l = (window as any).__lenis;
    open ? l?.stop() : l?.start();
    return () => l?.start();
  }, [open]);
  const link = (h: string) =>
    `px-4 py-2 text-sm transition-colors hover:text-fg ${path === h ? "text-fg" : "text-muted"}`;
  const bar =
    "absolute left-1/2 top-1/2 h-px w-5 bg-fg transition-transform duration-300";
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[70] flex items-center justify-between px-5 py-4 md:px-10">
        <TransitionLink href="/" id="logo-anchor" onClick={() => setOpen(false)} className="font-semibold tracking-tight">{site.name}</TransitionLink>
        <nav className="hidden items-center rounded-full border border-line bg-card px-2 backdrop-blur md:flex">
          {site.nav.map((n) => (
            <TransitionLink key={n.href} href={n.href} className={link(n.href)}>
              {n.label}
            </TransitionLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            aria-expanded={open}
            className="relative h-10 w-10 rounded-full border border-line bg-card backdrop-blur md:hidden"
          >
            <span
              className={bar}
              style={{
                transform: `translate(-50%,${open ? 0 : -4}px) rotate(${open ? 45 : 0}deg)`,
              }}
            />
            <span
              className={bar}
              style={{
                transform: `translate(-50%,${open ? 0 : 4}px) rotate(${open ? -45 : 0}deg)`,
              }}
            />
          </button>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div
            data-lenis-prevent
            initial={{ clipPath: "circle(0px at calc(100% - 40px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ clipPath: "circle(0px at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] flex flex-col justify-between overflow-y-auto bg-bg px-5 pb-8 pt-28 md:hidden"
          >
            <nav className="flex flex-col">
              {site.nav.map((n, i) => (
                <motion.div
                  key={n.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.25 + i * 0.07, duration: 0.6 }}
                >
                  <TransitionLink
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-baseline gap-3 border-b border-line py-4 text-5xl font-semibold tracking-tighter ${path === n.href ? "" : "text-muted"}`}
                  >
                    <span className="font-mono text-xs">0{i + 1}</span>
                    {n.label}
                  </TransitionLink>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-10 grid gap-5 text-sm"
            >
              <a
                href={projects[0].live}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit rounded-full bg-fg px-5 py-3 font-medium text-bg"
              >
                Latest project: {projects[0].title} ↗
              </a>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {site.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-4 hover:underline"
                  >
                    {s.label} ↗
                  </a>
                ))}
              </div>
              <div className="text-muted">
                <a href={`mailto:${site.email}`}>{site.email}</a>
                <br />
                <a href={`tel:${site.phone.replace(/\s/g, "")}`}>
                  {site.phone}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
