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

  // 默认值：根据模式给不同的“更友好”起始参数
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

  const [form, setForm] = useState(() => ({
    ...defaults,
  }));

  // 模式切换时重置默认值（更直观）
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
    mode === "senior" ? (lang === "zh" ? "关怀测算" : "Senior Calculator") : lang === "zh" ? "规划测算" : "Planner Calculator";

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
    <main className="mx-auto w-full max-w-3xl px-4 py-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">{title}</h1>
        <button
          onClick={copyShare}
          className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-900"
        >
          {lang === "zh" ? "复制分享链接" : "Copy Share Link"}
        </button>
      </div>

      <p className="mt-2 text-sm text-neutral-600">
        {lang === "zh"
          ? "这是一个可用的“简化版”测算器：先跑通流程，下一步再接入你 PDF 的四城政策口径与完整公式。"
          : "This is a working simplified calculator. Next we will plug in your city-policy formulas from the PDF."}
      </p>

      <section className="mt-5 grid gap-4 rounded-2xl bg-white p-5 shadow-sm">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label={lang === "zh" ? "当前年龄" : "Current age"}>
            <input
              className="w-full rounded-xl border border-neutral-200 px-3 py-2"
              value={form.currentAge}
              onChange={(e) => setForm((f) => ({ ...f, currentAge: n(e.target.value) }))}
              inputMode="numeric"
            />
          </Field>
          <Field label={lang === "zh" ? "退休年龄" : "Retire age"}>
            <input
              className="w-full rounded-xl border border-neutral-200 px-3 py-2"
              value={form.retireAge}
              onChange={(e) => setForm((f) => ({ ...f, retireAge: n(e.target.value) }))}
              inputMode="numeric"
            />
          </Field>

          <Field label={lang === "zh" ? "当前月支出（元）" : "Monthly expense now (CNY)"}>
            <input
              className="w-full rounded-xl border border-neutral-200 px-3 py-2"
              value={form.monthlyExpenseNow}
              onChange={(e) => setForm((f) => ({ ...f, monthlyExpenseNow: n(e.target.value) }))}
              inputMode="numeric"
            />
          </Field>

          <Field label={lang === "zh" ? "当前养老存款（元）" : "Savings for retirement (CNY)"}>
            <input
              className="w-full rounded-xl border border-neutral-200 px-3 py-2"
              value={form.savingsNow}
              onChange={(e) => setForm((f) => ({ ...f, savingsNow: n(e.target.value) }))}
              inputMode="numeric"
            />
          </Field>

          <Field label={lang === "zh" ? "预计月养老金（元）" : "Expected pension/month (CNY)"}>
            <input
              className="w-full rounded-xl border border-neutral-200 px-3 py-2"
              value={form.pensionMonthly}
              onChange={(e) => setForm((f) => ({ ...f, pensionMonthly: n(e.target.value) }))}
              inputMode="numeric"
            />
          </Field>

          <Field label={lang === "zh" ? "预计寿命" : "Life expectancy"}>
            <input
              className="w-full rounded-xl border border-neutral-200 px-3 py-2"
              value={form.lifeExpectancy}
              onChange={(e) => setForm((f) => ({ ...f, lifeExpectancy: n(e.target.value) }))}
              inputMode="numeric"
            />
          </Field>

          <Field label={lang === "zh" ? "退休前年化收益（%）" : "Annual return before retire (%)"}>
            <input
              className="w-full rounded-xl border border-neutral-200 px-3 py-2"
              value={form.expectedReturn}
              onChange={(e) => setForm((f) => ({ ...f, expectedReturn: n(e.target.value) }))}
              inputMode="decimal"
            />
          </Field>

          <Field label={lang === "zh" ? "通胀（%）" : "Inflation (%)"}>
            <input
              className="w-full rounded-xl border border-neutral-200 px-3 py-2"
              value={form.inflation}
              onChange={(e) => setForm((f) => ({ ...f, inflation: n(e.target.value) }))}
              inputMode="decimal"
            />
          </Field>
        </div>
      </section>

      <section className="mt-4 rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold">{lang === "zh" ? "结果（简化版）" : "Result (simplified)"}</h2>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Stat label={lang === "zh" ? "距离退休（年）" : "Years to retire"} value={String(result.yearsToRetire)} />
          <Stat label={lang === "zh" ? "退休后年数" : "Years in retirement"} value={String(result.yearsInRetirement)} />
          <Stat
            label={lang === "zh" ? "退休时月支出（估算）" : "Monthly expense at retire"}
            value={`¥ ${fmtMoney(result.expenseAtRetireMonthly)}`}
          />
          <Stat
            label={lang === "zh" ? "退休时月收入（养老金）" : "Monthly income (pension)"}
            value={`¥ ${fmtMoney(result.incomeAtRetireMonthly)}`}
          />
          <Stat
            label={lang === "zh" ? "月缺口" : "Monthly gap"}
            value={`¥ ${fmtMoney(result.gapMonthly)}`}
          />
          <Stat
            label={lang === "zh" ? "退休时缺口资金（粗估）" : "Total gap at retire (rough)"}
            value={`¥ ${fmtMoney(result.gapTotalAtRetire)}`}
          />
          <Stat
            label={lang === "zh" ? "退休时预计可用存款" : "Savings at retire"}
            value={`¥ ${fmtMoney(result.savingsFutureAtRetire)}`}
          />
          <Stat
            label={lang === "zh" ? "风险提示" : "Risk"}
            value={
              result.feasibility === "good"
                ? lang === "zh"
                  ? "较稳"
                  : "Good"
                : result.feasibility === "ok"
                ? lang === "zh"
                  ? "需要补充"
                  : "Needs improvement"
                : lang === "zh"
                ? "风险偏高"
                : "High risk"
            }
          />
        </div>

        <p className="mt-4 text-xs text-neutral-500">{t("disclaimer")}</p>
      </section>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1">
      <span className="text-sm text-neutral-700">{label}</span>
      {children}
    </label>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-3">
      <div className="text-xs text-neutral-500">{label}</div>
      <div className="mt-1 text-lg font-semibold text-neutral-900">{value}</div>
    </div>
  );
}
