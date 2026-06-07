"use client";

import PageShell from "@/components/layout/PageShell";
import { useSite } from "@/components/providers/SiteProvider";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiUsers } from "react-icons/fi";

export default function PresidentsStatementPage() {
  const { language } = useSite();

  const t =
    language === "bn"
      ? {
        title: "সভাপতির বাণী",
        subtitle: "অল বাংলাদেশী এসোসিয়েশন অব আয়ারল্যান্ড (আবাই) কি এবং এই সংগঠনের কি প্রয়োজন?",
        intro: "ফেইসবুকে এবং অন্যান্য সূত্রে আয়ারল্যান্ড প্রবাসী বেশ কয়েকজন বাংলাদেশী আবাই কি এবং এই সংগঠনের কি প্রয়োজন এই প্রশ্ন বিভিন্নভাবে উত্থাপন করেছেন। আমার কাছে প্রথমেই মনে হয়েছে এ প্রশ্ন উত্থাপনের কারণ কি? যারা এই প্রশ্ন করেছেন তাদের কিছু অংশ আয়ারল্যান্ডে নবীন, তাই হতে পারে এই সংগঠন সম্পর্কে তাদের তেমন কোন ধারনা নেই। অন্যদিকে যারা এই দেশে দীর্ঘদিন থেকে আছেন, হতে পারে তারা জেনে বুঝেই এই প্রশ্ন করছেন। সম্ভবতঃ তারা জানতে চাচ্ছেন বিগত সময়ে এই সংগঠন কি কর্ম সম্পাদন করতে পেরেছে। তাই এই সংগঠন সম্পর্কে একটি ধারনা দেবার প্রয়াস আমি গ্রহণ করছি।",
        whatIsAbai: "অল বাংলাদেশী এসোসিয়েশন অব আয়ারল্যান্ড (আবাই) কি?",
        whatIsAbaiText: "২০১০ সালে আয়ারল্যান্ডের বিভিন্ন শহুরে বসবাসরত কিছু দুরদ্শি প্রবাসী বাংলাদেশী, সমগ্র আয়ারল্যান্ডে বসবাসরত প্রবাসী বাংলাদেশীদের একব্বিত করে একটি ছাতা সংগঠনের অন্তর্ভূক্ত করার প্রয়াস গ্রহণ করেন। সেই সূত্র ধরে ২০১১ সালের অক্টোবর মাসে একটি প্রত্যক্ষ জাতীয় নির্বাচনের মাধ্যমে অল বাংলাদেশি এসোসিয়েশন অব আয়ারল্যান্ডের (আবাই) এর প্রথম কার্যকরী পরিষদ গঠিত হয়।",
        quote: "আমি মনে করি এই ধরনের সংগঠন একটি স্বপ্নিল উদ্যোগ। সারা বিশ্বের কোন দেশে একটি সংগঠনের ছায়াতলে সকল প্রবাসীদের একতাবদ্ধ থাকতে পারাটা নজিরবিহীন।",
        presidentName: "ডাঃ জিনুরাইন জায়গীরদার",
        presidentRole: "সভাপতি",
      }
      : {
        title: "President's Statement",
        subtitle: "What is the All Bangladeshi Association of Ireland (ABAI) and why do we need it?",
        intro: "On Facebook and other sources, many Bangladeshi expats in Ireland have raised questions about what ABAI is and why we need this organization. I first wondered why these questions were being asked. Some who asked are new to Ireland, so they may not know much about this organization. On the other hand, those who have been in this country for a long time may have asked these questions knowingly. Perhaps they want to know what this organization has been able to accomplish in the past. So I am trying to give an idea about this organization.",
        whatIsAbai: "What is the All Bangladeshi Association of Ireland (ABAI)?",
        whatIsAbaiText: "In 2010, some visionary Bangladeshi expats living in various cities of Ireland took the initiative to unite all Bangladeshi expats living in Ireland under one umbrella organization. Following that, in October 2011, the first executive committee of the All Bangladeshi Association of Ireland (ABAI) was formed through a direct national election.",
        quote: "I believe this type of organization is a dream initiative. It is unprecedented for all expats to be united under one organization in any country in the world.",
        presidentName: "Dr. Md Jinnuraine Jaigirdar",
        presidentRole: "President",
      };

  return (
    <PageShell>
      <section className="px-4 py-16 sm:px-6 lg:py-14 bg-gradient-to-br from-[#f2f9ff] to-white dark:from-[#071c17] dark:to-[#0a121c]">
        <div className="mx-auto mycontainer">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr] items-start">
            {/* Left column - President photo */}
            <div className="lg:sticky lg:top-24">
              <div className="relative rounded-lg overflow-hidden">
                <Image
                  src="/images/President.png"
                  alt={t.presidentName}
                  width={500}
                  height={600}
                  className="w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-2xl font-black">{t.presidentName}</h3>
                  <p className="text-lg opacity-90">{t.presidentRole}, ABAI</p>
                </div>
              </div>
            </div>

            {/* Right column - Statement */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 lg:p-12 border border-gray-100 dark:border-gray-700">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-xl leading-9 text-[#5b6461] dark:text-white/80 mb-8">
                  {t.intro}
                </p>

                <div className="border-l-4 border-[#4b0102] pl-6 py-2 my-8 bg-[#f2f9ff] dark:bg-[#4b0102]/10 rounded-r-2xl">
                  <h3 className="text-2xl font-black text-[#191d1c] dark:text-white mb-4">
                    {t.whatIsAbai}
                  </h3>
                  <p className="text-lg leading-8 text-[#5b6461] dark:text-white/80">
                    {t.whatIsAbaiText}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-[#4b0102] to-[#4b0102] rounded-3xl p-8 mt-10 text-white">
                  <p className="italic text-xl leading-9 mb-6">
                    {t.quote}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      <FiUsers className="w-6 h-6" />
                    </div>
                    <p className="font-black text-lg">
                      — {t.presidentName}
                    </p>
                  </div>
                </div>

                {/* Additional content from source */}
                <div className="mt-10 space-y-6 text-lg leading-8 text-[#5b6461] dark:text-white/80">
                  <p>
                    {language === "bn"
                      ? "প্রসঙ্গতঃ উল্লেখযোগ্য যে, তখন আয়ারল্যান্ডে, কাউন্টি ভিত্তিক কয়েকটি সংগঠন কিছু কার্যক্রম পরিচালনা করছিলেন তারমধ্যে 'বাংলাদেশ এসোসিয়েশন অব আয়ারল্যান্ড (বাই)', 'বাংলাদেশ কমিউনিটি অব কর্ক (বিসিসি)', 'বাংলাদেশ কমিউনিটি অব গলওয়ে' অন্যতম। এই সংগঠনগুলোর নির্বাহীরা যেহেতু প্রত্যক্ষ ভোটে নির্বাচিত ছিলেন না তাই তাদের সার্বজনীন গ্রন্থযোগ্যতা কম ছিল এবং সেই সাথে বিভিন্ন কাউন্টির মধ্যে কোন সমন্বয় ছিল না। আবাই এর উদ্যোগ ছিল প্রতিটি কাউন্টিতে একটি করে কাঠামো তৈরি করা এবং সেই সাথে কেন্দ্রীয় একটি কাঠামো তৈরি করা যা সকলের সাথে সমন্বয় ও যোগাযোগের মাধ্যমে প্রবাসে বাংলাদেশী কমিউনিটিকে একতাবদ্ধ রেখে তাদের উন্নয়নে ভূমিকা গ্রহণ করবে। বিশেষ করে আয়ারল্যান্ডে কোন বাংলাদেশী দূতাবাস না থাকায়, বিভিন্ন সময় কনসুলার সেবার আয়োজন ও কমিউনিটিকে প্রতিনিধিত্ব করার প্রয়োজনীয়তা বিশেষভাবে পরিলক্ষিত হয়।"
                      : "It is worth mentioning that at that time in Ireland, several county-based organizations were carrying out various activities, including the 'Bangladesh Association of Ireland (BAI)', 'Bangladesh Community of Cork (BCC)', and 'Bangladesh Community of Galway', among others. Since the leaders of these organizations were not elected by direct vote, their universal acceptance was low, and there was no coordination between the different counties. ABAI's initiative was to create a structure in each county and a central structure that would work to coordinate and communicate with everyone to unite the Bangladeshi community in Ireland and contribute to their development. Especially in the absence of a Bangladeshi embassy in Ireland, the need to organize consular services and represent the community at various times was particularly felt."}
                  </p>

                  <h3 className="text-2xl font-black text-[#191d1c] dark:text-white mt-8 mb-4">
                    {language === "bn"
                      ? "আবাই এর গঠনতন্ত্র ও ঘোষণা"
                      : "ABAI's Constitution and Declaration"}
                  </h3>
                  <p>
                    {language === "bn"
                      ? "২০১২ সালের ১লা জানুয়ারি থেকে আবাই এর প্রথম কার্যকরী পরিষদ তাদের কার্যক্রম শুরু করে এবং কার্যক্রম সুচারুরূপে পরিচালনার লক্ষ্যে ২০১৩ সালে একটি লিখিত গঠনতন্ত্র উপস্থাপন করে সেইভাবে কার্যক্রম পরিচালনার উদ্যোগ গ্রহণ করা হয়। সংগঠনের মূল লক্ষ্য রাখা হয়, প্রবাসে নিজেদের ধর্ম, ভাষা, সংস্কৃতি, খেলাধুলা এবং শিক্ষা কার্যক্রম পরিচালনার মাধ্যমে নিজেদেরকে সামগ্রিক, সুখী ও সমৃদ্ধশালী হিসেবে প্রতিষ্ঠা করা।"
                      : "From January 1, 2012, the first executive committee of ABAI began its activities, and in 2013, a written constitution was presented to ensure smooth operation of the organization. The main objective of the organization was to establish ourselves as an integrated, happy, and prosperous community in the diaspora through practicing our religion, language, culture, sports, and educational activities."}
                  </p>
                </div>
              </div>

              <div className="mt-10 flex items-center justify-center lg:justify-start">
                <Link
                  href="/about/executive-committee"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#4b0102] text-white font-black text-lg transition-all hover:scale-105 shadow-xl"
                >
                  {language === "bn" ? "কার্যকরী কমিটি দেখুন" : "View Executive Committee"} <FiArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
