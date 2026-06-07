"use client";

import PageShell from "@/components/layout/PageShell";
import InnerPageHero from "@/components/layout/InnerPageHero";
import ContentSection from "@/components/layout/ContentSection";
import { useSite } from "@/components/providers/SiteProvider";
import { pages } from "@/lib/site-content";

export default function SimpleTextPage({ contentKey }) {
  const { language } = useSite();
  const page = pages[contentKey][language];

  return (
    <PageShell>
      <InnerPageHero title={page.title} intro={page.intro} />
      <ContentSection>
        {page.body?.map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
        {page.list && (
          <ul className="space-y-2">
            {page.list.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="font-black text-[#009b5a]">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </ContentSection>
    </PageShell>
  );
}
