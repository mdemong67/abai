"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiFilter,
  FiGrid,
  FiImage,
  FiMapPin,
  FiPlay,
  FiSearch,
  FiX,
  FiLayers,
} from "react-icons/fi";
import PageShell from "@/components/layout/PageShell";
import { useSite } from "@/components/providers/SiteProvider";
import {
  portfolioMeta,
  categories,
  categoryKeys,
  portfolioAlbums,
  portfolioYears,
  categoryAccent,
} from "@/lib/portfolio-data";

function AlbumModal({ album, meta, lang, onClose }) {
  const [slide, setSlide] = useState(0);
  const slides = Math.min(5, Math.max(3, Math.ceil(album.photoCount / 5)));
  const accent = categoryAccent[album.category];
  const title = album.title[lang];
  const description = album.description[lang];

  const go = useCallback(
    (dir) => setSlide((s) => (s + dir + slides) % slides),
    [slides],
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, go]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/80 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: "spring", damping: 28, stiffness: 320 }}
        className="relative max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-t-[1.75rem] bg-white dark:bg-[#0e1110] sm:rounded-[1.75rem]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/70"
          aria-label={meta.close}
        >
          <FiX />
        </button>

        <div className="relative aspect-[16/10] bg-[#111] sm:aspect-[16/9]">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0"
            >
              <Image
                src="/images/hero-banner.jpg"
                alt=""
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover"
                style={{ objectPosition: `${20 + slide * 15}% center` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            onClick={() => go(-1)}
            className="absolute left-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white/35"
            aria-label={meta.prev}
          >
            <FiChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="absolute right-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white/35"
            aria-label={meta.next}
          >
            <FiChevronRight className="h-6 w-6" />
          </button>

          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <span
                className={`inline-block rounded-full px-3 py-1 text-xs font-black text-white ${accent.bg}`}
              >
                {categories[lang][album.category]}
              </span>
              <p className="mt-2 text-xs font-bold text-white/80">
                {album.year} · {album.location[lang]}
              </p>
            </div>
            <p className="rounded-full bg-black/40 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
              {slide + 1} / {slides}
            </p>
          </div>
        </div>

        <div className="max-h-[40vh] overflow-y-auto p-5 sm:p-7">
          <h2 className="text-2xl font-black text-[#191d1c] dark:text-white sm:text-3xl">
            {title}
          </h2>
          <p className="mt-3 text-sm font-medium leading-7 text-[#5b6461] dark:text-white/70 sm:text-base">
            {description}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm font-bold text-[#65716d] dark:text-white/60">
            <span className="inline-flex items-center gap-1.5">
              <FiImage className="text-[#4b0102]" />
              {album.photoCount} {meta.photosLabel}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FiCalendar className="text-[#4b0102]" />
              {album.year}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FiMapPin className="text-[#4b0102]" />
              {album.location[lang]}
            </span>
          </div>
          <div className="mt-4 flex gap-1.5">
            {Array.from({ length: slides }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSlide(i)}
                className={`h-1.5 flex-1 rounded-full transition-all ${
                  i === slide ? "bg-[#4b0102]" : "bg-black/15 dark:bg-white/20"
                }`}
                aria-label={`Image ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function PortfolioPage() {
  const { language } = useSite();
  const lang = language;
  const meta = portfolioMeta[lang];
  const cats = categories[lang];

  const [category, setCategory] = useState("all");
  const [year, setYear] = useState("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [mobileFilters, setMobileFilters] = useState(false);

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
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#071c17] px-4 py-14 text-white sm:px-6 sm:py-20">
        <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-[#4b0102]/25 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-[#009b5a]/20 blur-3xl" />
        <div className="relative mx-auto mycontainer">
          <p className="text-sm font-black uppercase tracking-wider text-[#62e69f]">ABAI</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            {meta.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-white/75">
            {meta.intro}
          </p>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {meta.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/12 bg-white/8 p-4 backdrop-blur-md"
              >
                <p className="text-2xl font-black text-[#7eb8ff] sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs font-bold text-white/65">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main gallery workspace */}
      <section className="px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto mycontainer">
          <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
            {/* Sidebar filters — desktop */}
            <aside className="hidden w-56 shrink-0 lg:block">
              <p className="text-xs font-black uppercase text-[#4b0102]">{meta.categoriesHeading}</p>
              <ul className="mt-3 space-y-1">
                {categoryKeys.map((key) => (
                  <li key={key}>
                    <button
                      type="button"
                      onClick={() => setCategory(key)}
                      className={`w-full rounded-xl px-3 py-2.5 text-left text-sm font-bold transition-colors ${
                        category === key
                          ? "bg-[#4b0102] text-white"
                          : "text-[#424a48] hover:bg-[#eef5f1] dark:text-white/75 dark:hover:bg-white/10"
                      }`}
                    >
                      {cats[key]}
                    </button>
                  </li>
                ))}
              </ul>

              <p className="mt-8 text-xs font-black uppercase text-[#4b0102]">{meta.yearsHeading}</p>
              <ul className="mt-3 max-h-48 space-y-1 overflow-y-auto">
                <li>
                  <button
                    type="button"
                    onClick={() => setYear("all")}
                    className={`w-full rounded-xl px-3 py-2 text-left text-sm font-bold ${
                      year === "all"
                        ? "bg-[#009b5a] text-white"
                        : "text-[#424a48] hover:bg-[#eef5f1] dark:text-white/75 dark:hover:bg-white/10"
                    }`}
                  >
                    {meta.filterAll}
                  </button>
                </li>
                {portfolioYears.map((y) => (
                  <li key={y}>
                    <button
                      type="button"
                      onClick={() => setYear(String(y))}
                      className={`w-full rounded-xl px-3 py-2 text-left text-sm font-bold ${
                        year === String(y)
                          ? "bg-[#009b5a] text-white"
                          : "text-[#424a48] hover:bg-[#eef5f1] dark:text-white/75 dark:hover:bg-white/10"
                      }`}
                    >
                      {y}
                    </button>
                  </li>
                ))}
              </ul>
            </aside>

            <div className="min-w-0 flex-1">
              {/* Toolbar */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative flex-1">
                  <FiSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4b0102]" />
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={meta.searchPlaceholder}
                    className="h-12 w-full rounded-2xl border border-black/10 bg-white pl-11 pr-4 text-sm font-semibold outline-none focus:border-[#4b0102] focus:ring-2 focus:ring-[#4b0102]/20 dark:border-white/10 dark:bg-[#101615] dark:text-white"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setMobileFilters(!mobileFilters)}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-black/10 bg-white px-4 text-sm font-black text-[#4b0102] lg:hidden dark:border-white/10 dark:bg-[#101615]"
                >
                  <FiFilter />
                  {cats[category]} {year !== "all" ? `· ${year}` : ""}
                </button>
                <p className="text-sm font-bold text-[#65716d] dark:text-white/60">
                  <FiLayers className="mr-1 inline" />
                  {filtered.length} {meta.photoGallery.toLowerCase()}
                </p>
              </div>

              {/* Mobile filters panel */}
              <AnimatePresence>
                {mobileFilters && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-3 overflow-hidden rounded-2xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-[#101615] lg:hidden"
                  >
                    <p className="text-xs font-black uppercase text-[#4b0102]">{meta.categoriesHeading}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {categoryKeys.map((key) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setCategory(key)}
                          className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                            category === key
                              ? "bg-[#4b0102] text-white"
                              : "bg-[#f1f6ff] text-[#4b0102] dark:bg-white/10"
                          }`}
                        >
                          {cats[key]}
                        </button>
                      ))}
                    </div>
                    <p className="mt-4 text-xs font-black uppercase text-[#009b5a]">{meta.yearsHeading}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setYear("all")}
                        className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                          year === "all" ? "bg-[#009b5a] text-white" : "bg-[#e9f7f0] text-[#113927]"
                        }`}
                      >
                        {meta.filterAll}
                      </button>
                      {portfolioYears.map((y) => (
                        <button
                          key={y}
                          type="button"
                          onClick={() => setYear(String(y))}
                          className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                            year === String(y)
                              ? "bg-[#009b5a] text-white"
                              : "bg-[#e9f7f0] text-[#113927] dark:bg-white/10 dark:text-white"
                          }`}
                        >
                          {y}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Empty state */}
              {filtered.length === 0 && (
                <div className="mt-12 rounded-[1.5rem] border border-dashed border-black/15 bg-[#fbfaf7] p-12 text-center dark:border-white/15 dark:bg-white/5">
                  <FiGrid className="mx-auto h-10 w-10 text-[#4b0102]/50" />
                  <p className="mt-4 font-bold text-[#65716d] dark:text-white/60">{meta.empty}</p>
                </div>
              )}

              {/* Featured row */}
              {featured.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-sm font-black uppercase text-[#009b5a]">Featured</h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {featured.map((album, i) => (
                      <AlbumCard
                        key={album.id}
                        album={album}
                        lang={lang}
                        cats={cats}
                        meta={meta}
                        large
                        index={i}
                        onOpen={() => setSelected(album)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Masonry-style grid */}
              {rest.length > 0 && (
                <div className={`grid gap-4 sm:grid-cols-2 ${featured.length > 0 ? "mt-8" : "mt-8"} xl:grid-cols-3`}>
                  <AnimatePresence mode="popLayout">
                    {rest.map((album, i) => (
                      <AlbumCard
                        key={album.id}
                        album={album}
                        lang={lang}
                        cats={cats}
                        meta={meta}
                        index={i + featured.length}
                        onOpen={() => setSelected(album)}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Video gallery */}
      <section className="border-t border-black/10 bg-white px-4 py-14 dark:border-white/10 dark:bg-[#111615] sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-black uppercase text-[#4b0102]">{meta.videoGallery}</p>
            <h2 className="mt-3 text-3xl font-black text-[#191d1c] dark:text-white sm:text-4xl">
              {meta.videoTitle}
            </h2>
            <p className="mt-4 text-lg font-medium leading-8 text-[#5b6461] dark:text-white/70">
              {meta.videoText}
            </p>
          </div>
          <div className="relative overflow-hidden rounded-[1.75rem] bg-[#071c17] p-8 text-white">
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-black/40">
              <Image
                src="/images/hero-banner.jpg"
                alt=""
                fill
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-[#4b0102] text-white shadow-2xl ring-4 ring-white/20">
                  <FiPlay className="ml-1 h-7 w-7" />
                </span>
              </div>
            </div>
            <p className="mt-5 text-center text-sm font-black text-white/80">{meta.videoCta}</p>
          </div>
        </div>
      </section>

      {/* Archive note */}
      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-6xl rounded-[1.5rem] bg-[#f1f6ff] p-6 dark:bg-white/5 sm:p-8">
          <p className="text-center text-sm font-medium leading-7 text-[#424a48] dark:text-white/70">
            {meta.archiveNote}
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              href="/events/past"
              className="rounded-full bg-[#4b0102] px-5 py-2.5 text-sm font-black text-white hover:bg-[#3a0101]"
            >
              {lang === "bn" ? "অতীত ইভেন্ট" : "Past events"}
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-[#4b0102] px-5 py-2.5 text-sm font-black text-[#4b0102] hover:bg-[#eef5f1] dark:hover:bg-white/10"
            >
              {lang === "bn" ? "যোগাযোগ" : "Contact us"}
            </Link>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <AlbumModal
            album={selected}
            meta={meta}
            lang={lang}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </PageShell>
  );
}

function AlbumCard({ album, lang, cats, meta, onOpen, large = false, index }) {
  const accent = categoryAccent[album.category];
  const title = album.title[lang];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ delay: index * 0.03, duration: 0.35 }}
      className={`group cursor-pointer overflow-hidden rounded-[1.5rem] border border-black/10 bg-white shadow-sm transition-shadow hover:shadow-xl dark:border-white/10 dark:bg-white/5 ${
        large ? "sm:min-h-[320px]" : ""
      }`}
      onClick={onOpen}
      onKeyDown={(e) => e.key === "Enter" && onOpen()}
      role="button"
      tabIndex={0}
    >
      <div className={`relative overflow-hidden ${large ? "h-64 sm:h-72" : "h-48"}`}>
        <Image
          src="/images/hero-banner.jpg"
          alt=""
          fill
          sizes={large ? "(max-width: 640px) 100vw, 50vw" : "(max-width: 1280px) 33vw, 25vw"}
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          style={{ objectPosition: `${(index * 17) % 80 + 10}% center` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[0.65rem] font-black text-white ${accent.bg}`}
        >
          {cats[album.category]}
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-black/40 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-sm">
          {album.year}
        </span>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className={`font-black text-white ${large ? "text-xl sm:text-2xl" : "text-lg"}`}>
            {title}
          </h3>
          <p className="mt-1 flex items-center gap-1 text-xs font-bold text-white/75">
            <FiMapPin className="shrink-0" />
            {album.location[lang]}
          </p>
        </div>
      </div>
      <div className="p-4">
        <p className="line-clamp-2 text-sm font-medium leading-6 text-[#65716d] dark:text-white/65">
          {album.description[lang]}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs font-bold text-[#65716d] dark:text-white/50">
            <FiImage className="mr-1 inline text-[#4b0102]" />
            {album.photoCount} {meta.photosLabel}
          </span>
          <span className="text-xs font-black text-[#4b0102] group-hover:underline">
            {meta.viewAlbum} →
          </span>
        </div>
      </div>
    </motion.article>
  );
}
