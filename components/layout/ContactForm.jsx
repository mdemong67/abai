"use client";

import { useSite } from "@/components/providers/SiteProvider";

export default function ContactForm() {
  const { language } = useSite();
  const submit =
    language === "bn" ? "বার্তা পাঠান" : "Send message";

  return (
    <form
      className="grid gap-3 rounded-[1.5rem] border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-[#101615]"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        className="h-12 rounded-2xl border border-black/10 bg-transparent px-4 text-sm font-semibold outline-none focus:border-[#0757ff] dark:border-white/15"
        placeholder={language === "bn" ? "নাম" : "Name"}
        required
      />
      <input
        type="email"
        className="h-12 rounded-2xl border border-black/10 bg-transparent px-4 text-sm font-semibold outline-none focus:border-[#0757ff] dark:border-white/15"
        placeholder={language === "bn" ? "ইমেইল" : "Email"}
        required
      />
      <textarea
        className="min-h-32 rounded-2xl border border-black/10 bg-transparent px-4 py-3 text-sm font-semibold outline-none focus:border-black/50 dark:border-white/15"
        placeholder={language === "bn" ? "বার্তা" : "Message"}
        required
      />
      <div className="flex justify-end items-center">
        <button
          type="submit"
          className="h-12 rounded-full w-fit px-6 mt-5 bg-[#4b0102] text-sm font-black text-white"
        >
          {submit}
        </button>
      </div>
    </form>
  );
}
