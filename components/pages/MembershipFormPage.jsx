"use client";

import PageShell from "@/components/layout/PageShell";
import InnerPageHero from "@/components/layout/InnerPageHero";
import { useSite } from "@/components/providers/SiteProvider";
import { pages } from "@/lib/site-content";

export default function MembershipFormPage({ variant }) {
  const { language } = useSite();
  const page = pages[variant][language];

  const fields =
    variant === "registerToVote"
      ? [
          language === "bn" ? "সদস্য আইডি" : "Member ID",
          language === "bn" ? "ইমেইল" : "Email",
          language === "bn" ? "মোবাইল" : "Mobile",
        ]
      : [
          language === "bn" ? "পূর্ণ নাম" : "Full name",
          language === "bn" ? "ইমেইল" : "Email",
          language === "bn" ? "মোবাইল" : "Phone",
          language === "bn" ? "ঠিকানা (আয়ারল্যান্ড)" : "Address in Ireland",
        ];

  return (
    <PageShell>
      <InnerPageHero title={page.title} intro={page.intro} />
      <section className="px-4 pb-16 sm:px-6">
        {page.list && (
          <ul className="mx-auto mb-8 max-w-2xl space-y-2 text-sm font-semibold text-[#5b6461] dark:text-white/70">
            {page.list.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-[#009b5a]">✓</span> {item}
              </li>
            ))}
          </ul>
        )}
        {(variant === "membership" || variant === "registerToVote") && (
        <form
          className="mx-auto grid max-w-lg gap-3 rounded-[1.5rem] border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-[#101615]"
          onSubmit={(e) => e.preventDefault()}
        >
          {fields.map((placeholder) => (
            <input
              key={placeholder}
              className="h-12 rounded-2xl border border-black/10 px-4 text-sm font-semibold outline-none focus:border-[#0757ff] dark:border-white/15"
              placeholder={placeholder}
              required
            />
          ))}
          <button
            type="submit"
            className="h-12 rounded-full bg-[#009b5a] text-sm font-black text-white hover:bg-[#00844e]"
          >
            {language === "bn" ? "জমা দিন" : "Submit"}
          </button>
        </form>
        )}
      </section>
    </PageShell>
  );
}
