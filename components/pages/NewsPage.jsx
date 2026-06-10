"use client";

import PageShell from "@/components/layout/PageShell";
import { useSite } from "@/components/providers/SiteProvider";
import {
  newsCategories,
  newsCategoryKeys,
  newsItems,
  newsMeta
} from "@/lib/news-data";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FiClock, FiLayers, FiArrowRight } from "react-icons/fi";

export default function NewsPage() {
  const { language } = useSite();
  const lang = language;
  const meta = newsMeta[lang];
  const cats = newsCategories[lang];

  const [category, setCategory] = useState("all");
  const [year, setYear] = useState("all");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    setVisibleCount(4);
  }, [category, year, query]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return newsItems.filter((item) => {
      if (category !== "all" && item.category !== category) return false;
      if (year !== "all" && item.year !== Number(year)) return false;
      if (!q) return true;
      const hay = [
        item.title.en,
        item.title.bn,
        item.description.en,
        item.description.bn,
        String(item.year),
        item.location.en,
        item.location.bn,
        cats[item.category],
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [category, year, query, cats]);

  // Distribution for classic 3-column newspaper grid & bottom 4-column grid:
  // First section (3-column newspaper grid) gets max first 6 items:
  // - Column 1 (Left - Main): filtered[0]
  // - Column 2 (Middle - List): filtered.slice(1, 4)
  // - Column 3 (Right - Cards): filtered.slice(4, 6)
  // Second section (4-column bottom grid) gets everything else from index 6 onwards.
  const { mainArticle, listArticles, cardArticles, bottomGridArticles } = useMemo(() => {
    if (filtered.length <= 6) {
      if (filtered.length === 0) {
        return { mainArticle: null, listArticles: [], cardArticles: [], bottomGridArticles: [] };
      }
      if (filtered.length === 1) {
        return { mainArticle: filtered[0], listArticles: [], cardArticles: [], bottomGridArticles: [] };
      }
      if (filtered.length === 2) {
        return { mainArticle: filtered[0], listArticles: [filtered[1]], cardArticles: [], bottomGridArticles: [] };
      }
      if (filtered.length === 3) {
        return { mainArticle: filtered[0], listArticles: [filtered[1]], cardArticles: [filtered[2]], bottomGridArticles: [] };
      }
      if (filtered.length === 4) {
        return { mainArticle: filtered[0], listArticles: [filtered[1]], cardArticles: [filtered[2], filtered[3]], bottomGridArticles: [] };
      }

      const lastTwo = filtered.slice(filtered.length - 2);
      const middlePart = filtered.slice(1, filtered.length - 2);
      return {
        mainArticle: filtered[0],
        listArticles: middlePart,
        cardArticles: lastTwo,
        bottomGridArticles: [],
      };
    } else {
      return {
        mainArticle: filtered[0],
        listArticles: filtered.slice(1, 4),
        cardArticles: filtered.slice(4, 6),
        bottomGridArticles: filtered.slice(6),
      };
    }
  }, [filtered]);

  const currentDateString = new Date().toLocaleDateString(lang === "bn" ? "bn-BD" : "en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <PageShell>
      <div className="bg-[#fbfbf9] dark:bg-[#090e0c] min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <div className="mx-auto mycontainer px-4 py-8 max-w-7xl">

          {/* Sub-header menu (Categories) */}
          <div className="border-t border-b border-gray-200 dark:border-gray-800 py-3.5 mb-8">
            <div className="flex items-center justify-start overflow-x-auto scrollbar-none">
              <div className="flex space-x-6 sm:space-x-10 text-[11px] sm:text-xs font-black tracking-widest uppercase whitespace-nowrap px-4">
                {newsCategoryKeys.map((key) => (
                  <button
                    key={key}
                    onClick={() => setCategory(key)}
                    className={`hover:text-[#4b0102] dark:hover:text-[#e46c76] transition-colors cursor-pointer ${category === key
                      ? "text-[#4b0102] dark:text-[#f3b5ba] underline underline-offset-8 decoration-2"
                      : "text-gray-500 dark:text-gray-450"
                      }`}
                  >
                    {cats[key]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Newspaper Grid */}
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20 border-t border-dashed border-gray-300 dark:border-gray-800 my-6"
              >
                <FiLayers className="mx-auto h-12 w-12 text-gray-450 dark:text-gray-500 mb-4" />
                <p className="text-lg font-black text-gray-950 dark:text-white">{meta.empty}</p>
              </motion.div>
            ) : (
              <motion.div
                key={category + year + query}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="space-y-16"
              >
                {/* Classic Newspaper 3-Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {/* Column 1 (Left - Main Story) - Spans 2 columns on large screens */}
                  {mainArticle && (
                    <div className="md:col-span-2 space-y-5 border-b border-gray-200 dark:border-gray-800 pb-8 lg:border-b-0 lg:pb-0">
                      <Link href={`/news/${mainArticle.id}`} className="group block space-y-4">
                        <div className="relative aspect-[16/10] w-full overflow-hidden border border-gray-200 dark:border-gray-800 rounded-sm">
                          <Image
                            src={mainArticle.image || "/images/hero-banner.jpg"}
                            alt=""
                            fill
                            priority
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover transition-all duration-700 group-hover:scale-[1.02]"
                          />
                        </div>
                        <div className="space-y-3">
                          <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-red-650 dark:text-red-400">
                            <span className="h-2 w-2 rounded-full bg-red-650 dark:bg-red-400 animate-pulse"></span>
                            {lang === "bn" ? "সরাসরি আপডেট" : "Live Updates"}
                          </span>
                          <h2 className="font-serif text-2xl sm:text-3.5xl font-black text-gray-950 dark:text-white leading-tight group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors">
                            {mainArticle.title[lang]}
                          </h2>
                          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed font-sans">
                            {mainArticle.description[lang]}
                          </p>
                          <div className="flex items-center gap-2 pt-2 text-xs font-semibold text-gray-500 dark:text-gray-455 border-t border-gray-100 dark:border-gray-900 w-fit">
                            <span>By {mainArticle.author || "ABAI Editor"}</span>
                            <span>•</span>
                            <span>{mainArticle.date[lang]}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <FiClock /> {mainArticle.readTime} {meta.photosLabel}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )}

                  {/* Column 2 (Middle - List) - Spans 1 column */}
                  {listArticles.length > 0 && (
                    <div className="md:col-span-1 space-y-6 lg:border-l lg:border-r lg:border-gray-250 lg:dark:border-gray-800 lg:px-6 border-b border-gray-200 dark:border-gray-800 pb-8 lg:border-b-0 lg:pb-0">
                      {listArticles.map((article, idx) => {
                        const isFirst = idx === 0;
                        const title = article.title[lang];
                        const categoryLabel = cats[article.category] || "News";

                        if (isFirst) {
                          return (
                            <div key={article.id} className="border-b border-gray-200 dark:border-gray-800 pb-6">
                              <Link href={`/news/${article.id}`} className="group flex gap-4 items-start">
                                <div className="flex-1 space-y-2">
                                  <span className="inline-flex items-center gap-1.5 text-[9px] sm:text-[10px] font-black tracking-widest uppercase text-red-650 dark:text-red-455">
                                    <span className="h-1.5 w-1.5 rounded-full bg-red-650 dark:bg-red-455"></span>
                                    {categoryLabel}
                                  </span>
                                  <h3 className="font-serif text-sm sm:text-base font-bold text-gray-950 dark:text-white leading-snug group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors">
                                    {title}
                                  </h3>
                                </div>
                                <div className="relative w-20 h-20 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-855 shrink-0 rounded-sm overflow-hidden">
                                  <Image
                                    src={article.image || "/images/hero-banner.jpg"}
                                    alt=""
                                    fill
                                    sizes="80px"
                                    className="object-cover"
                                  />
                                </div>
                              </Link>
                            </div>
                          );
                        }

                        return (
                          <div key={article.id} className="border-b border-gray-200 dark:border-gray-800 last:border-0 pb-6 last:pb-0">
                            <Link href={`/news/${article.id}`} className="group block space-y-2">
                              <span className="inline-flex items-center gap-1.5 text-[9px] sm:text-[10px] font-black tracking-widest uppercase text-[#4b0102] dark:text-[#f3b5ba]">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#4b0102] dark:bg-[#f3b5ba]"></span>
                                {categoryLabel}
                              </span>
                              <h3 className="font-serif text-sm sm:text-base font-bold text-gray-950 dark:text-white leading-snug group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors">
                                {title}
                              </h3>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Column 3 (Right - Stacked Cards) - Spans 1 column */}
                  {cardArticles.length > 0 && (
                    <div className="md:col-span-1 space-y-6">
                      {cardArticles.map((article) => {
                        const title = article.title[lang];
                        const categoryLabel = cats[article.category] || "News";
                        return (
                          <div key={article.id} className="border-b border-gray-200 dark:border-gray-800 last:border-0 pb-6 last:pb-0">
                            <Link href={`/news/${article.id}`} className="group block space-y-3">
                              <div className="relative aspect-[16/10] w-full overflow-hidden border border-gray-200 dark:border-gray-800 rounded-sm">
                                <Image
                                  src={article.image || "/images/hero-banner.jpg"}
                                  alt=""
                                  fill
                                  sizes="(max-width: 1024px) 100vw, 25vw"
                                  className="object-cover transition-all duration-500"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-black tracking-widest uppercase text-[#4b0102] dark:text-[#f3b5ba]">
                                  {categoryLabel}
                                </span>
                                <h3 className="font-serif text-sm sm:text-base font-bold text-gray-950 dark:text-white leading-snug group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors">
                                  {title}
                                </h3>
                              </div>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Second Section: Bottom 4-Column News Grid */}
                {bottomGridArticles.length > 0 && (
                  <div className="border-t border-gray-200 dark:border-gray-800 pt-10">
                    <h3 className="font-serif text-2xl font-black uppercase tracking-wider mb-6 text-gray-950 dark:text-white border-b-2 border-gray-950 dark:border-white pb-2 w-fit">
                      {lang === "bn" ? "আরও সংবাদ" : "More News"}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {bottomGridArticles.slice(0, visibleCount).map((article) => {
                        const title = article.title[lang];
                        const categoryLabel = cats[article.category] || "News";
                        return (
                          <div key={article.id} className="group border-b border-gray-200 dark:border-gray-800 last:border-0 pb-6 sm:pb-0 sm:border-0">
                            <Link href={`/news/${article.id}`} className="block space-y-3">
                              <div className="relative aspect-[16/10] w-full overflow-hidden border border-gray-200 dark:border-gray-800 rounded-sm">
                                <Image
                                  src={article.image || "/images/hero-banner.jpg"}
                                  alt=""
                                  fill
                                  sizes="(max-width: 1024px) 100vw, 25vw"
                                  className="object-cover transition-all duration-500 group-hover:scale-[1.02]"
                                />
                              </div>
                              <div className="space-y-1.5">
                                <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-black tracking-widest uppercase text-[#4b0102] dark:text-[#f3b5ba]">
                                  {categoryLabel}
                                </span>
                                <h4 className="font-serif text-sm sm:text-base font-bold text-gray-950 dark:text-white leading-snug group-hover:text-red-700 dark:group-hover:text-red-450 transition-colors">
                                  {title}
                                </h4>
                              </div>
                            </Link>
                          </div>
                        );
                      })}
                    </div>

                    {bottomGridArticles.length > visibleCount && (
                      <div className="w-full mt-10 flex items-center justify-center">
                        <button
                          onClick={() => setVisibleCount((prev) => prev + 4)}
                          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#4b0102] text-white font-black text-lg transition-all hover:scale-105 shadow-xl cursor-pointer"
                        >
                          {lang === "bn" ? "আরও দেখুন" : "See More"} <FiArrowRight className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </PageShell>
  );
}
