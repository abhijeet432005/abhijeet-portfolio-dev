type T = { quote: string; name: string; role: string };
export default function Marquee({ items }: { items: T[] }) {
  const row = (list: T[], rev: boolean) => (
    <div className="group flex overflow-hidden py-3">
      <div className={`flex w-max shrink-0 gap-6 pr-6 [animation:marquee_70s_linear_infinite] group-hover:[animation-play-state:paused] ${rev ? "[animation-direction:reverse]" : ""}`}>
        {[...list, ...list, ...list, ...list].map((t, i) => (
          <figure key={i} className="w-[300px] shrink-0 rounded-3xl border border-line bg-card p-7 backdrop-blur md:w-[400px]">
            <blockquote className="text-lg leading-snug">“{t.quote}”</blockquote>
            <figcaption className="mt-6 text-sm"><b>{t.name}</b><br /><span className="text-muted">{t.role}</span></figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
  return <div>{row(items, false)}{row([...items].reverse(), true)}</div>;
}
