"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import en from "@/app/i18n/en.json";
import hi from "@/app/i18n/hi.json";
import mr from "@/app/i18n/mr.json";
import ur from "@/app/i18n/ur.json";

export type Language = "en" | "hi" | "mr" | "ur";

export const LANGUAGES: { code: Language; label: string; nativeLabel: string; dir: "ltr" | "rtl" }[] = [
  { code: "en", label: "English",  nativeLabel: "English",  dir: "ltr" },
  { code: "hi", label: "Hindi",    nativeLabel: "हिंदी",    dir: "ltr" },
  { code: "mr", label: "Marathi",  nativeLabel: "मराठी",   dir: "ltr" },
  { code: "ur", label: "Urdu",     nativeLabel: "اردو",    dir: "rtl" },
];

const TRANSLATIONS: Record<Language, typeof en> = { en, hi: hi as any, mr: mr as any, ur: ur as any };

const SESSION_KEY = "noir_language";

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof en;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextValue>({
  language: "en",
  setLanguage: () => {},
  t: en,
  dir: "ltr",
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  // Hydrate from sessionStorage on mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_KEY) as Language | null;
      if (saved && TRANSLATIONS[saved]) {
        setLanguageState(saved);
      }
    } catch {}
  }, []);

  const setLanguage = (lang: Language) => {
    try { sessionStorage.setItem(SESSION_KEY, lang); } catch {}
    setLanguageState(lang);
  };

  const currentLang = LANGUAGES.find((l) => l.code === language)!;

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: TRANSLATIONS[language],
        dir: currentLang.dir,
      }}
    >
      <div dir={currentLang.dir} lang={language}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
