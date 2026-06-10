"use client";

import Link from "next/link";
import { FiArrowLeft, FiTool } from "react-icons/fi";
import PageShell from "@/components/layout/PageShell";
import { useSite } from "@/components/providers/SiteProvider";

export default function NewsDetails() {
  const { language } = useSite();
  const lang = language;

  return (
    <PageShell>
      <div className="bg-[#fbfbf9] dark:bg-[#090e0c] min-h-[70vh] flex items-center justify-center text-gray-900 dark:text-gray-100 px-4 py-16">
        <div className="max-w-md w-full text-center space-y-8 p-10 rounded-2xl bg-white dark:bg-gray-800 border border-gray-250/50 dark:border-gray-700 shadow-xl transition-all duration-300">
          
          {/* Animated Icon */}
          <div className="flex justify-center">
            <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-[#4b0102]/10 dark:bg-[#4b0102]/20 text-[#4b0102] dark:text-[#f3b5ba] animate-bounce">
              <FiTool className="w-12 h-12" />
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#4b0102]/20 animate-ping opacity-75"></span>
            </div>
          </div>

          {/* Heading & Text */}
          <div className="space-y-3">
            <h1 className="font-serif text-3xl font-black text-gray-950 dark:text-white leading-tight">
              {lang === "bn" ? "পৃষ্ঠাটি নির্মাণাধীন" : "Page Under Development"}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-sans">
              {lang === "bn" 
                ? "আমরা আপনাকে সম্পূর্ণ খবরটি দেওয়ার জন্য কাজ করছি। অনুগ্রহ করে শীঘ্রই আবার চেক করুন!" 
                : "We are currently building this section to bring you the full coverage. Please check back later!"}
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200 dark:bg-gray-700 w-1/2 mx-auto"></div>

          {/* Button */}
          <div className="flex justify-center pt-2">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#4b0102] text-white font-black text-base transition-all hover:scale-105 shadow-md hover:shadow-lg cursor-pointer"
            >
              <FiArrowLeft className="w-5 h-5" />
              {lang === "bn" ? "খবরে ফিরে যান" : "Back to News"}
            </Link>
          </div>

        </div>
      </div>
    </PageShell>
  );
}
