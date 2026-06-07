"use client";

import Image from "next/image";
import Link from "next/link";
import { FiCalendar, FiMapPin, FiClock, FiArrowLeft } from "react-icons/fi";
import PageShell from "@/components/layout/PageShell";
import { useSite } from "@/components/providers/SiteProvider";
import {
  blogMeta,
  blogCategories,
  blogPosts,
  blogCategoryAccent,
} from "@/lib/blog-data";

export default function BlogDetails({ id }) {
  const { language } = useSite();
  const lang = language;
  const meta = blogMeta[lang];
  const cats = blogCategories[lang];

  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return (
      <PageShell>
        <section className="px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto mycontainer text-center">
            <h1 className="text-2xl font-black">Blog post not found</h1>
            <Link
              href="/blog"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#4b0102] px-6 py-3 text-sm font-black text-white"
            >
              <FiArrowLeft />
              Back to Blog
            </Link>
          </div>
        </section>
      </PageShell>
    );
  }

  const title = post.title[lang];
  const description = post.description[lang];
  const date = post.date[lang];
  const location = post.location[lang];
  const content = post.content[lang];
  const accent = blogCategoryAccent[post.category];

  return (
    <PageShell>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#071c17] px-4 py-14 text-white sm:px-6 sm:py-20">
        <div className="relative mx-auto mycontainer">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-white/70 hover:text-white transition-colors">
            <FiArrowLeft />
            Back to Blog
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-black text-white ${accent.bg}`}
            >
              {cats[post.category]}
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
                {post.readTime} {meta.photosLabel}
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
              src={post.image || "/images/hero-banner.jpg"}
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
            {content.split("\n\n").map((paragraph, i) => (
              <p key={i} className="mb-4 leading-relaxed text-[#424a48] dark:text-white/80">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Back link */}
          <div className="mt-14 flex justify-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-[#4b0102] px-6 py-3 text-sm font-black text-[#4b0102] hover:bg-[#eef5f1] dark:hover:bg-white/10 transition-colors"
            >
              <FiArrowLeft />
              Back to Blog
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
