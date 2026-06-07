"use client";

import Link from "next/link";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

export default function NavDropdown({ label, items, scrolled, onNavigate }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={`inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold ${
          scrolled
            ? "text-[#303433] hover:bg-[#eef5f1] dark:text-white/80 dark:hover:bg-white/10"
            : "text-white hover:bg-white/12"
        }`}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {label}
        <FiChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 min-w-[240px] pt-2">
          <div className="rounded-2xl border border-black/10 bg-white p-2 shadow-xl dark:border-white/10 dark:bg-[#0b1224]">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  setOpen(false);
                  onNavigate?.();
                }}
                className="block rounded-xl px-4 py-2.5 text-sm font-medium text-[#202423] hover:bg-[#eef5f1] dark:text-white dark:hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
