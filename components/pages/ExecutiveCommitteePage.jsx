"use client";

import PageShell from "@/components/layout/PageShell";
import { useSite } from "@/components/providers/SiteProvider";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

// Updated members from abai.ie/current-executive-committee
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
  {
    id: 3,
    role: "Vice President",
    rolebn: "সহ সভাপতি",
    name: "Md. Azizur Rahman Masud",
    img: "/images/Vice President-1.jpeg",
  },
  {
    id: 4,
    role: "Vice President",
    rolebn: "সহ সভাপতি",
    name: "Shahin Reza",
    img: "/images/Vice President-2.jpeg",
  },
  {
    id: 5,
    role: "Vice President",
    rolebn: "সহ সভাপতি",
    name: "Monirul Islam",
    img: "/images/Vice President-3.jpg",
  },
  {
    id: 6,
    role: "Vice President",
    rolebn: "সহ সভাপতি",
    name: "Kazi Shah Alam",
    img: "/images/Vice President-4.jpeg",
  },
  {
    id: 7,
    role: "Joint Secretary General",
    rolebn: "যুগ্ম মহাসচিব",
    name: "Mahmudul Hassan Chowdhury Sohel",
    img: "/images/Mahmudul Hassan Chowdhury Sohel.jpg",
  },
  {
    id: 8,
    role: "Joint Secretary General",
    rolebn: "যুগ্ম মহাসচিব",
    name: "SM Hasan",
    img: "/images/SM Hasan.jpg",
  },
  {
    id: 9,
    role: "Organizing Secretary",
    rolebn: "সাংগঠনিক সচিব",
    name: "Injamamul Haque Jewel",
    img: "/images/Injamamul Haque Jewel.jpeg",
  },
  {
    id: 10,
    role: "Joint Organizing Secretary",
    rolebn: "যুগ্ম সাংগঠনিক সচিব",
    name: "Abdul Jalil",
    img: "/images/Abdul Jalil.jpg",
  },
  {
    id: 11,
    role: "Joint Organizing Secretary",
    rolebn: "সহ-সাংগঠনিক সচিব",
    name: "MD Motiur Rahman",
    img: "/images/MD Motiur Rahman.jpg",
  },
  {
    id: 12,
    role: "Finance Secretary",
    rolebn: "অর্থসচিব",
    name: "Md Taus Mia Talukder",
    img: "/images/Md Taus Mia Talukder.jpg",
  },
  {
    id: 13,
    role: "Joint Finance Secretary",
    rolebn: "যুগ্ম অর্থসচিব",
    name: "Mujibul Haque",
    img: "/images/Mujibul Haque.jpg",
  },
  {
    id: 14,
    role: "Office Secretary",
    rolebn: "দপ্তর সচিব",
    name: "Md Sarwar Morshed",
    img: "/images/Md Sarwar Morshed.jpg",
  },
  {
    id: 15,
    role: "Publication Secretary",
    rolebn: "প্রকাশনা সচিব",
    name: "Kabir Ahamad Babul",
    img: "/images/Kabir Ahamad Babul.jpg",
  },
  {
    id: 16,
    role: "Joint Publication Secretary",
    rolebn: "যুগ্ম প্রকাশনা সচিব",
    name: "Jubayer Ahmed",
    img: "/images/Jubayer Ahmed.jpg",
  },
  {
    id: 17,
    role: "Cultural Secretary",
    rolebn: "সাংস্কৃতিক সচিব",
    name: "Tareq Mahmud Iqbal",
    img: "/images/Tareq Mahmud Iqbal.jpg",
  },
  {
    id: 18,
    role: "Joint Cultural Secretary",
    rolebn: "যুগ্ম সাংস্কৃতিক সচিব",
    name: "Md Shariful Alam Bhuiyan",
    img: "/images/Md Shariful Alam Bhuiyan.jpg",
  },
  {
    id: 19,
    role: "Sports Secretary",
    rolebn: "ক্রীড়া সচিব",
    name: "Rabbi Khan",
    img: "/images/Rabbi Khan.jpg",
  },
  {
    id: 20,
    role: "Religious Secretary",
    rolebn: "ধর্ম সচিব",
    name: "Muzammel Haque",
    img: "/images/Muzammel Haque.jpg",
  },
  {
    id: 21,
    role: "Joint Religious Secretary",
    rolebn: "যুগ্ম ধর্ম সচিব",
    name: "Lokman Hussein",
    img: "/images/Lokman Hussein.jpg",
  },
  {
    id: 22,
    role: "Women Welfare Secretary",
    rolebn: "মহিলা কল্যাণ সচিব",
    name: "Mrs. Shompa Lilly",
    img: "/images/Mrs Shompa Lilly.jpg",
  },
  {
    id: 23,
    role: "Joint Women Welfare Secretary",
    rolebn: "যুগ্ম মহিলা কল্যাণ সচিব",
    name: "Shirin Akter",
    img: "/images/Shirin Akter.jpg",
  },
  {
    id: 24,
    role: "Social Welfare Secretary",
    rolebn: "সমাজ কল্যাণ সচিব",
    name: "Mujibur Rahman",
    img: "/images/Mujibur Rahman.jpg",
  },
  {
    id: 25,
    role: "Education Secretary",
    rolebn: "শিক্ষা সচিব",
    name: "Md Ruhul Amin",
    img: "/images/Md Ruhul Amin.jpg",
  },
  {
    id: 26,
    role: "IT Secretary",
    rolebn: "আইটি সচিব",
    name: "MD Yusuf Chowdhury",
    img: "/images/MD Yusuf Chowdhury.jpg",
  },
];

