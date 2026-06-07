"use client";

import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

export default function PageShell({ children, headerTransparent = false, flushTop = false }) {
  return (
    <div className="min-h-screen bg-[#fbfaf7] text-[#151515] transition-colors duration-300 dark:bg-[#070a12] dark:text-white">
      <SiteHeader transparent={headerTransparent} />
      <div className={flushTop ? "" : "pt-24"}>{children}</div>
      <SiteFooter />
    </div>
  );
}
