"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitch from "./LanguageSwitch";
import ModeSwitch from "./ModeSwitch";
import { useI18n } from "../lib/i18n";
import { useMode } from "../lib/mode";

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      className={[
        "rounded-xl px-3 py-2 text-sm font-medium",
        active ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100",
      ].join(" ")}
    >
      {label}
    </Link>
  );
}

export default function Header() {
  const { lang, setLang } = useI18n();
const { mode, setMode } = useMode();

const toggleMode = () => setMode(mode === "senior" ? "planner" : "senior");

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="container-app flex items-center justify-between gap-3 py-3">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-2xl bg-blue-600" />
            <div className="leading-tight">
              <div className="text-sm font-semibold">粤享养老</div>
              <div className="text-xs text-slate-500">
                {mode === "senior" ? "关怀模式" : "规划模式"} · {lang.toUpperCase()}
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1 ml-4">
            <NavLink href="/" label={lang === "zh" ? "首页" : "Home"} />
            <NavLink href="/calc" label={lang === "zh" ? "测算" : "Calc"} />
            <NavLink href="/policy" label={lang === "zh" ? "政策" : "Policy"} />
            <NavLink href="/shop" label={lang === "zh" ? "养老品" : "Shop"} />
            <NavLink href="/about" label={lang === "zh" ? "合规" : "Compliance"} />
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitch currentLang={lang} onLangChange={setLang} />
          <ModeSwitch currentMode={mode} toggleMode={toggleMode} />
        </div>
      </div>
    </header>
  );
}
