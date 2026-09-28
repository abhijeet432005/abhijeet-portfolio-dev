"use client";
import { useState } from "react";
import { contact } from "@/data/contact";

export default function ContactForm() {
  const [s, setS] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setS("sending");
    const form = e.currentTarget;
    const fd = new FormData(form);
    fd.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "");
    fd.append("subject", "New project enquiry from your portfolio");
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: fd });
      const j = await res.json();
      setS(j.success ? "ok" : "err");
      if (j.success) form.reset();
    } catch { setS("err"); }
  };
  const f = "w-full border-b border-line bg-transparent py-4 text-lg outline-none transition-colors placeholder:text-muted focus:border-fg";
  return (
    <form onSubmit={submit} className="grid gap-6">
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} />
      <input name="name" required placeholder="Your name" className={f} />
      <input name="email" type="email" required placeholder="Email address" className={f} />
      <select name="service" className={`${f} bg-bg`}>{contact.services.map((o) => <option key={o}>{o}</option>)}</select>
      <textarea name="message" required rows={4} placeholder="Tell me about your project" className={f} />
      <button disabled={s === "sending"} data-cursor className="w-fit rounded-full bg-fg px-8 py-4 font-medium text-bg transition-transform hover:scale-105 disabled:opacity-50">
        {s === "sending" ? "Sending…" : "Send message →"}
      </button>
      {s === "ok" && <p className="text-muted">Thanks — I&apos;ll reply within 24 hours.</p>}
      {s === "err" && <p className="text-red-500">Something went wrong. Check your Web3Forms key or email me directly.</p>}
    </form>
  );
}
