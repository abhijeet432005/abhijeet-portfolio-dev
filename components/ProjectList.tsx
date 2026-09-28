import { projects } from "@/data/projects";
export default function ProjectList({ limit }: { limit?: number }) {
  return (
    <div>
      {projects.slice(0, limit).map((p, i) => (
        <a key={p.title} href={p.live} target="_blank" rel="noopener noreferrer" data-reveal data-cursor
          className="group grid gap-3 border-t border-line py-8 transition-all hover:px-4 md:grid-cols-12 md:items-center">
          <span className="font-mono text-xs text-muted md:col-span-1">0{i + 1}</span>
          <h3 className="text-3xl font-medium tracking-tight md:col-span-5 md:text-5xl">{p.title}</h3>
          <p className="text-muted md:col-span-4">{p.text}<br /><span className="font-mono text-xs">{p.tags.join(" · ")} · {p.year}</span></p>
          <span className="font-mono text-sm md:col-span-2 md:text-right">Live site ↗</span>
        </a>
      ))}
      <div className="border-t border-line" />
    </div>
  );
}
