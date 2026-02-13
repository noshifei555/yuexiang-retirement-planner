import React from "react";

type Mode = "senior" | "planner";

type Props = {
  currentMode: Mode;
  toggleMode: () => void;
};

export default function ModeSwitch({ currentMode, toggleMode }: Props) {
  return (
    <button
      onClick={toggleMode}
      className={`rounded-lg px-3 py-1.5 text-sm ${
        currentMode === "senior"
          ? "bg-black text-white"
          : "border border-neutral-200 bg-white text-neutral-900"
      }`}
      aria-label="Toggle mode"
    >
      {currentMode === "senior" ? "关怀" : "规划"}
    </button>
  );
}
