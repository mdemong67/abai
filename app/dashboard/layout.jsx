"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/components/providers/AuthProvider";
import { useSite } from "@/components/providers/SiteProvider";
import { nav } from "@/lib/site-content";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FiActivity,
  FiBook,
  FiCalendar,
  FiChevronDown,
  FiDollarSign,
  FiFileText,
  FiGlobe,
  FiHome,
  FiImage,
  FiLogOut,
  FiMenu,
  FiMoon,
  FiSettings,
  FiSun,
  FiUser,
  FiUsers,
  FiX
} from "react-icons/fi";

const SIDEBAR_ITEMS = {
  admin: [
    { label: "Dashboard", href: "/dashboard", icon: FiHome },
    {
      label: "About",
      icon: FiBook,
      subItems: [
        { label: "About Us", href: "/dashboard/about/about-us", icon: FiFileText },
        { label: "Constitution", href: "/dashboard/about/constitution", icon: FiFileText },
        { label: "President's Statement", href: "/dashboard/about/president-statement", icon: FiUser },
        { label: "Executive Committee", href: "/dashboard/about/executive-committee", icon: FiUsers },
      ],
    },
    { label: "Members", href: "/dashboard/users", icon: FiUsers },
    { label: "Events", href: "/dashboard/events", icon: FiCalendar },
    { label: "News", href: "/dashboard/news", icon: FiFileText },
    { label: "Blog", href: "/dashboard/blog", icon: FiImage },
    { label: "Portfolio", href: "/dashboard/portfolio", icon: FiImage },
    { label: "Donation History", href: "/dashboard/donations", icon: FiDollarSign },
    { label: "Audit Logs", href: "/dashboard/audit-logs", icon: FiActivity },
    { label: "Profile", href: "/dashboard/profile", icon: FiUser },
    { label: "Site Settings", href: "/dashboard/settings", icon: FiSettings },
  ],
  moderator: [
    { label: "Dashboard", href: "/dashboard", icon: FiHome },
    { label: "Events", href: "/dashboard/events", icon: FiCalendar },
    { label: "News", href: "/dashboard/news", icon: FiFileText },
    { label: "Blog", href: "/dashboard/blog", icon: FiImage },
    { label: "Portfolio", href: "/dashboard/portfolio", icon: FiImage },
    { label: "Profile", href: "/dashboard/profile", icon: FiUser },
  ],
  member: [
    { label: "Dashboard", href: "/dashboard", icon: FiHome },
    { label: "My Events", href: "/dashboard/my-events", icon: FiCalendar },
    { label: "Blog", href: "/dashboard/blog", icon: FiImage },
    { label: "Profile", href: "/dashboard/profile", icon: FiUser },
  ],
};

