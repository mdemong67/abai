"use client";

import Image from "next/image";
import Link from "next/link";
import { FiCalendar, FiMapPin, FiArrowLeft } from "react-icons/fi";
import PageShell from "@/components/layout/PageShell";
import { useSite } from "@/components/providers/SiteProvider";
import {
  eventMeta,
  eventCategories,
  events,
  eventCategoryAccent,
} from "@/lib/event-data";

export default function EventDetails({ id }) {
  const { language } = useSite();
  const lang = language;
  const meta = eventMeta[lang];
  const cats = eventCategories[lang];

  const event = events.find(e => e.id === id);

  if (!event) {
    return (
      <PageShell>
        <section className="px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto mycontainer text-center">
            <h1 className="text-2xl font-black">Event not found</h1>
            <Link
              href="/events/past"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#4b0102] px-6 py-3 text-sm font-black text-white"
            >
              <FiArrowLeft />
              Back to Events
            </Link>
          </div>
        </section>
      </PageShell>
    );
  }

  const title = event.title[lang];
  const description = event.description[lang];
  const date = event.date[lang];
  const location = event.location[lang];
  const accent = eventCategoryAccent[event.category];

  return (
    <PageShell>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#071c17] px-4 py-14 text-white sm:px-6 sm:py-20">
        <div className="relative mx-auto mycontainer">
          <Link href="/events/past" className="inline-flex items-center gap-2 text-sm font-bold text-white/70 hover:text-white transition-colors">
            <FiArrowLeft />
            Back to Events
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-black text-white ${accent.bg}`}
            >
              {cats[event.category]}
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
              <span>{event.year}</span>
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
              src={event.image || "/images/hero-banner.jpg"}
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
            <p className="mb-4 leading-relaxed text-[#424a48] dark:text-white/80">
              {description}
            </p>
          </div>

          {/* Back link */}
          <div className="mt-14 flex justify-center">
            <Link
              href="/events/past"
              className="inline-flex items-center gap-2 rounded-full border border-[#4b0102] px-6 py-3 text-sm font-black text-[#4b0102] hover:bg-[#eef5f1] dark:hover:bg-white/10 transition-colors"
            >
              <FiArrowLeft />
              Back to Events
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
