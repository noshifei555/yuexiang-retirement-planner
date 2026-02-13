"use client";

import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useMode } from "../lib/mode";
import { useI18n } from "../lib/i18n";

export default function Home() {
  const router = useRouter();
  const { setMode } = useMode();
  const { t } = useI18n();

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-6">
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">{t("appName")}</h1>
        <p className="mt-2 text-sm text-neutral-600">{t("disclaimer")}</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button
            className="rounded-xl bg-black px-4 py-3 text-base font-medium text-white active:scale-[0.99]"
            onClick={() => {
              setMode("senior");
              router.push("/calc");
            }}
          >
            {t("modeSenior")}
          </button>

          <button
            className="rounded-xl border border-neutral-200 bg-white px-4 py-3 text-base font-medium text-neutral-900 active:scale-[0.99]"
            onClick={() => {
              setMode("planner");
              router.push("/calc");
            }}
          >
            {t("modePlanner")}
          </button>
        </div>
      </section>
    </main>
  );
}
