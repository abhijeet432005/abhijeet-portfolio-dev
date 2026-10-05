// components/CustomSelect.tsx
"use client";

import { useEffect, useId, useRef, useState } from "react";

type CustomSelectProps = {
  name: string;
  options: string[];
  placeholder?: string;
  defaultValue?: string;
  className?: string;
};

export default function CustomSelect({
  name,
  options,
  placeholder = "Select…",
  defaultValue = "",
  className = "",
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const [activeIndex, setActiveIndex] = useState(-1);

  const rootRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Array<HTMLLIElement | null>>([]);
  const listboxId = useId();

  const commit = (option: string) => {
    setValue(option);
    setOpen(false);
  };

  // click outside closes
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // sync highlighted option whenever it opens
  useEffect(() => {
    if (!open) return;
    const idx = options.indexOf(value);
    setActiveIndex(idx >= 0 ? idx : 0);
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  // keep the highlighted option scrolled into view
  useEffect(() => {
    optionRefs.current[activeIndex]?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, options.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (activeIndex >= 0) commit(options[activeIndex]);
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  };

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      {/* carries the value through the existing FormData submit */}
      <input type="hidden" name={name} value={value} />

      <button
        type="button"
        data-cursor
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKeyDown}
        className="flex w-full items-center justify-between border-b border-line bg-transparent py-4 text-left text-lg outline-none transition-colors focus:border-fg"
      >
        <span className={value ? "text-fg" : "text-muted"}>
          {value || placeholder}
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className={`shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
            open ? "rotate-180" : ""
          }`}
        >
          <path
            d="M2 4.5L7 9.5L12 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <ul
        id={listboxId}
        role="listbox"
        tabIndex={-1}
        className={`absolute inset-x-0 top-full z-20 mt-2 origin-top overflow-hidden rounded-xl border border-line bg-bg shadow-xl transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          open
            ? "pointer-events-auto scale-y-100 opacity-100"
            : "pointer-events-none scale-y-95 opacity-0"
        }`}
      >
        {options.map((option, i) => (
          <li
            key={option}
            ref={(el) => {
              optionRefs.current[i] = el;
            }}
            role="option"
            aria-selected={option === value}
            onMouseEnter={() => setActiveIndex(i)}
            onClick={() => commit(option)}
            className={`cursor-pointer px-5 py-3 text-base transition-colors ${
              i === activeIndex ? "bg-fg/10 text-fg" : "text-muted"
            }`}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}
