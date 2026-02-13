export type Mode = "senior" | "planner";
export type Lang = "zh" | "en";

export type CalcInput = {
  mode: Mode;
  lang: Lang;
  currentAge: number; // 当前年龄
  retireAge: number; // 计划退休年龄
  monthlyIncome: number; // 税后月收入（元）
  monthlyExpenseNow: number; // 当前月支出（元）
  savingsNow: number; // 当前可用于养老的存款（元）
  expectedReturn: number; // 退休前资产年化（%）
  inflation: number; // 通胀（%）
  lifeExpectancy: number; // 预计寿命
  pensionMonthly: number; // 预计月养老金（元）
};

export type CalcResult = {
  yearsToRetire: number;
  yearsInRetirement: number;
  expenseAtRetireMonthly: number;
  incomeAtRetireMonthly: number;
  gapMonthly: number;
  gapTotalAtRetire: number;
  savingsFutureAtRetire: number;
  feasibility: "good" | "ok" | "risk";
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function calc(input: CalcInput): CalcResult {
  const currentAge = clamp(input.currentAge, 0, 120);
  const retireAge = clamp(input.retireAge, currentAge, 80);
  const life = clamp(input.lifeExpectancy, retireAge, 120);

  const yearsToRetire = retireAge - currentAge;
  const yearsInRetirement = life - retireAge;

  const r = (clamp(input.expectedReturn, 0, 30) / 100) || 0;
  const inf = (clamp(input.inflation, 0, 20) / 100) || 0;

  // 退休时“月支出”按通胀上调（简化：按年复利）
  const expenseAtRetireMonthly =
    input.monthlyExpenseNow * Math.pow(1 + inf, yearsToRetire);

  // 退休时“月收入”=养老金（暂不增长，后续接入政策口径）
  const incomeAtRetireMonthly = input.pensionMonthly;

  const gapMonthly = Math.max(0, expenseAtRetireMonthly - incomeAtRetireMonthly);

  // 退休前存款按年化增长
  const savingsFutureAtRetire =
    input.savingsNow * Math.pow(1 + r, yearsToRetire);

  // 缺口现值（退休时需要的资金）简化：缺口月 * 12 * 退休年数
  const gapTotalAtRetire = gapMonthly * 12 * yearsInRetirement;

  // 假设退休时一次性可以拿出 savingsFutureAtRetire 抵扣缺口
  const remaining = gapTotalAtRetire - savingsFutureAtRetire;

  let feasibility: CalcResult["feasibility"] = "good";
  if (remaining > 0) feasibility = "ok";
  if (remaining > gapTotalAtRetire * 0.5) feasibility = "risk";

  return {
    yearsToRetire,
    yearsInRetirement,
    expenseAtRetireMonthly,
    incomeAtRetireMonthly,
    gapMonthly,
    gapTotalAtRetire,
    savingsFutureAtRetire,
    feasibility,
  };
}
