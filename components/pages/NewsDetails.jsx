"use client";

import Image from "next/image";
import Link from "next/link";
import { FiCalendar, FiMapPin, FiArrowLeft, FiClock, FiUser } from "react-icons/fi";
import PageShell from "@/components/layout/PageShell";
import { useSite } from "@/components/providers/SiteProvider";
import {
  newsMeta,
  newsCategories,
  newsItems,
  newsCategoryAccent,
} from "@/lib/news-data";

export default function NewsDetails({ id }) {
  const { language } = useSite();
  const lang = language;
  const meta = newsMeta[lang];
  const cats = newsCategories[lang];

  const item = newsItems.find((e) => e.id === id);

  if (!item) {
    return (
      <PageShell>
        <section className="px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto mycontainer text-center">
            <h1 className="text-2xl font-black">News not found</h1>
            <Link
              href="/news"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#4b0102] px-6 py-3 text-sm font-black text-white"
            >
              <FiArrowLeft />
              Back to News
            </Link>
          </div>
        </section>
      </PageShell>
    );
  }

  const title = item.title[lang];
  const description = item.description[lang];
  const date = item.date[lang];
  const location = item.location[lang];
  const content = item.content[lang];
  const accent = newsCategoryAccent[item.category];

  // Simple markdown parser (just handle headings, lists for now)
  const renderContent = (text) => {
    return text.split("\n").map((line, i) => {
      // Heading
      if (line.startsWith("## ")) {
        return <h2 key={i} className="text-2xl font-black text-[#191d1c] dark:text-white mt-8 mb-4">{line.replace("## ", "")}</h2>;
      } else if (line.startsWith("### ")) {
        return <h3 key={i} className="text-xl font-bold text-[#191d1c] dark:text-white mt-6 mb-3">{line.replace("### ", "")}</h3>;
      } else if (line.trim().startsWith("- ")) {
        return <li key={i} className="ml-6 mb-2 text-[#424a48] dark:text-white/80">{line.replace("- ", "")}</li>;
      } else if (line.trim().length > 0) {
        return <p key={i} className="mb-4 leading-relaxed text-[#424a48] dark:text-white/80">{line}</p>;
      }
      return null;
    });
  };

  return (
    <PageShell>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#071c17] px-4 py-14 text-white sm:px-6 sm:py-20">
        <div className="relative mx-auto mycontainer">
          <Link href="/news" className="inline-flex items-center gap-2 text-sm font-bold text-white/70 hover:text-white transition-colors">
            <FiArrowLeft />
            Back to News
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-black text-white ${accent.bg}`}
            >
              {cats[item.category]}
            </span>
            <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-white/75">
              <span className="flex items-center gap-1">
                <FiCalendar className="h-4 w-4" />
                {date}
              </span>
              <span className="flex items-center gap-1">
                <FiMapPin className="h-4 w-4" />
                {location}
              </span>
              <span className="flex items-center gap-1">
                <FiClock className="h-4 w-4" />
                {item.readTime} min read
              </span>
              <span className="flex items-center gap-1">
                <FiUser className="h-4 w-4" />
                {item.author}
              </span>
            </div>
          </div>

          <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-white/75">
            {description}
          </p>
        </div>

        {/* Featured image */}
        <div className="mt-10 -mx-4 sm:mx-0 sm:mt-14">
          <div className="relative mx-auto mycontainer aspect-video overflow-hidden rounded-sm sm:rounded-lg">
            <Image
              src={item.image || "/images/hero-banner.jpg"}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {renderContent(content)}
          </div>

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="mt-8 border-t border-gray-200 dark:border-white/10 pt-6">
              <p className="text-sm font-black uppercase text-[#4b0102]">Tags</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-[#f1f6ff] px-3 py-1.5 text-xs font-bold text-[#4b0102] dark:bg-white/10 dark:text-white/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Back link */}
          <div className="mt-14 flex justify-center">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 rounded-full border border-[#4b0102] px-6 py-3 text-sm font-black text-[#4b0102] hover:bg-[#eef5f1] dark:hover:bg-white/10 transition-colors"
            >
              <FiArrowLeft />
              Back to News
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