export default function ExecutiveCommitteePage() {
  const { language } = useSite();

  const t =
    language === "bn"
      ? {
        title: "বর্তমান কার্যনির্বাহী কমিটি",
        subtitle:
          "১১ সেপ্টেম্বর ২০২২ নির্বাচনের পর গঠিত দ্বিতীয় কার্যনির্বাহী কমিটি।",
      }
      : {
        title: "Current Executive Committee",
        subtitle:
          "The second executive committee formed after the election on 11th September 2022.",
      };

  // Separate president and secretary general for featured section
  const president = committeeMembers[0];
  const secretaryGeneral = committeeMembers[1];
  const otherMembers = committeeMembers.slice(2);

  return (
    <PageShell>

      <section className="px-4 py-14 sm:px-6 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <p className="text-4xl font-bold uppercase text-black/70 dark:text-white/70 mb-2">
              {language === "bn" ? "কমিউনিটি নেতৃত্ব" : "Community Leadership"}
            </p>
            <p className="text-xl font-medium text-[#5b6461] dark:text-white/70">
              {t.subtitle}
            </p>
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

          {/* All Members Grid (UN site style) */}
          <div>
            <h3 className="text-2xl font-medium text-[#191d1c] dark:text-white mb-10 text-center">
              {language === "bn" ? "সমস্ত কমিটি সদস্য" : "All Committee Members"}
            </h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {otherMembers.map((member) => (
                <div key={member.id} className="group bg-white dark:bg-gray-800 overflow-hidden">
                  <div className="relative aspect-[4/4]">
                    <Image
                      src={member.img}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl text-center font-medium font-black text-[#191d1c] dark:text-white mb-4">
                      {member.name}
                    </h3>
                    <span className="text-black dark:text-white text-center text-md font-normal mb-3">
                      {language === "bn" ? member.rolebn : member.role} of ABAI
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>


        <div className="w-full mt-10 flex items-center justify-center">
          <Link
            href="/sign-in"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#4b0102] text-white font-black text-lg transition-all hover:scale-105 shadow-xl"
          >
            {language === "bn" ? "সভাপতির" : "Become a Member"} <FiArrowRight />
          </Link>
        </div>

      </section>
    </PageShell>
  );
}
