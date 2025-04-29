import { formatNumber } from "@/lib/utils";
import React from "react";

interface PriceDescriptionProps {
  value: number;
  title: string;
}

export function PriceDescription({ title, value }: PriceDescriptionProps) {
  return (
    <div className="flex">
      <div className="flex flex-col items-start">
        <p
          className={`${value >= 0 ? "text-green-600" : "text-red-600"}`}
        >{`$${formatNumber(value)}`}</p>
        <p className="text-gray-600 text-[12px]">{title}</p>
      </div>
    </div>
  );
}
