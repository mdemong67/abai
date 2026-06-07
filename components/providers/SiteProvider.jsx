"use client";

import { createContext, useContext, useEffect, useState } from "react";

const SiteContext = createContext(null);

export function SiteProvider({ children }) {
  const [language, setLanguage] = useState("en");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const savedLang = window.localStorage.getItem("abai-lang");
    if (savedLang === "bn" || savedLang === "en") setLanguage(savedLang);

    const savedTheme = window.localStorage.getItem("abai-theme");
    if (savedTheme) {
      setDark(savedTheme === "dark");
      return;
    }
    setDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    window.localStorage.setItem("abai-theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    window.localStorage.setItem("abai-lang", language);
    document.documentElement.classList.toggle("font-arimo", language === "en");
  }, [language]);

  useEffect(() => {
    // Apply font check on initial load
    document.documentElement.classList.toggle("font-arimo", language === "en");
  }, []);

  const toggleLanguage = () => setLanguage((l) => (l === "en" ? "bn" : "en"));

  return (
    <SiteContext.Provider
      value={{ language, setLanguage, toggleLanguage, dark, setDark }}
    >
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within SiteProvider");
  return ctx;
}
