"use client";

import ContactForm from "@/components/layout/ContactForm";
import PageShell from "@/components/layout/PageShell";
import { useSite } from "@/components/providers/SiteProvider";
import { contact, home } from "@/lib/site-content";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";

export default function ContactPage() {
  const { language } = useSite();
  const t = home[language];

  return (
    <PageShell>
      <section id="contact" className="px-4 py-8 sm:px-6 lg:py-14">
        <div className="mx-auto mycontainer">
          <div className="grid border border-blue-900 gap-8 rounded-[2rem] bg-[#4b0102] p-5 text-white sm:p-8 lg:grid-cols-[0.85fr_1.15fr] lg:p-10">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black">{t.contactTitle}</h2>
              <p className="text-base sm:text-lg font-medium leading-7 sm:leading-8 text-white/78 mt-4 mb-8">
                {t.contactText}
              </p>
              <div className="space-y-6">
                <a href={`mailto:${contact.email}`} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <FiMail className="w-6 h-6" />
                  </div>
                  <span className="text-base sm:text-lg font-bold">{contact.email}</span>
                </a>
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <FiPhone className="w-6 h-6" />
                  </div>
                  <span className="text-base sm:text-lg font-bold">{contact.phone}</span>
                </a>
                <a
                  href={`tel:${contact.phoneAlt.replace(/\s/g, "")}`}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <FiPhone className="w-6 h-6" />
                  </div>
                  <span className="text-base sm:text-lg font-bold">{contact.phoneAlt}</span>
                </a>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <FiMapPin className="w-6 h-6" />
                  </div>
                  <span className="text-base sm:text-lg font-bold leading-7">{contact.address}</span>
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
