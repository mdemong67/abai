"use client";

import PageShell from "@/components/layout/PageShell";
import { useSite } from "@/components/providers/SiteProvider";
import { useState } from "react";
import {
  FiArrowRight,
  FiAward,
  FiCalendar,
  FiCreditCard,
  FiDollarSign,
  FiGlobe,
  FiHeart,
  FiShield,
  FiUsers
} from "react-icons/fi";

export default function DonatePage() {
  const { language } = useSite();
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [donationType, setDonationType] = useState("one-time");

  const t = {
    en: {
      title: "Donate",
      subtitle: "Support our community",
      intro: "Your donation helps us organize cultural events, provide welfare support, and strengthen the Bangladeshi community in Ireland.",
      oneTime: "One-time Donation",
      monthly: "Monthly Donation",
      donateNow: "Donate Now",
      amounts: [10, 25, 50, 100, 250],
      impactTitle: "Your Impact",
      impact: [
        {
          icon: FiUsers,
          stat: "500+",
          label: "Families Supported"
        },
        {
          icon: FiCalendar,
          stat: "20+",
          label: "Annual Events"
        },
        {
          icon: FiGlobe,
          stat: "17+",
          label: "Years of Service"
        }
      ],
      whyDonate: "Why Donate?",
      reasons: [
        {
          icon: FiHeart,
          title: "Cultural Programs",
          text: "Support Pohela Boishakh, Ekushey February, Eid gatherings and more"
        },
        {
          icon: FiDollarSign,
          title: "Welfare Support",
          text: "Help community members in need during difficult times"
        },
        {
          icon: FiAward,
          title: "Youth Programs",
          text: "Fund education, mentorship, and sports activities for our youth"
        },
        {
          icon: FiCreditCard,
          title: "Operational Costs",
          text: "Cover administrative costs and event expenses"
        }
      ],
      testimonials: [
        {
          quote: "ABAI has been a second home for my family. The support we received during tough times was invaluable.",
          name: "Fatima Begum",
          role: "Community Member since 2015"
        },
        {
          quote: "The cultural events help our children stay connected to their roots. It's so important for our community.",
          name: "Mohammed Rahman",
          role: "Parent & Volunteer"
        }
      ],
      secure: "100% Secure Donation",
      secureText: "Your payment information is encrypted and secure. We never store your card details."
    },
    bn: {
      title: "দান করুন",
      subtitle: "আমাদের কমিউনিটিকে সমর্থন করুন",
      intro: "আপনার দান আমাদেরকে সাংস্কৃতিক ইভেন্ট সংগঠিত করতে, কল্যাণ সহায়তা প্রদান করতে এবং আয়ারল্যান্ডে বাংলাদেশী কমিউনিটিকে শক্তিশালী করতে সাহায্য করে।",
      oneTime: "একক দান",
      monthly: "মাসিক দান",
      donateNow: "এখন দান করুন",
      amounts: [10, 25, 50, 100, 250],
      impactTitle: "আপনার প্রভাব",
      impact: [
        {
          icon: FiUsers,
          stat: "৫০০+",
          label: "পরিবার সমর্থিত"
        },
        {
          icon: FiCalendar,
          stat: "২০+",
          label: "বার্ষিক ইভেন্ট"
        },
        {
          icon: FiGlobe,
          stat: "১৭+",
          label: "সেবার বছর"
        }
      ],
      whyDonate: "কেন দান করবেন?",
      reasons: [
        {
          icon: FiHeart,
          title: "সাংস্কৃতিক কর্মসূচী",
          text: "পহেলা বৈশাখ, একুশে ফেব্রুয়ারি, ঈদের সংগ্রহ এবং আরও অনেককে সমর্থন করুন"
        },
        {
          icon: FiDollarSign,
          title: "কল্যাণ সহায়তা",
          text: "কঠিন সময়ে কমিউনিটি সদস্যদের সাহায্য করুন"
        },
        {
          icon: FiAward,
          title: "যুব কর্মসূচী",
          text: "আমাদের যুবদের জন্য শিক্ষা, পরামর্শ এবং খেলাধুলার কার্যক্রমের অর্থায়ন"
        },
        {
          icon: FiCreditCard,
          title: "অপারেশনাল খরচ",
          text: "প্রশাসনিক খরচ এবং ইভেন্টের ব্যয় কভার করুন"
        }
      ],
      testimonials: [
        {
          quote: "ABAI আমার পরিবারের জন্য দ্বিতীয় বাড়ি হয়েছে। কঠিন সময়ে আমরা যে সহায়তা পেয়েছি তা অমূল্য ছিল।",
          name: "ফাতিমা বেগম",
          role: "২০১৫ সাল থেকে কমিউনিটি সদস্য"
        },
        {
          quote: "সাংস্কৃতিক ইভেন্টগুলো আমাদের বাচ্চাদেরকে তাদের শিকড়ের সাথে সংযুক্ত থাকতে সাহায্য করে। এটা আমাদের কমিউনিটির জন্য খুব গুরুত্বপূর্ণ।",
          name: "মোহাম্মদ রহমান",
          role: "পিতা ও স্বেচ্ছাসেবক"
        }
      ],
      secure: "১০০% নিরাপদ দান",
      secureText: "আপনার পেমেন্ট তথ্য এনক্রিপ্ট করা এবং নিরাপদ। আমরা কখনোই আপনার কার্ডের বিস্তারিত সংরক্ষণ করি না।"
    }
  };

  const content = t[language];

  return (
    <PageShell>
      <section className="px-4 py-8 sm:px-6 lg:py-14 bg-[#4b0102]/5 dark:bg-[#0a121c]">
        <div className="mx-auto mycontainer">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-start">
            {/* Left side - Interactive Information */}
            <div className="space-y-10">
              <div>
                <h2 className="hidden text-3xl sm:text-4xl font-black text-[#191d1c] dark:text-white mb-6">
                  {content.impactTitle}
                </h2>
                <div className="grid gap-6 sm:grid-cols-3">
                  {content.impact.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-100 dark:border-gray-700 shadow-xl text-center hover:-translate-y-2 transition-all duration-300"
                    >
                      <div className="w-16 h-16 rounded-full bg-[#4b0102]/10 flex items-center justify-center mx-auto mb-4 text-[#4b0102]">
                        <item.icon className="w-8 h-8" />
                      </div>
                      <p className="text-4xl font-black text-[#4b0102] mb-2">{item.stat}</p>
                      <p className="text-base font-bold text-[#5b6461] dark:text-white/70">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-white to-[#fdf8f3] dark:from-gray-800 dark:to-gray-900 rounded-lg p-8 border border-gray-100 dark:border-gray-700 shadow-xl">
                <h3 className="text-2xl font-black text-[#191d1c] dark:text-white mb-8">
                  {content.whyDonate}
                </h3>
                <div className="grid gap-6 sm:grid-cols-2">
                  {content.reasons.map((reason, index) => (
                    <div
                      key={index}
                      className="bg-white dark:bg-gray-900 rounded-[1.5rem] p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#4b0102]/10 flex items-center justify-center text-[#4b0102] shrink-0">
                          <reason.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-[#191d1c] dark:text-white mb-2">
                            {reason.title}
                          </h4>
                          <p className="text-base text-[#5b6461] dark:text-white/70 leading-relaxed">
                            {reason.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                {content.testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-100 dark:border-gray-700 shadow-xl"
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 rounded-full bg-[#4b0102] flex items-center justify-center text-white font-black text-xl shrink-0">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-[#191d1c] dark:text-white">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-[#5b6461] dark:text-white/70">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <p className="text-lg italic text-[#191d1c] dark:text-white leading-relaxed border-l-4 border-[#4b0102] pl-6">
                      "{testimonial.quote}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side - Sticky Donation Box */}
            <div className="lg:sticky lg:top-24">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-100 dark:border-gray-700 shadow-2xl">
                <div className="mb-6 flex gap-2 bg-gray-100 dark:bg-gray-700 p-1 rounded-full">
                  <button
                    onClick={() => setDonationType("one-time")}
                    className={`flex-1 py-2 px-4 rounded-full font-bold text-sm transition-all ${donationType === "one-time"
                      ? "bg-[#4b0102] text-white shadow-lg"
                      : "text-[#5b6461] dark:text-white/70 hover:text-[#191d1c] dark:hover:text-white"
                      }`}
                  >
                    {content.oneTime}
                  </button>
                  <button
                    onClick={() => setDonationType("monthly")}
                    className={`flex-1 py-2 px-4 rounded-full font-bold text-sm transition-all ${donationType === "monthly"
                      ? "bg-[#4b0102] text-white shadow-lg"
                      : "text-[#5b6461] dark:text-white/70 hover:text-[#191d1c] dark:hover:text-white"
                      }`}
                  >
                    {content.monthly}
                  </button>
                </div>

                <h3 className="text-2xl font-black text-[#191d1c] dark:text-white mb-6">
                  {donationType === "one-time" ? content.oneTime : content.monthly}
                </h3>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  {content.amounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => {
                        setSelectedAmount(amount);
                        setCustomAmount("");
                      }}
                      className={`py-3 px-4 rounded-xl border font-bold text-lg transition-all duration-200 ${selectedAmount === amount
                        ? "border-[#4b0102] bg-[#4b0102] text-white shadow-lg scale-105"
                        : "border-gray-200 dark:border-gray-600 text-[#191d1c] dark:text-white hover:border-[#4b0102] hover:bg-[#4b0102]/5 dark:hover:bg-[#4b0102]/10"
                        }`}
                    >
                      €{amount}
                    </button>
                  ))}
                </div>

                <div className="mb-6">
                  <input
                    type="number"
                    placeholder={language === "bn" ? "নির্দিষ্ট পরিমাণ" : "Custom amount"}
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(null);
                    }}
                    className="w-full px-4 py-4 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-[#191d1c] dark:text-white text-lg focus:border-[#4b0102] focus:ring-2 focus:ring-[#4b0102]/20 outline-none"
                  />
                </div>

                <div className="mb-6 space-y-4">
                  <input
                    type="text"
                    placeholder={language === "bn" ? "আপনার নাম" : "Your name"}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-[#191d1c] dark:text-white focus:border-[#4b0102] focus:ring-2 focus:ring-[#4b0102]/20 outline-none"
                  />
                  <input
                    type="email"
                    placeholder={language === "bn" ? "ইমেল ঠিকানা" : "Email address"}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-[#191d1c] dark:text-white focus:border-[#4b0102] focus:ring-2 focus:ring-[#4b0102]/20 outline-none"
                  />
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                    <p className="text-sm font-bold text-[#5b6461] dark:text-white/70 mb-3">
                      {language === "bn" ? "কার্ড তথ্য" : "Card Details"}
                    </p>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-[#191d1c] dark:text-white mb-3"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-[#191d1c] dark:text-white"
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-[#191d1c] dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                <button className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-[#4b0102] text-white font-black text-lg hover:bg-[#3a0101] transition-all hover:scale-105 shadow-xl mb-6">
                  {content.donateNow}
                  <FiArrowRight />
                </button>

                <div className="flex items-start gap-3 text-sm text-[#5b6461] dark:text-white/70 border-t border-gray-100 dark:border-gray-700 pt-4">
                  <FiShield className="w-6 h-6 text-[#4b0102] shrink-0" />
                  <div>
                    <p className="font-bold text-[#4b0102]">{content.secure}</p>
                    <p className="text-sm mt-1">{content.secureText}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
