"use client";

import PageShell from "@/components/layout/PageShell";
import { useSite } from "@/components/providers/SiteProvider";
import { home } from "@/lib/site-content";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FiArrowRight,
  FiCalendar,
  FiCheckCircle,
  FiGlobe,
  FiHeart,
  FiLock,
  FiShield,
  FiUsers
} from "react-icons/fi";

const voting = [
  ["Member ID + email", FiUsers],
  ["One vote enforcement", FiCheckCircle],
  ["Encrypted audit log", FiLock],
  ["Timed election window", FiCalendar],
  ["Admin-only controls", FiShield],
];

const committeeMembers = [
  {
    id: 1,
    role: "President",
    rolebn: "সভাপতি",
    name: "Dr. Md Jinnuraine Jaigirdar",
    img: "/images/President.png",
  },
  {
    id: 2,
    role: "Secretary General",
    rolebn: "মহাসচিব",
    name: "Anwarul Haque Anwar",
    img: "/images/Secretary.jpeg",
  },

];

export default function HomePage() {
  const { language } = useSite();
  const t = home[language];
  const slides = t.heroSlides;

  return (
    <PageShell headerTransparent flushTop>
      <Hero slides={slides} t={t} />
      <Service t={t} />
      <About t={t} />
      <PresidentsStatement language={language} />
      {/* <Services t={t} /> */}
      <Voting t={t} />
      <Events t={t} />
      <ExecutiveCommittee language={language} />
      {/* <QuickLinks language={language} /> */}
      <Contact t={t} language={language} />
    </PageShell>
  );
}

