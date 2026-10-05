import TransitionLink from "./TransitionLink";
import { site } from "@/data/site";

export default function Footer() {
  const initials = site.name
    .split(" ")
    .map((w) => w[0])
    .join("");
  const h = "mb-4 font-mono text-xs uppercase tracking-widest text-muted";
  const a = "block py-1 transition-opacity hover:opacity-60";
  return (
    <footer className="relative z-10 border-t border-line bg-bg/70 px-5 pb-8 pt-16 backdrop-blur md:px-10">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <TransitionLink href="/" className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-fg font-semibold text-bg">
              {initials}
            </span>
            <span className="text-xl font-semibold tracking-tight">
              {site.name}
            </span>
          </TransitionLink>
          <p className="mt-6 max-w-sm text-muted">{site.about}</p>
        </div>
        <div className="md:col-span-2">
          <h4 className={h}>Pages</h4>
          {site.nav.map((n) => (
            <TransitionLink key={n.href} href={n.href} className={a}>
              {n.label}
            </TransitionLink>
          ))}
        </div>
        <div className="md:col-span-2">
          <h4 className={h}>Social</h4>
          {site.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className={a}
            >
              {s.label} ↗
            </a>
          ))}
        </div>
        <div className="md:col-span-3">
          <h4 className={h}>Get in touch</h4>
          <a href={`mailto:${site.email}`} className={a}>
            {site.email}
          </a>
          <a href={`tel:${site.phone.replace(/\s/g, "")}`} className={a}>
            {site.phone}
          </a>
          <span className="block py-1 text-muted">{site.city}</span>
        </div>
      </div>
      <div className="mt-16 flex flex-col justify-between gap-3 border-t border-line pt-6 font-mono text-xs text-muted sm:flex-row">
        <span>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </span>
        <a href="#top" className="hover:text-fg">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
