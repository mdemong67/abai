"use client";

import { useSite } from "@/components/providers/SiteProvider";
import { contact, home, nav } from "@/lib/site-content";
import Image from "next/image";
import Link from "next/link";

export default function SiteFooter() {
  const { language } = useSite();
  const n = nav[language];
  const h = home[language];
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/10 bg-[#4b0102] px-4 pt-12 pb-6 sm:px-6">
      <div className="mycontainer mx-auto ">
        <div className="w-full flex justify-center mb-16">
          <div className="flex flex-col items-center gap-3">
            <div className="bg-white rounded-full p-1">
              <Image
                src="/images/abai-logo.png"
                alt="ABAI"
                width={70}
                height={70}
                className="h-36 w-36 lg:h-48 lg:w-48 rounded-full object-cover"
              />
            </div>
            <div>
              <p className="text-2xl lg:text-4xl font-medium text-center text-[#c89675] dark:text-white/60">
                All Bangladeshi Association of Ireland (ABAI)
              </p>
            </div>
          </div>
        </div>

        <div className="hidden grid gap-8 sm:gap-10 sm:grid-cols-2 lg:grid-cols-4">

          <div>
            <p className="text-lg sm:text-xl lg:text-2xl font-semibold uppercase text-[#c89675]">{n.about}</p>
            <ul className="mt-3 space-y-2">
              {n.aboutItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-base sm:text-lg font-medium text-[#fcfcf6]/50 hover:text-[#fcfcf6]/80 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-lg sm:text-xl lg:text-2xl font-semibold uppercase text-[#c89675]">{n.services}</p>
            <ul className="mt-3 space-y-2">
              {n.servicesItems.slice(0, 4).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-base sm:text-lg font-medium text-[#fcfcf6]/50 hover:text-[#fcfcf6]/80 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>


          <div>
            <p className="text-lg sm:text-xl lg:text-2xl font-semibold uppercase text-[#c89675]">{n.services}</p>
            <ul className="mt-3 space-y-2">
              {n.servicesItems.slice(0, 4).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-base sm:text-lg font-medium text-[#fcfcf6]/50 hover:text-[#fcfcf6]/80 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-lg sm:text-xl lg:text-2xl font-semibold uppercase text-[#c89675]">{n.contact}</p>
            <ul className="mt-3 space-y-2 text-base sm:text-lg font-medium text-[#fcfcf6]/50 dark:text-white/70">
              <li>
                <a href={`mailto:${contact.email}`} className="hover:text-[#fcfcf6]/80 transition-colors">
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="hover:text-[#fcfcf6]/80 transition-colors">
                  {contact.phone}
                </a>
              </li>
              <li className="text-base sm:text-lg leading-5">{contact.address}</li>
              <li className="text-base sm:text-lg">Company Reg. {contact.companyReg}</li>
            </ul>
          </div>


        </div>


      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-[#fcfcf6]/20 pt-6 text-md font-normal text-center text-[#fcfcf6]/30">
        <p>© {year} All Bangladeshi Association of Ireland (ABAI)</p>
      </div>
    </footer>
  );
}
