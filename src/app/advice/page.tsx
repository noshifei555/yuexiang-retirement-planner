"use client";

import { useMemo, useState } from "react";
import { useMode } from "../../lib/mode";
import { useI18n } from "../../lib/i18n";
import { calc, type CalcInput } from "../../lib/calcEngine";

function n(v: string) {
  const x = Number(v);
  return Number.isFinite(x) ? x : 0;
}

function fmtMoney(x: number) {
  if (!Number.isFinite(x)) return "-";
  return Math.round(x).toLocaleString("zh-CN");
}

export default function CalcPage() {
  const { mode } = useMode();
  const { lang, t } = useI18n();

  const defaults = useMemo(() => {
    if (mode === "senior") {
      return {
        currentAge: 55,
        retireAge: 60,
        monthlyIncome: 6000,
        monthlyExpenseNow: 4500,
        savingsNow: 200000,
        expectedReturn: 3,
        inflation: 2,
        lifeExpectancy: 85,
        pensionMonthly: 3500,
      };
    }
    return {
      currentAge: 25,
      retireAge: 60,
      monthlyIncome: 12000,
      monthlyExpenseNow: 6000,
      savingsNow: 50000,
      expectedReturn: 6,
      inflation: 2,
      lifeExpectancy: 85,
      pensionMonthly: 4500,
    };
  }, [mode]);

  const [form, setForm] = useState(() => ({ ...defaults }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemo(() => setForm({ ...defaults }), [defaults]);

  const input: CalcInput = {
    mode,
    lang: lang as any,
    currentAge: form.currentAge,
    retireAge: form.retireAge,
    monthlyIncome: form.monthlyIncome,
    monthlyExpenseNow: form.monthlyExpenseNow,
    savingsNow: form.savingsNow,
    expectedReturn: form.expectedReturn,
    inflation: form.inflation,
    lifeExpectancy: form.lifeExpectancy,
    pensionMonthly: form.pensionMonthly,
  };

  const result = useMemo(() => calc(input), [input]);

  const title =
    mode === "senior"
      ? lang === "zh"
        ? "关怀测算"
        : "Senior Calculator"
      : lang === "zh"
      ? "规划测算"
      : "Planner Calculator";

  const subtitle =
    lang === "zh"
      ? mode === "senior"
        ? "更大字号、更少干扰，给爸妈也能看懂的版本。"
        : "面向年轻人：更注重缺口与目标的可执行性。"
      : mode === "senior"
      ? "Bigger, simpler and calmer."
      : "For planners: focus on gap and actions.";

  const shareUrl = useMemo(() => {
    const u = new URL(typeof window === "undefined" ? "https://example.com/calc" : window.location.href);
    u.pathname = "/calc";
    u.searchParams.set("a", String(form.currentAge));
    u.searchParams.set("r", String(form.retireAge));
    u.searchParams.set("e", String(form.monthlyExpenseNow));
    u.searchParams.set("s", String(form.savingsNow));
    u.searchParams.set("p", String(form.pensionMonthly));
    u.searchParams.set("ir", String(form.expectedReturn));
    u.searchParams.set("inf", String(form.inflation));
    u.searchParams.set("life", String(form.lifeExpectancy));
    return u.toString();
  }, [form]);

  async function copyShare() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert(lang === "zh" ? "已复制分享链接" : "Share link copied");
    } catch {
      prompt(lang === "zh" ? "复制这个链接" : "Copy this link", shareUrl);
    }
  }

  return (
    <main className="container-app py-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="inline-flex items-center gap-2">
            <span className="kbd">{mode === "senior" ? (lang === "zh" ? "关怀模式" : "Senior") : lang === "zh" ? "规划模式" : "Planner"}</span>
            <span className="kbd">{lang.toUpperCase()}</span>
          </div>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={copyShare} className="btn btn-primary" type="button">
            {lang === "zh" ? "复制分享链接" : "Copy Share Link"}
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <section className="card p-5">
          <h2 className="text-base font-semibold">{lang === "zh" ? "输入信息" : "Inputs"}</h2>
          <p className="mt-1 text-xs text-slate-500">
            {lang === "zh"
              ? "简化版测算：先跑通体验，下一步接入四城政策口径与完整公式。"
              : "Simplified model for now. Next: plug in city-policy formulas."}
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Field label={lang === "zh" ? "当前年龄" : "Current age"}>
              <input className="input" value={form.currentAge} onChange={(e) => setForm((f) => ({ ...f, currentAge: n(e.target.value) }))} inputMode="numeric" />
            </Field>

            <Field label={lang === "zh" ? "退休年龄" : "Retire age"}>
              <input className="input" value={form.retireAge} onChange={(e) => setForm((f) => ({ ...f, retireAge: n(e.target.value) }))} inputMode="numeric" />
            </Field>

            <Field label={lang === "zh" ? "当前月支出（元）" : "Monthly expense now"}>
              <input className="input" value={form.monthlyExpenseNow} onChange={(e) => setForm((f) => ({ ...f, monthlyExpenseNow: n(e.target.value) }))} inputMode="numeric" />
            </Field>

            <Field label={lang === "zh" ? "当前养老存款（元）" : "Savings for retirement"}>
              <input className="input" value={form.savingsNow} onChange={(e) => setForm((f) => ({ ...f, savingsNow: n(e.target.value) }))} inputMode="numeric" />
            </Field>

            <Field label={lang === "zh" ? "预计月养老金（元）" : "Expected pension/month"}>
              <input className="input" value={form.pensionMonthly} onChange={(e) => setForm((f) => ({ ...f, pensionMonthly: n(e.target.value) }))} inputMode="numeric" />
            </Field>

            <Field label={lang === "zh" ? "预计寿命" : "Life expectancy"}>
              <input className="input" value={form.lifeExpectancy} onChange={(e) => setForm((f) => ({ ...f, lifeExpectancy: n(e.target.value) }))} inputMode="numeric" />
            </Field>

            <Field label={lang === "zh" ? "退休前年化收益（%）" : "Annual return (%)"}>
              <input className="input" value={form.expectedReturn} onChange={(e) => setForm((f) => ({ ...f, expectedReturn: n(e.target.value) }))} inputMode="decimal" />
            </Field>

            <Field label={lang === "zh" ? "通胀（%）" : "Inflation (%)"}>
              <input className="input" value={form.inflation} onChange={(e) => setForm((f) => ({ ...f, inflation: n(e.target.value) }))} inputMode="decimal" />
            </Field>
          </div>
        </section>

        <section className="card p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">{lang === "zh" ? "结果" : "Results"}</h2>
            <span
              className={[
                "rounded-full px-3 py-1 text-xs font-semibold",
                result.feasibility === "good"
                  ? "bg-emerald-100 text-emerald-800"
                  : result.feasibility === "ok"
                  ? "bg-amber-100 text-amber-800"
                  : "bg-rose-100 text-rose-800",
              ].join(" ")}
            >
              {result.feasibility === "good"
                ? lang === "zh"
                  ? "较稳"
                  : "Good"
                : result.feasibility === "ok"
                ? lang === "zh"
                  ? "需要补充"
                  : "Improve"
                : lang === "zh"
                ? "风险偏高"
                : "High Risk"}
            </span>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Stat label={lang === "zh" ? "距离退休（年）" : "Years to retire"} value={String(result.yearsToRetire)} />
            <Stat label={lang === "zh" ? "退休后年数" : "Years in retirement"} value={String(result.yearsInRetirement)} />
            <Stat label={lang === "zh" ? "退休时月支出（估算）" : "Expense at retire"} value={`¥ ${fmtMoney(result.expenseAtRetireMonthly)}`} />
            <Stat label={lang === "zh" ? "退休时月收入（养老金）" : "Income (pension)"} value={`¥ ${fmtMoney(result.incomeAtRetireMonthly)}`} />
            <Stat label={lang === "zh" ? "月缺口" : "Monthly gap"} value={`¥ ${fmtMoney(result.gapMonthly)}`} />
            <Stat label={lang === "zh" ? "退休时缺口资金（粗估）" : "Total gap (rough)"} value={`¥ ${fmtMoney(result.gapTotalAtRetire)}`} />
            <Stat label={lang === "zh" ? "退休时预计可用存款" : "Savings at retire"} value={`¥ ${fmtMoney(result.savingsFutureAtRetire)}`} />
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs text-slate-500">{lang === "zh" ? "提示" : "Tip"}</div>
              <div className="mt-1 text-sm text-slate-800">
                {lang === "zh"
                  ? "下一步：接入四城政策口径后，你会看到更接近真实的缴费年限/基数/待遇测算。"
                  : "Next: city policy rules for realistic contribution & benefit estimates."}
              </div>
            </div>
          </div>

          <p className="mt-4 text-xs text-slate-500">{t("disclaimer")}</p>
        </section>
      </div>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1">
      <span className="text-sm text-slate-700">{label}</span>
      {children}
    </label>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">{value}</div>
    </div>
  );
}
