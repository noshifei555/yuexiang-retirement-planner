"use client";

import React from "react";

type Props = {
  currentLang: "zh" | "en";
  onLangChange: (lang: "zh" | "en") => void;
};

export default function LanguageSwitch({ currentLang, onLangChange }: Props) {
  return (
    <div className="flex items-center rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
      <button
        className={[
          "px-3 py-2 text-sm font-semibold rounded-xl",
          currentLang === "zh" ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100",
        ].join(" ")}
        onClick={() => onLangChange("zh")}
        type="button"
      >
        中文
      </button>
      <button
        className={[
          "px-3 py-2 text-sm font-semibold rounded-xl",
          currentLang === "en" ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100",
        ].join(" ")}
        onClick={() => onLangChange("en")}
        type="button"
      >
        EN
      </button>
    </div>
  );
}
