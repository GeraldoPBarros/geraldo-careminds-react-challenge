"use client";

import React, { useState, useEffect, Profiler } from "react";
import { LogoutButton } from "@/components/portfolio/logout-button";
import { UserPortfolio } from "@/components/portfolio/user-portfolio";
import { PortfolioProps } from "@/types/portfolio";

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState<PortfolioProps[]>([]);

  useEffect(() => {
    fetch("/api/wallets")
      .then((res) => res.json())
      .then(setPortfolio);
  }, []);

  return (
    <Profiler id="1" onRender={() => console.log("Profiler: ", portfolio)}>
      <div className="flex flex-col justify-items-center w-full min-h-screen font-[family-name:var(--font-geist-sans)] bg-white relative">
        <div className="flex text-white min-w-full text-center h-16 items-center justify-center bg-gray-900">
          <div className="w-[1260px] flex justify-between">
            <label className="flex text-left text-3xl font-bold ml-32">
              Investment Portfolio
            </label>
            <LogoutButton />
          </div>
        </div>
        <UserPortfolio userPortfolio={portfolio} />
      </div>
    </Profiler>
  );
}
