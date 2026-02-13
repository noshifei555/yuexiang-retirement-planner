"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import zh from "../i18n/zh.json";
import en from "../i18n/en.json";
import { storageGet, storageSet } from "./storage";

export type Lang = "zh" | "en";
type Dict = Record<string, string>;

const DICTS: Record<Lang, Dict> = { zh, en };

export function getDict(lang: Lang): Dict {
  return DICTS[lang] ?? DICTS.zh;
}

export function t(lang: Lang, key: string): string {
  const dict = getDict(lang);
  return dict[key] ?? key;
}

type I18nContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = storageGet("lang");
    return saved === "zh" || saved === "en" ? saved : "zh";
  });

  const setLang = (next: Lang) => {
    setLangState(next);
    storageSet("lang", next);
  };

  const value = useMemo<I18nContextValue>(
    () => ({
      lang,
      setLang,
      t: (key: string) => t(lang, key),
    }),
    [lang]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within <I18nProvider>");
  }
  return ctx;
}
