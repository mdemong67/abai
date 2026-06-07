"use client";

import { useSite } from "@/components/providers/SiteProvider";
import Link from "next/link";
import { FiAlertCircle, FiHome } from "react-icons/fi";
import PageShell from "./PageShell";

export default function UnderDevelopment() {
  const { language } = useSite();

  const t = {
    en: {
      title: "Page Under Development",
      subtitle: "Coming Soon!",
      description: "This page is currently under development. We are working hard to bring you this content soon. Please check back later.",
      backHome: "Back to Home",
    },
    bn: {
      title: "পৃষ্ঠাটি তৈরির চলছে",
      subtitle: "শীঘ্রই আসছে!",
      description: "এই পৃষ্ঠাটি বর্তমানে তৈরির মধ্যে রয়েছে। আমরা শীঘ্রই আপনাদের জন্য এই কনটেন্ট নিয়ে আসার জন্য কঠোর পরিশ্রম করছি। দয়া করে পরে দেখুন।",
      backHome: "হোমে ফিরে যান",
    },
  };

  const content = t[language];

  return (
    <PageShell>
      <section className="px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-2xl mycontainer text-center">
          <div className="flex items-center justify-center mb-8">
            <div className="w-24 h-24 rounded-full bg-[#4b0102]/10 flex items-center justify-center">
              <FiAlertCircle className="w-12 h-12 text-[#4b0102]" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-[#5b6461] dark:text-white/70 mb-10">
            Under Development
          </h1>

          <p className="text-lg text-[#5b6461] dark:text-white/70 mb-10">
            {content.description}
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#4b0102] text-white font-black text-lg hover:bg-[#3a0101] transition-all hover:scale-105 shadow-xl"
          >
            <FiHome className="w-5 h-5" />
            {content.backHome}
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
