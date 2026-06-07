"use client";

import PageShell from "@/components/layout/PageShell";
import { useSite } from "@/components/providers/SiteProvider";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiCalendar, FiGlobe, FiHeart, FiUsers } from "react-icons/fi";

export default function AboutPage() {
  const { language } = useSite();
  const t =
    language === "bn"
      ? {
        title: "আমাদের সম্পর্কে",
        aboutTitle: "অল বাংলাদেশি অ্যাসোসিয়েশন অফ আয়ারল্যান্ড (ABAI) ২০০৭ সালে ডাবলিনে প্রতিষ্ঠিত একটি কল্যাণমূলক সামাজিক সংগঠন।",
        aboutText1:
          "ABAI আয়ারল্যান্ডে সকল বাংলাদেশিদের জন্য একটি কল্যাণ সংস্থা। গণতান্ত্রিক নির্বাচনের মাধ্যমে নির্বাচিত প্রতিনিধিদের একটি দল রয়েছে। জাতীয় কার্যনির্বাহী কমিটি পুরো কমিউনিটির আকাঙ্ক্ষা পূরণের লক্ষ্যে কাজ করে।",
        aboutText2:
          "২০০৭ সালে ডাবলিনে প্রতিষ্ঠিত, ABAI পহেলা বৈশাখ, একুশে ফেব্রুয়ারি, ঈদ, স্বাধীনতা ও বিজয় দিবসসহ সাংস্কৃতিক, সামাজিক ও ধর্মীয় অনুষ্ঠান আয়োজন করে। পিকনিক, ফুটবল ম্যাচ এবং বন্যা ও দুর্যোগে তহবিল সংগ্রহও আমাদের কার্যক্রমের অংশ।",
        missionTitle: "আমাদের মিশন",
        missionText:
          "আমাদের মিশন হলো আয়ারল্যান্ডের বাংলাদেশী কমিউনিটিকে একত্রিত করা, তাদের সাংস্কৃতিক ঐতিহ্য রক্ষা করা, এবং সামাজিক কল্যাণের মাধ্যমে একটি সমৃদ্ধ ও সমন্বিত সম্প্রদায় গড়ে তোলা।",
        visionTitle: "আমাদের ভিশন",
        visionText:
          "আমাদের ভিশন হলো আয়ারল্যান্ডের বাংলাদেশী প্রবাসীদের জন্য একটি উন্নত, সমৃদ্ধ ও গুরুত্বপূর্ণ সম্প্রদায় তৈরি করা, যেখানে সবাইকে সমান সুযোগ ও সম্মান পাওয়া যাবে।",
        features: [
          {
            icon: FiUsers,
            title: "কমিউনিটি সংযোগ",
            text: "আয়ারল্যান্ডের বাংলাদেশি পরিবারগুলোকে একসাথে আনা।",
          },
          {
            icon: FiCalendar,
            title: "সাংস্কৃতিক অনুষ্ঠান",
            text: "বাংলাদেশের উৎসব ও ঐতিহ্য উদযাপন।",
          },
          {
            icon: FiHeart,
            title: "কল্যাণ ও সহায়তা",
            text: "প্রয়োজনে তহবিল সংগ্রহ ও কমিউনিটি সহায়তা।",
          },
          {
            icon: FiGlobe,
            title: "নেতৃত্ব ও গণতন্ত্র",
            text: "নির্বাচিত কার্যনির্বাহী কমিটি ও স্বচ্ছ পরিচালনা।",
          },
        ],
      }
      : {
        title: "About us",
        aboutTitle: "The All Bangladeshi Association of Ireland (ABAI) is a charitable social organisation established in Dublin in 2007.",
        aboutText1:
          "ABAI is a welfare organisation for all Bangladeshi people in Ireland. Through democratic elections we have a body of elected representatives. The national executive committee functions with the aim of fulfilling the aspirations and expectations of the whole community.",
        aboutText2:
          "Established in Dublin in 2007, ABAI organises cultural, social, and religious events including Pohela Boishakh, Ekushey February, Eid festivals, Bangladesh Independence Day, and Victory Day. We also organise picnics, football matches, and fundraising for Bangladeshi flood and natural disaster victims.",
        missionTitle: "Our Mission",
        missionText:
          "Our mission is to unite the Bangladeshi community in Ireland, preserve their cultural heritage, and build a prosperous and inclusive community through social welfare activities.",
        visionTitle: "Our Vision",
        visionText:
          "Our vision is to create an advanced, prosperous, and important community for Bangladeshi expats in Ireland, where everyone will have equal opportunities and respect.",
        features: [
          {
            icon: FiUsers,
            title: "Community Connection",
            text: "Bringing Bangladeshi families together across Ireland.",
          },
          {
            icon: FiCalendar,
            title: "Cultural Celebrations",
            text: "Celebrating Bangladeshi festivals and heritage.",
          },
          {
            icon: FiHeart,
            title: "Welfare & Support",
            text: "Fundraising and community support when needed.",
          },
          {
            icon: FiGlobe,
            title: "Leadership & Democracy",
            text: "Elected executive committee and transparent governance.",
          },
        ],
      };

  return (
    <PageShell>

      {/* Landing page style About section */}
      <section id="about" className="px-4 py-8 sm:px-6 lg:py-14">
        <div className="mx-auto grid mycontainer gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <Image className="rounded-lg" src='/images/banner-2.jpg' alt='about-image' width={1000} height={1000} />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#191d1c] dark:text-white mb-6">
              {t.aboutTitle}
            </h2>
            <p className="text-base sm:text-lg pb-5 font-medium leading-7 sm:leading-8 text-[#5b6461] dark:text-white/70">
              {t.aboutText1}
            </p>
            <p className="text-base sm:text-lg font-medium leading-7 sm:leading-8 text-[#5b6461] dark:text-white/70">
              {t.aboutText2}
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision section */}
      <section className="bg-gradient-to-br from-[#4b0102]/10 to-white dark:from-[#4b0102]/20 dark:to-[#0a121c] px-4 py-8 sm:px-6 lg:py-14">
        <div className="mx-auto mycontainer">
          <div className="text-center mb-12">
            <p className="text-sm font-black uppercase text-[#4b0102] mb-2">
              {language === "bn" ? "লক্ষ্য ও উদ্দেশ্য" : "Mission & Vision"}
            </p>
            <h2 className="text-4xl font-black text-[#191d1c] dark:text-white sm:text-5xl">
              {language === "bn" ? "আমাদের মিশন ও ভিশন" : "Our Mission & Vision"}
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Mission */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-100 dark:border-gray-700 shadow-xl hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="w-16 h-16 rounded-2xl bg-[#4b0102]/10 flex items-center justify-center mb-6">
                <FiHeart className="w-8 h-8 text-[#4b0102]" />
              </div>
              <h3 className="text-2xl font-black text-[#191d1c] dark:text-white mb-4">
                {t.missionTitle}
              </h3>
              <p className="text-lg leading-8 text-[#5b6461] dark:text-white/70">
                {t.missionText}
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-100 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
              <div className="w-16 h-16 rounded-2xl bg-[#4b0102]/10 flex items-center justify-center mb-6">
                <FiGlobe className="w-8 h-8 text-[#4b0102]" />
              </div>
              <h3 className="text-2xl font-black text-[#191d1c] dark:text-white mb-4">
                {t.visionTitle}
              </h3>
              <p className="text-lg leading-8 text-[#5b6461] dark:text-white/70">
                {t.visionText}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="bg-[#4b0102]/5 dark:bg-white/5 px-4 py-8 sm:px-6 lg:py-14">
        <div className="mx-auto mycontainer">
          <div className="text-center mb-12">
            <p className="text-sm font-black uppercase text-[#4b0102]">
              {language === "bn" ? "কেন ABAI?" : "Why ABAI?"}
            </p>
            <h2 className="mt-2 text-4xl font-black text-[#191d1c] dark:text-white sm:text-5xl">
              {language === "bn"
                ? "আমাদের মূল লক্ষ্য ও কার্যক্রম"
                : "Our core mission & activities"}
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {t.features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#07111f] rounded-lg p-8 border border-black/10 dark:border-white/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-[#4b0102]/10 dark:bg-[#4b0102]/20 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-[#4b0102]" />
                </div>
                <h3 className="text-xl font-black text-[#191d1c] dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#5b6461] dark:text-white/70">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>



        <div className="w-full mt-10 flex items-center justify-center">
          <Link
            href="/about/constitution"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#4b0102] text-white font-black text-lg transition-all hover:scale-105 shadow-xl"
          >
            {language === "bn" ? "গঠনতন্ত্র দেখুন" : "See Constitution"} <FiArrowRight />
          </Link>
        </div>


      </section>

    </PageShell>
  );
}
