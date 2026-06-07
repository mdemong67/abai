"use client";

import { useAuth } from "@/components/providers/AuthProvider";
import { useSite } from "@/components/providers/SiteProvider";
import { nav } from "@/lib/site-content";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiGlobe, FiMenu, FiMoon, FiSun, FiUser, FiX } from "react-icons/fi";
import NavDropdown from "./NavDropdown";

export default function SiteHeader({ transparent = false }) {
  const { language, toggleLanguage, dark, setDark } = useSite();
  const { user } = useAuth();
  const t = nav[language];
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";
  const useTransparent = transparent && isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 150);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const linkClass = useTransparent
    ? "text-white hover:bg-white/12"
    : "text-[#303433] hover:bg-[#eef5f1] dark:text-white/80 dark:hover:bg-white/10";

  const iconClass = useTransparent
    ? "text-white hover:bg-white/12"
    : "text-[#4b0102] hover:bg-[#eef5f1] dark:text-[#9fc3ff] dark:hover:bg-white/10";

  return (
    <motion.header
      initial={false}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${useTransparent
          ? "bg-transparent"
          : "bg-white shadow-[0_10px_35px_rgba(15,23,42,0.10)] dark:bg-[#07111f]"
        }`}
    >
      <nav
        className="flex h-24 items-center justify-between px-4 sm:px-6"
        aria-label="Primary navigation"
      >
        <div className="flex min-w-0 items-center gap-4 lg:gap-6">
          <Link href="/" className="flex min-w-0 items-center gap-2">
            <Image
              src="/images/abai-logo.png"
              alt="ABAI logo"
              width={50}
              height={50}
              priority
              className="h-16 w-16 rounded-full object-cover sm:h-20 sm:w-20"
            />
            <span
              className={`hidden text-sm font-black sm:hidden ${useTransparent ? "text-white" : "text-[#6c151c] dark:text-[#f6d1a6]"
                }`}
            >
              ABAI
            </span>
          </Link>

          <div className="hidden items-center gap-0.5 lg:flex">
            <Link
              href="/"
              className={`rounded-full px-4 py-2 text-sm font-medium ${linkClass}`}
            >
              {t.home}
            </Link>
            <NavDropdown
              label={t.about}
              items={t.aboutItems}
              scrolled={!useTransparent}
            />
            <NavDropdown
              label={t.services}
              items={t.servicesItems}
              scrolled={!useTransparent}
            />
            <Link
              href="/events/upcoming"
              className={`rounded-full px-4 py-2 text-sm font-medium ${linkClass}`}
            >
              {t.events}
            </Link>
            <Link
              href="/portfolio"
              className={`rounded-full px-4 py-2 text-sm font-medium ${linkClass}`}
            >
              {t.portfolio}
            </Link>
            <Link
              href="/contact"
              className={`rounded-full px-4 py-2 text-sm font-medium ${linkClass}`}
            >
              {t.contact}
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={toggleLanguage}
            className={`inline-flex h-10 items-center gap-2 rounded-full px-3 text-sm font-medium ${iconClass}`}
            aria-label="Toggle language"
          >
            <FiGlobe aria-hidden="true" />
            <span>{t.langLabel}</span>
          </button>
          <button
            type="button"
            onClick={() => setDark(!dark)}
            className={`grid h-10 w-10 place-items-center rounded-full ${iconClass}`}
            aria-label="Toggle dark mode"
          >
            {dark ? <FiSun /> : <FiMoon />}
          </button>
          {user ? (
            <>
              <Link
                href="/dashboard"
                className={`hidden rounded-full px-4 py-2 text-sm font-medium sm:inline-flex ${linkClass}`}
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard"
                className={`grid h-10 w-10 place-items-center rounded-full ${iconClass}`}
              >
                <FiUser />
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className={`hidden rounded-full px-4 py-2 text-sm font-medium sm:inline-flex ${linkClass}`}
              >
                {t.signIn}
              </Link>
              <Link
                href="/donate"
                className="hidden rounded-full bg-[#4b0102] px-5 py-2.5 text-sm font-medium text-white shadow-[0_12px_30px_rgba(75,1,2,0.28)] hover:bg-[#3a0101] sm:inline-flex"
              >
                {t.donate}
              </Link>
            </>
          )}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className={`grid h-10 w-10 place-items-center rounded-full lg:hidden ${iconClass}`}
            aria-expanded={open}
            aria-label="Open menu"
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-4 mb-3 max-h-[80vh] overflow-y-auto rounded-[1.35rem] border border-black/10 bg-white/95 p-3 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-[#0b1224]/95 lg:hidden"
          >
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="block rounded-2xl px-4 py-3 text-sm font-bold text-[#202423] hover:bg-[#eef5f1] dark:text-white dark:hover:bg-white/10"
            >
              {t.home}
            </Link>
            <p className="px-4 pt-2 text-xs font-black uppercase text-[#4b0102]">{t.about}</p>
            {t.aboutItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-2.5 pl-6 text-sm font-semibold text-[#202423] hover:bg-[#eef5f1] dark:text-white dark:hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
            <p className="px-4 pt-3 text-xs font-black uppercase text-[#4b0102]">{t.services}</p>
            {t.servicesItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-2.5 pl-6 text-sm font-semibold text-[#202423] hover:bg-[#eef5f1] dark:text-white dark:hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/portfolio"
              onClick={() => setOpen(false)}
              className="block rounded-2xl px-4 py-3 text-sm font-bold text-[#202423] hover:bg-[#eef5f1] dark:text-white dark:hover:bg-white/10"
            >
              {t.portfolio}
            </Link>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="block rounded-2xl px-4 py-3 text-sm font-bold text-[#202423] hover:bg-[#eef5f1] dark:text-white dark:hover:bg-white/10"
            >
              {t.contact}
            </Link>
            <div className="mt-2 flex gap-2 border-t border-black/10 px-2 pt-3 dark:border-white/10">
              {user ? (
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-full bg-[#4b0102] py-3 text-center text-sm font-black text-white"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    onClick={() => setOpen(false)}
                    className="flex-1 rounded-full border border-[#4b0102] py-3 text-center text-sm font-black text-[#4b0102]"
                  >
                    {t.signIn}
                  </Link>
                  <Link
                    href="/donate"
                    onClick={() => setOpen(false)}
                    className="flex-1 rounded-full bg-[#4b0102] py-3 text-center text-sm font-black text-white"
                  >
                    {t.donate}
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
