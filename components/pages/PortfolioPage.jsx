"use client";

import PageShell from "@/components/layout/PageShell";
import { useSite } from "@/components/providers/SiteProvider";
import {
  categories,
  categoryAccent,
  categoryKeys,
  portfolioAlbums,
  portfolioMeta
} from "@/lib/portfolio-data";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  FiGrid,
  FiImage,
  FiMapPin,
  FiPlay
} from "react-icons/fi";

export default function PortfolioPage() {
  const { language } = useSite();
  const lang = language;
  const meta = portfolioMeta[lang];
  const cats = categories[lang];

  const [category, setCategory] = useState("all");
  const [year, setYear] = useState("all");
  const [query, setQuery] = useState("");
  const [mobileFilters, setMobileFilters] = useState(false);
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return portfolioAlbums.filter((album) => {
      if (category !== "all" && album.category !== category) return false;
      if (year !== "all" && album.year !== Number(year)) return false;
      if (!q) return true;
      const hay = [
        album.title.en,
        album.title.bn,
        album.description.en,
        album.description.bn,
        String(album.year),
        album.location.en,
        album.location.bn,
        cats[album.category],
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [category, year, query, cats]);

  const featured = filtered.filter((a) => a.featured);
  const rest = filtered.filter((a) => !a.featured);

  return (
    <PageShell>


      {/* Main Content & Gallery */}
      <section className="bg-[#fbfbf9] dark:bg-[#070b09] px-4 py-12 sm:px-6 lg:py-16">
        <div className="mx-auto mycontainer space-y-10">

          {/* Mobile Filter Panel drawer */}
          <AnimatePresence>
            {mobileFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden rounded-3xl border border-black/5 bg-white p-5 shadow-xl dark:border-white/5 dark:bg-[#0e1411] lg:hidden"
              >
                <p className="text-xs font-black uppercase text-gray-400 dark:text-white/40">{meta.categoriesHeading}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {categoryKeys.map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setCategory(key)}
                      className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${category === key
                        ? "bg-[#4b0102] text-white dark:bg-[#62e69f] dark:text-black"
                        : "bg-gray-100 text-gray-600 dark:bg-white/[0.04] dark:text-white/70"
                        }`}
                    >
                      {cats[key]}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Gallery Body */}
          {filtered.length === 0 ? (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-dashed border-black/10 dark:border-white/10 bg-[#fbfaf7]/50 dark:bg-[#0e1411]/10 p-16 text-center shadow-inner"
            >
              <FiGrid className="mx-auto h-12 w-12 text-gray-300 dark:text-white/20 animate-bounce" />
              <h3 className="mt-4 text-lg font-bold text-gray-800 dark:text-white">{meta.empty}</h3>
            </motion.div>
          ) : (
            <div className="space-y-12">
              {/* Featured Section */}
              {featured.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-650 dark:bg-red-500 animate-ping" />
                    <h2 className="text-xs font-extrabold uppercase tracking-widest text-[#4b0102] dark:text-[#62e69f]">
                      FEATURED MEMORIES
                    </h2>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    {featured.map((album, i) => (
                      <AlbumCard
                        key={album.id}
                        album={album}
                        lang={lang}
                        cats={cats}
                        meta={meta}
                        large
                        index={i}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Standard Grid */}
              {rest.length > 0 && (
                <div className="space-y-6">
                  {featured.length > 0 && (
                    <h2 className="text-xs font-extrabold uppercase tracking-widest text-gray-400 dark:text-white/40">
                      ALL ALBUMS
                    </h2>
                  )}

                  <motion.div
                    layout
                    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                  >
                    <AnimatePresence mode="popLayout">
                      {rest.map((album, i) => (
                        <AlbumCard
                          key={album.id}
                          album={album}
                          lang={lang}
                          cats={cats}
                          meta={meta}
                          index={i + featured.length}
                        />
                      ))}
                    </AnimatePresence>
                  </motion.div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Video Gallery Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#fcfbf9] dark:from-[#070b09] dark:to-[#040605] border-t border-black/5 dark:border-white/5 px-4 py-20 sm:px-6">
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

        <div className="mx-auto max-w-6xl mycontainer">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">

            {/* Video Left Text */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#4b0102]/20 bg-[#4b0102]/5 px-3 py-1 text-xs font-bold text-[#4b0102] dark:border-emerald-500/25 dark:bg-emerald-500/5 dark:text-[#62e69f]">
                {meta.videoGallery.toUpperCase()}
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                {meta.videoTitle}
              </h2>
              <p className="text-md font-normal leading-relaxed text-gray-600 dark:text-white/60">
                {meta.videoText}
              </p>
            </div>

            {/* Video Right Visual Card */}
            <div className="lg:col-span-7">
              <div className="group relative overflow-hidden rounded-3xl bg-black shadow-2xl transition-all duration-500 border border-black/5 dark:border-white/5">
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src="/images/hero-banner.jpg"
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                  {/* Pulsing Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white dark:bg-[#62e69f] text-black shadow-2xl transition-all duration-300 group-hover:scale-110">
                      <span className="absolute inset-0 rounded-full bg-white dark:bg-[#62e69f] animate-ping opacity-25" />
                      <FiPlay className="ml-1.5 h-8 w-8 text-black" />
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 right-6 text-center text-sm font-bold text-white/95 backdrop-blur-md bg-black/40 py-2.5 px-4 rounded-2xl border border-white/5">
                  {meta.videoCta}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Archive notes / Quick footer */}
      <section className="px-4 py-16 sm:px-6 bg-[#fbfbf9] dark:bg-[#040605]">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white dark:bg-[#0e1411]/40 border border-black/5 dark:border-white/5 p-8 sm:p-12 text-center shadow-xl">
          <p className="text-sm font-medium leading-relaxed text-gray-600 dark:text-white/60 max-w-2xl mx-auto">
            {meta.archiveNote}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/events/past"
              className="inline-flex items-center justify-center rounded-full bg-[#4b0102] hover:bg-[#6c151c] px-7 py-3.5 text-sm font-black text-white transition-all hover:scale-105 shadow-lg"
            >
              {lang === "bn" ? "অতীত ইভেন্ট" : "Past events"}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-black/10 dark:border-white/10 hover:border-[#4b0102] bg-white dark:bg-transparent px-7 py-3.5 text-sm font-black text-gray-800 dark:text-white hover:text-[#4b0102] dark:hover:text-[#62e69f] transition-all hover:scale-105"
            >
              {lang === "bn" ? "যোগাযোগ" : "Contact us"}
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function AlbumCard({ album, lang, cats, meta, large = false, index }) {
  const accent = categoryAccent[album.category];
  const title = album.title[lang];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      className={`group overflow-hidden rounded-3xl border border-black/5 dark:border-white/5 bg-white dark:bg-[#0e1411]/60 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between ${large ? "md:min-h-[360px]" : ""
        }`}
    >
      <Link href={`/portfolio/${album.id}`} className="flex flex-col h-full justify-between">

        {/* Cover Image & Badges */}
        <div className="relative overflow-hidden w-full aspect-[16/10] bg-gray-100 dark:bg-white/[0.02]">
          <Image
            src={album.image || "/images/hero-banner.jpg"}
            alt=""
            fill
            sizes={large ? "(max-width: 640px) 100vw, 50vw" : "(max-width: 1280px) 33vw, 25vw"}
            className="object-cover transition-transform duration-[1000ms] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

          {/* Top Badges */}
          <div className="absolute left-4 top-4 right-4 flex items-center justify-between pointer-events-none">
            <span
              className={`rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white backdrop-blur-md bg-opacity-80 shadow-md ${accent.bg}`}
            >
              {cats[album.category]}
            </span>
            <span className="rounded-full bg-black/50 px-3 py-1 text-xs font-bold text-white backdrop-blur-md border border-white/10 shadow-md">
              {album.year}
            </span>
          </div>

          {/* Bottom Card Title & Location */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className={`font-serif font-black text-white leading-tight transition-colors group-hover:text-[#62e69f] ${large ? "text-xl sm:text-2xl" : "text-lg"}`}>
              {title}
            </h3>
            <p className="mt-2 flex items-center gap-1.5 text-xs font-bold text-white/75">
              <FiMapPin className="text-[#62e69f] shrink-0" />
              <span>{album.location[lang]}</span>
            </p>
          </div>
        </div>

        {/* Content details below image */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <p className="line-clamp-2 text-sm font-normal leading-relaxed text-gray-500 dark:text-white/60">
            {album.description[lang]}
          </p>

          <div className="mt-5 pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs font-bold">
            <span className="text-gray-400 dark:text-white/40 flex items-center gap-1.5">
              <FiImage className="text-[#4b0102] dark:text-[#62e69f]" />
              {album.photoCount} {meta.photosLabel}
            </span>
            <span className="text-[#4b0102] dark:text-[#62e69f] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform duration-300">
              {meta.viewAlbum} →
            </span>
          </div>
        </div>

      </Link>
    </motion.article>
  );
}
