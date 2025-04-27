"use client";

import React, { useEffect, Profiler } from "react";
import { LogoutButton } from "@/components/portfolio/logout-button";
import { UserPortfolio } from "@/components/portfolio/user-portfolio";

import { usePortfolio } from "@/app/hooks/usePortfolio";

export default function Portfolio() {

  const { portfolio, getPortfolio } = usePortfolio();

  useEffect(() => {
    getPortfolio();
  }, []);

  return (
    <Profiler id="1" onRender={() => console.log("Profiler: ", portfolio)}>
      <div className="flex flex-col justify-items-center w-full min-h-screen font-[family-name:var(--font-geist-sans)] bg-white relative">
        <div className="flex text-white min-w-full text-center h-16 items-center justify-center bg-gray-900">
          <div className="w-[1360px] flex justify-between">
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
