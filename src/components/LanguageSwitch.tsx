import React from "react";

type Lang = "zh" | "en";

type Props = {
  currentLang: Lang;
  onLangChange: (lang: Lang) => void;
};

export default function LanguageSwitch({ currentLang, onLangChange }: Props) {
  const languages: { code: Lang; label: string }[] = [
    { code: "zh", label: "中文" },
    { code: "en", label: "EN" },
  ];

  return (
    <div className="flex items-center gap-2">
      {languages.map((l) => (
        <button
          key={l.code}
          onClick={() => onLangChange(l.code)}
          className={`rounded-lg px-3 py-1.5 text-sm ${
            currentLang === l.code
              ? "bg-black text-white"
              : "border border-neutral-200 bg-white text-neutral-900"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