function NestedNavItem({ item, sidebarOpen, setSidebarOpen }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-2xl text-gray-700 dark:text-gray-300 hover:bg-[#4b0102]/5 dark:hover:bg-gray-700 hover:text-[#4b0102] dark:hover:text-white group transition-all duration-200"
      >
        <div className="flex items-center gap-3">
          <item.icon className="w-5 h-5" />
          <span className="font-medium">{item.label}</span>
        </div>
        <FiChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <ul className="ml-4 mt-2 space-y-1 pl-3 border-l border-gray-100 dark:border-gray-700">
          {item.subItems.map((subItem, subIndex) => (
            <li key={subIndex}>
              <Link
                href={subItem.href}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm text-gray-600 dark:text-gray-400 hover:bg-[#4b0102]/5 dark:hover:bg-gray-700 hover:text-[#4b0102] dark:hover:text-white group transition-all duration-200"
              >
                <subItem.icon className="w-4 h-4" />
                <span className="font-medium">{subItem.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function DashboardLayout({ children }) {
  const { user, signOut } = useAuth();
  const { language, toggleLanguage, dark, setDark } = useSite();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navItems = SIDEBAR_ITEMS[user?.role || "member"];

  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#4b0102]/5 dark:bg-gray-900">
        {/* Mobile sidebar toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed top-4 left-4 z-50 lg:hidden flex items-center justify-center w-12 h-12 rounded-2xl bg-white dark:bg-gray-800 shadow-xl"
        >
          {sidebarOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Sidebar */}
        <aside
          className={cn(
            "fixed top-0 left-0 z-40 w-72 h-screen transition-transform duration-300 ease-in-out flex flex-col",
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          )}
        >
          <div className="flex flex-col h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
            {/* Logo Section */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
              <Link href="/" className="flex items-center gap-3">
                <Image src="/images/abai-logo.png" alt="ABAI Logo" width={56} height={56} className="w-16 h-16 sm:w-22 sm:h-22 rounded-full object-cover" priority />
                <div>
                  <p className="font-bold text-md sm:text-md text-[#4b0102] dark:text-white">
                    All Bangladeshi Association of Ireland (ABAI)
                  </p>
                </div>
              </Link>
            </div>


            {/* Navigation Items */}
            <div className="flex-1 overflow-y-auto p-4">
              <ul className="space-y-2">
                {navItems.map((item, index) => (
                  <li key={index}>
                    {item.subItems ? (
                      <NestedNavItem
                        item={item}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                      />
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-[#4b0102]/5 dark:hover:bg-gray-700 hover:text-[#4b0102] dark:hover:text-white group transition-all duration-200"
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>




            {/* User Info */}
            <div className="hidden px-6 py-5 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover shadow-lg"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4b0102] to-[#6b1c23] flex items-center justify-center text-white font-black text-lg shadow-lg">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                )}
                <div className="flex-1">
                  <p className="font-bold text-gray-900 dark:text-white">
                    {user?.name}
                  </p>
                  <p className="text-xs text-[#4b0102] font-black uppercase">
                    {user?.role}
                  </p>
                </div>
              </div>
            </div>

            {/* Sign Out Button - Fixed at Bottom */}
            <div className="p-6 border-t border-gray-100 dark:border-gray-700">
              <button
                onClick={handleSignOut}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-[#4b0102]/20 bg-[#4b0102] text-white font-bold transition-all duration-200"
              >
                <FiLogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="lg:ml-72">
          {/* Dashboard Header */}
          <header className="sticky top-0 z-30 h-20 px-6 flex items-center justify-between bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="flex-1"></div>
            <div className="flex items-center gap-4">
              {/* Language Switcher */}
              <button
                type="button"
                onClick={toggleLanguage}
                className="inline-flex h-9 items-center gap-2 rounded-xl px-3 text-xs font-bold text-gray-600 dark:text-gray-300 hover:text-[#4b0102] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-gray-700/60 transition-colors cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
                aria-label="Toggle language"
              >
                <FiGlobe className="w-4 h-4 text-[#4b0102] dark:text-[#9fc3ff]" />
                <span>{nav[language].langLabel}</span>
              </button>

              {/* Theme Switcher */}
              <button
                type="button"
                onClick={() => setDark(!dark)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-gray-600 dark:text-gray-300 hover:text-[#4b0102] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-gray-700/60 transition-colors cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
                aria-label="Toggle dark mode"
              >
                {dark ? <FiSun className="w-4 h-4 text-amber-500" /> : <FiMoon className="w-4 h-4 text-indigo-500" />}
              </button>

              {/* User Dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setUserMenuOpen(true)}
                onMouseLeave={() => setUserMenuOpen(false)}
              >
                <div className="flex items-center gap-3 px-3 py-2 rounded-2xl transition-all duration-200 cursor-pointer">
                  {/* User Info (left of avatar) */}
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {user?.email}
                    </p>
                  </div>
                  {/* Avatar */}
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover shadow-lg"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4b0102] to-[#6b1c23] flex items-center justify-center text-white font-bold shadow-lg">
                      {user?.name?.charAt(0) || "U"}
                    </div>
                  )}
                </div>

                {/* User Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
                    <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                      <p className="font-bold text-gray-900 dark:text-white">
                        {user?.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user?.email}
                      </p>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 px-4 py-3 text-left text-[#4b0102] hover:bg-[#4b0102]/5 transition-all duration-200"
                    >
                      <FiLogOut className="w-4 h-4" />
                      <span className="font-bold">Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="p-3 lg:p-5">
            {children}
          </main>
        </div>

        {/* Overlay for mobile */}
        {
          sidebarOpen && (
            <div
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-30 bg-black/50 lg:hidden"
            />
          )
        }
      </div >
    </ProtectedRoute >
  );
}