function PresidentsStatement({ language }) {
  return (
    <section className="px-4 py-16 sm:px-6 lg:py-14 bg-gradient-to-br from-[#f2f9ff] to-white dark:from-[#071c17] dark:to-[#0a121c]">
      <div className="mx-auto mycontainer">
        <div className="text-center mb-12">
          <p className="text-md font-medium uppercase text-black/70 mb-2">
            {language === "bn" ? "সভাপতির বাণী" : "President's Statement"}
          </p>
          <h2 className="text-4xl font-semibold text-[#191d1c] dark:text-white sm:text-5xl mb-4">
            {language === "bn"
              ? "অল বাংলাদেশী এসোসিয়েশন অব আয়ারল্যান্ড (আবাই) কি এবং এই সংগঠনের কি প্রয়োজন?"
              : "What is the All Bangladeshi Association of Ireland (ABAI) and why do we need it?"}
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_2fr] items-start">
          {/* Left column - President photo */}
          <div className="lg:sticky lg:top-24">
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/images/President.png"
                alt="Dr. Md Jinnuraine Jaigirdar"
                width={500}
                height={600}
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="text-2xl font-black">Dr. Md Jinnuraine Jaigirdar</h3>
                <p className="text-lg opacity-90">{language === "bn" ? "সভাপতি" : "President"}, ABAI</p>
              </div>
            </div>
          </div>

          {/* Right column - Statement */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 lg:p-12 border border-gray-100 dark:border-gray-700">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-xl leading-9 text-[#5b6461] dark:text-white/80 mb-8">
                {language === "bn"
                  ? "ফেইসবুকে এবং অন্যান্য সূত্রে আয়ারল্যান্ড প্রবাসী বেশ কয়েকজন বাংলাদেশী আবাই কি এবং এই সংগঠনের কি প্রয়োজন এই প্রশ্ন বিভিন্নভাবে উত্থাপন করেছেন। আমার কাছে প্রথমেই মনে হয়েছে এ প্রশ্ন উত্থাপনের কারণ কি? যারা এই প্রশ্ন করেছেন তাদের কিছু অংশ আয়ারল্যান্ডে নবীন, তাই হতে পারে এই সংগঠন সম্পর্কে তাদের তেমন কোন ধারনা নেই। অন্যদিকে যারা এই দেশে দীর্ঘদিন থেকে আছেন, হতে পারে তারা জেনে বুঝেই এই প্রশ্ন করছেন। সম্ভবতঃ তারা জানতে চাচ্ছেন বিগত সময়ে এই সংগঠন কি কর্ম সম্পাদন করতে পেরেছে। তাই এই সংগঠন সম্পর্কে একটি ধারনা দেবার প্রয়াস আমি গ্রহণ করছি।"
                  : "On Facebook and other sources, many Bangladeshi expats in Ireland have raised questions about what ABAI is and why we need this organization. I first wondered why these questions were being asked. Some who asked are new to Ireland, so they may not know much about this organization. On the other hand, those who have been in this country for a long time may have asked these questions knowingly. Perhaps they want to know what this organization has been able to accomplish in the past. So I am trying to give an idea about this organization."}
              </p>

              <div className="border-l-4 border-[#4b0102] pl-6 py-2 my-8 bg-[#f2f9ff] dark:bg-[#4b0102]/10 rounded-r-2xl">
                <h3 className="text-2xl font-black text-[#191d1c] dark:text-white mb-4">
                  {language === "bn"
                    ? "অল বাংলাদেশী এসোসিয়েশন অব আয়ারল্যান্ড (আবাই) কি?"
                    : "What is the All Bangladeshi Association of Ireland (ABAI)?"}
                </h3>
                <p className="text-lg leading-8 text-[#5b6461] dark:text-white/80">
                  {language === "bn"
                    ? "২০১০ সালে আয়ারল্যান্ডের বিভিন্ন শহুরে বসবাসরত কিছু দুরদ্শি প্রবাসী বাংলাদেশী, সমগ্র আয়ারল্যান্ডে বসবাসরত প্রবাসী বাংলাদেশীদের একব্বিত করে একটি ছাতা সংগঠনের অন্তর্ভূক্ত করার প্রয়াস গ্রহণ করেন। সেই সূত্র ধরে ২০১১ সালের অক্টোবর মাসে একটি প্রত্যক্ষ জাতীয় নির্বাচনের মাধ্যমে অল বাংলাদেশি এসোসিয়েশন অব আয়ারল্যান্ডের (আবাই) এর প্রথম কার্যকরী পরিষদ গঠিত হয়।"
                    : "In 2010, some visionary Bangladeshi expats living in various cities of Ireland took the initiative to unite all Bangladeshi expats living in Ireland under one umbrella organization. Following that, in October 2011, the first executive committee of the All Bangladeshi Association of Ireland (ABAI) was formed through a direct national election."}
                </p>
              </div>

              <div className="bg-gradient-to-r from-[#4b0102] to-[#4b0102] rounded-3xl p-8 mt-10 text-white">
                <p className="italic text-xl leading-9 mb-6">
                  {language === "bn"
                    ? "আমি মনে করি এই ধরনের সংগঠন একটি স্বপ্নিল উদ্যোগ। সারা বিশ্বের কোন দেশে একটি সংগঠনের ছায়াতলে সকল প্রবাসীদের একতাবদ্ধ থাকতে পারাটা নজিরবিহীন।"
                    : "I believe this type of organization is a dream initiative. It is unprecedented for all expats to be united under one organization in any country in the world."}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <FiUsers className="w-6 h-6" />
                  </div>
                  <p className="font-black text-lg">
                    {language === "bn"
                      ? "— ডাঃ জিনুরাইন জায়গীরদার"
                      : "— Dr. Md Jinnuraine Jaigirdar"}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-10 flex items-center justify-center lg:justify-start">
              <Link
                href="/about/presidents-statement"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#4b0102] text-white font-black text-lg transition-all hover:scale-105 shadow-xl"
              >
                {language === "bn" ? "পুরো বাণী পড়ুন" : "Read full statement"} <FiArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExecutiveCommittee({ language }) {
  const president = committeeMembers[0];
  const secretaryGeneral = committeeMembers[1];
  const otherMembers = committeeMembers.slice(2);

  return (
    <section className="px-4 py-16 sm:px-6 bg-gray-50 dark:bg-gray-900 lg:py-24">
      <div className="mx-auto max-w-7xl mycontainer">
        <div className="text-center mb-12">
          <p className="text-sm font-black uppercase text-[#4b0102] mb-2">
            {language === "bn" ? "কমিউনিটি নেতৃত্ব" : "Community Leadership"}
          </p>
          <h2 className="text-4xl font-black text-[#191d1c] dark:text-white sm:text-5xl mb-4">
            {language === "bn" ? "বর্তমান কার্যনির্বাহী কমিটি" : "Current Executive Committee"}
          </h2>
        </div>


        {/* Featured Leadership (President & Secretary General) */}
        <div className="grid gap-14 lg:grid-cols-2 mb-16 max-w-3xl mx-auto ">
          {[president, secretaryGeneral].map((leader) => (
            <div key={leader.id} className="bg-white dark:bg-gray-800 overflow-hidden">
              <div className="flex flex-col items-center gap-3">
                <div className="w-full md:w-3/3 relative">
                  <div className="aspect-[3/4]">
                    <Image
                      src={leader.img}
                      alt={leader.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="p-2 w-full flex flex-col justify-center">
                  <h3 className="text-3xl text-center font-medium font-black text-[#191d1c] dark:text-white mb-4">
                    {leader.name}
                  </h3>
                  <span className="text-black dark:text-white text-center text-xl font-normal mb-3">
                    {language === "bn" ? leader.rolebn : leader.role} of ABAI
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>


        <div className="flex items-center justify-center">
          <Link
            href="/about/executive-committee"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#4b0102] text-white font-black text-lg transition-all hover:scale-105 shadow-xl"
          >
            View all members <FiArrowRight />
          </Link>
        </div>


      </div>
    </section>
  );
}

function Hero({ slides, t }) {
  const [index, setIndex] = useState(0);
  const slide = slides[index];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative isolate h-[70vh] min-h-[520px] overflow-hidden bg-black text-white sm:min-h-[560px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.65 }}
          className="absolute inset-0"
        >
          <Image
            src={slide.bg}
            alt=""
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.48)_22%,rgba(0,0,0,0.12)_50%,rgba(255,255,255,0.82)_140%)] dark:bg-[linear-gradient(180deg,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.54)_22%,rgba(0,0,0,0.18)_50%,rgba(7,10,18,0.94)_150%)]" />
          <div className="absolute inset-0 bg-black/10" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 mx-auto flex h-full mycontainer items-center justify-center px-4 pb-14 pt-24 text-center sm:px-6">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl"
        >
          <span className="inline-flex rounded-full bg-white/16 px-4 py-2 text-xs font-medium text-white ring-1 ring-white/28 backdrop-blur-md sm:text-sm">
            {slide.eyebrow}
          </span>
          <h1 className="mx-auto mt-5 max-w-4xl text-3xl font-medium leading-[1.02] sm:text-5xl">
            {slide.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-md font-normal leading-6 text-white/90 sm:text-lg sm:leading-8">
            {slide.text}
          </p>
          <div className="mt-7 flex flex-col justify-center items-center gap-3 sm:flex-row">
            <Link
              href="/services/register-to-vote"
              className="w-fit inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#4b0102] text-white font-black text-lg transition-all hover:scale-105 shadow-xl"
            >
              {t.heroPrimary}
              <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((item, slideIndex) => (
          <button
            type="button"
            key={item.title}
            onClick={() => setIndex(slideIndex)}
            className={`h-2.5 rounded-full transition-all ${index === slideIndex ? "w-8 bg-white" : "w-2.5 bg-white/45"
              }`}
            aria-label={`Go to slide ${slideIndex + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

function About({ t }) {
  return (
    <section id="about" className="px-4 py-16 sm:px-6 lg:py-13">
      <div className="mx-auto grid mycontainer gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <Image className="rounded-lg" src='/images/banner-2.jpg' alt='about-image' width={1000} height={1000} />
        </div>
        <div>
          <h2 className="text-3xl mb-6 font-semibold leading-8 text-[#5b6461] dark:text-white/70">
            {t.aboutTitle}
          </h2>
          <p className="text-lg pb-5 font-medium leading-8 text-[#5b6461] dark:text-white/70">
            {t.aboutText}
          </p>
          <p className="text-lg font-medium leading-8 text-[#5b6461] dark:text-white/70">
            {t.aboutText}
          </p>

          <div className="flex items-center justify-start mt-8">
            <Link
              href="/about/executive-committee"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#4b0102] text-white font-black text-lg transition-all hover:scale-105 shadow-xl"
            >
              Lern More <FiArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Service({ t }) {
  const icons = [FiUsers, FiGlobe, FiHeart, FiShield];

  return (
    <section id="services" className="bg-white px-4 py-8 dark:bg-[#111615] sm:px-6 lg:py-10">
      <div className="mx-auto mycontainer">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.services.map(([title, text], index) => {
            const Icon = icons[index];
            return (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.05 }}
                className="rounded-lg border border-black/10 bg-[#fbfaf7] p-5 dark:border-white/10 dark:bg-white/5"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#4b0102] text-xl text-white">
                  <Icon aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-2xl font-medium text-[#181d1b] dark:text-white">{title}</h3>
                <p className="mt-3 text-md font-normal leading-6 text-[#65716d] dark:text-white/65">
                  {text}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Services({ t }) {
  const icons = [FiUsers, FiGlobe, FiHeart, FiShield];

  return (
    <section id="services" className="bg-white px-4 py-16 dark:bg-[#111615] sm:px-6 lg:py-24">
      <div className="mx-auto mycontainer">
        <h2 className="text-4xl font-black text-[#191d1c] dark:text-white sm:text-5xl">
          {t.servicesTitle}
        </h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.services.map(([title, text], index) => {
            const Icon = icons[index];
            return (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.05 }}
                className="rounded-[1.5rem] border border-black/10 bg-[#fbfaf7] p-5 dark:border-white/10 dark:bg-white/5"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#4b0102] text-xl text-white">
                  <Icon aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xl font-black text-[#181d1b] dark:text-white">{title}</h3>
                <p className="mt-3 text-sm font-medium leading-6 text-[#65716d] dark:text-white/65">
                  {text}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Events({ t }) {
  return (
    <section id="events" className="px-4 py-16 sm:px-6 lg:py-12">
      <div className="mx-auto mycontainer">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-4xl font-semibold text-[#191d1c] dark:text-white sm:text-5xl">
            {t.eventsTitle}
          </h2>
          <Link href="/events/upcoming" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#4b0102] text-white font-black text-lg transition-all hover:scale-105 shadow-xl">
            View all events →
          </Link>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {t.events.map(([title, place, text]) => (
            <article
              key={title}
              className="overflow-hidden rounded-lg border border-black/10 bg-white"
            >
              <div className="relative h-56">
                <Image
                  src="/images/hero-banner.jpg"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                <span className="absolute bottom-4 left-4 rounded-full bg-white px-3 py-1 text-xs font-black text-black">
                  {place}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-2xl font-medium text-[#181d1b] dark:text-white">{title}</h3>
                <p className="mt-3 text-md font-normal leading-6 text-[#65716d] dark:text-white/65">
                  {text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Voting({ t }) {
  return (
    <section id="voting" className="bg-[#071c17] px-4 py-16 text-white sm:px-6 lg:py-24">
      <div className="mx-auto grid mycontainer gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-black uppercase text-[#62e69f]">Elections</p>
          <h2 className="mt-3 text-4xl font-black sm:text-5xl">{t.votingTitle}</h2>
          <p className="mt-5 text-lg font-medium leading-8 text-white/70">{t.votingText}</p>
          <Link
            href="/services/register-to-vote"
            className="mt-6 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#4b0102] text-white font-black text-lg transition-all hover:scale-105 shadow-xl"
          >
            Register to vote
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {voting.map(([label, Icon]) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/10 p-4"
            >
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#4b0102] text-white">
                <Icon aria-hidden="true" />
              </span>
              <span className="text-sm font-black">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuickLinks({ language }) {
  const links =
    language === "bn"
      ? [
        ["সংবিধান", "/about/constitution"],
        ["সভাপতির বাণী", "/about/presidents-statement"],
        ["কার্যনির্বাহী কমিটি", "/about/executive-committee"],
        ["সদস্য নিবন্ধন", "/services/membership"],
        ["পোর্টফোলিও", "/portfolio"],
        ["সাইন ইন", "/sign-in"],
      ]
      : [
        ["Constitution", "/about/constitution"],
        ["President's statement", "/about/presidents-statement"],
        ["Executive committee", "/about/executive-committee"],
        ["Membership", "/services/membership"],
        ["Portfolio", "/portfolio"],
        ["Sign in", "/sign-in"],
      ];

  return (
    <section className="bg-white px-4 py-16 dark:bg-[#111615] sm:px-6 lg:py-24">
      <div className="mx-auto mycontainer">
        <h2 className="text-3xl font-black text-[#191d1c] dark:text-white sm:text-4xl">
          {language === "bn" ? "দ্রুত লিংক" : "Explore ABAI"}
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="rounded-2xl bg-[#f1f6ff] p-4 text-center text-sm font-black text-[#4b0102] hover:bg-[#e0ebff] dark:bg-white/10 dark:hover:bg-white/15"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({ t, language }) {
  return (
    <section id="contact" className="px-4 py-10 sm:px-6 lg:py-14 bg-[#c89675] text-white">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="text-lg md:text-xl lg:text-4xl font-semibold mb-8">
          {language === "bn"
            ? "আপনার কি কোন পরামর্শ, মন্তব্য বা পরামর্শ আছে?"
            : "Have you any advice, comment or suggestions for us?"
          }
        </h2>
        <Link
          href="/contact"
          className="inline-flex items-center gap-3 text-base sm:text-lg font-black bg-white text-[#4b0102] px-10 py-4 rounded-full hover:bg-white/90 transition-all hover:scale-105 shadow-2xl"
        >
          {language === "bn" ? "এখনই যোগাযোগ করুন" : "Contact us now"}
          <FiArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}
