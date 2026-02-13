"use client";

import React from "react";

type Mode = "senior" | "planner";
type Props = {
  currentMode: Mode;
  toggleMode: () => void;
};

export default function ModeSwitch({ currentMode, toggleMode }: Props) {
  return (
    <div className="flex items-center rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
      <button
        className={[
          "px-3 py-2 text-sm font-semibold rounded-xl",
          currentMode === "senior" ? "bg-blue-600 text-white" : "text-slate-700 hover:bg-slate-100",
        ].join(" ")}
        onClick={() => currentMode !== "senior" && toggleMode()}
        type="button"
      >
        关怀
      </button>
      <button
        className={[
          "px-3 py-2 text-sm font-semibold rounded-xl",
          currentMode === "planner" ? "bg-blue-600 text-white" : "text-slate-700 hover:bg-slate-100",
        ].join(" ")}
        onClick={() => currentMode !== "planner" && toggleMode()}
        type="button"
      >
        规划
      </button>
    </div>
  );
}
