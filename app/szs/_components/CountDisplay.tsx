"use client";

type CountDisplayProps = {
  count: number;
};

export const CountDisplay = ({ count }: CountDisplayProps) => (
  <div className="flex flex-col items-center justify-center">
    <span className="text-subtitle18 font-semiBold text-blue-500">
      누른 횟수
    </span>
    <span className="text-68 font-bold text-blue-500 text-3xl">{count}</span>
  </div>
);
