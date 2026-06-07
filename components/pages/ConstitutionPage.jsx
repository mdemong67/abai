"use client";

import PageShell from "@/components/layout/PageShell";
import { useSite } from "@/components/providers/SiteProvider";
import Link from "next/link";
import { FiArrowRight, FiBookOpen, FiCheckCircle, FiFileText } from "react-icons/fi";

export default function ConstitutionPage() {
  const { language } = useSite();

  const t =
    language === "bn"
      ? {
        title: "ABAI সংবিধান",
        intro:
          "ABAI-এর একটি সংবিধান রয়েছে — কী আছে সংবিধানে, নিচের বিস্তারিত দেখুন।",
        sections: [
          {
            title: "সংস্থার লক্ষ্য",
            content:
              "সংবিধানে সংস্থার মূল লক্ষ্য নির্ধারিত আছে — বাংলাদেশি কমিউনিটির কল্যাণ, ঐতিহ্য রক্ষা ও সংস্কৃতি প্রসার।",
          },
          {
            title: "সদস্যপদের বিধি",
            content:
              "সদস্যপদের মানদণ্ড, আবেদন প্রক্রিয়া ও সদস্যদের অধিকার ও দায়িত্ব নির্ধারিত।",
          },
          {
            title: "কার্যনির্বাহী কমিটি",
            content:
              "কমিটির গঠন, ক্ষমতা, দায়িত্ব, মেয়াদ ও নির্বাচন প্রক্রিয়া সংবিধানে বিস্তারিত।",
          },
          {
            title: "আর্থিক পরিচালনা",
            content:
              "সংস্থার অর্থায়ন, কোষাধ্যক্ষের দায়িত্ব, বার্ষিক হিসাব ও অডিট সংক্রান্ত বিধান।",
          },
        ],
      }
      : {
        title: "ABAI Constitution",
        intro:
          "ABAI has a constitution — here is an overview of our governance structure and rules.",
        sections: [
          {
            title: "Aims of the Association",
            content:
              "The constitution outlines the association's core aims: welfare of the Bangladeshi community, preserving heritage, and promoting culture.",
          },
          {
            title: "Membership Rules",
            content:
              "Membership criteria, application process, and members' rights and responsibilities are defined here.",
          },
          {
            title: "Executive Committee",
            content:
              "Committee structure, powers, duties, term, and election procedures are detailed in the constitution.",
          },
          {
            title: "Financial Governance",
            content:
              "Finances, treasurer duties, annual accounts, and audit procedures are governed by the constitution.",
          },
        ],
      };

  return (
    <PageShell>
      <section className="px-4 py-14 sm:px-6">
        <div className="mx-auto mycontainer">
          <div className="bg-white dark:bg-[#07111f] rounded-[1.5rem] border border-black/10 dark:border-white/10 p-8 lg:p-12">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-black/10 dark:border-white/10">
              <FiFileText className="w-12 h-12 text-[#0757ff]" />
              <div>
                <h2 className="text-2xl font-black text-[#191d1c] dark:text-white">
                  {language === "bn" ? "সংবিধান সারাংশ" : "Constitution Summary"}
                </h2>
                <p className="text-[#5b6461] dark:text-white/70">
                  {t.intro}
                </p>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {t.sections.map((section, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border border-black/10 dark:border-white/10"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <FiCheckCircle className="w-6 h-6 text-[#009b5a]" />
                    <h3 className="text-lg font-black text-[#191d1c] dark:text-white">
                      {section.title}
                    </h3>
                  </div>
                  <p className="text-[#5b6461] dark:text-white/70 leading-7">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-black/10 dark:border-white/10">
              <div className="bg-[#f2f9ff] dark:bg-white/5 rounded-xl p-6 flex items-start gap-4">
                <FiBookOpen className="w-8 h-8 text-[#0757ff] shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-black text-[#191d1c] dark:text-white mb-1">
                    {language === "bn"
                      ? "পূর্ণ সংবিধানের জন্য"
                      : "Full Constitution"}
                  </h4>
                  <p className="text-[#5b6461] dark:text-white/70">
                    {language === "bn"
                      ? "পূর্ণ সংবিধান নথি পেতে info@abai.ie-এ যোগাযোগ করুন।"
                      : "For the full constitution document, contact info@abai.ie."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>



        <div className="w-full mt-10 flex items-center justify-center">
          <Link
            href="/about/presidents-statement"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#4b0102] text-white font-black text-lg transition-all hover:scale-105 shadow-xl"
          >
            {language === "bn" ? "সভাপতির বাণী" : "President Statement"} <FiArrowRight />
          </Link>
        </div>


      </section>
    </PageShell>
  );
}
