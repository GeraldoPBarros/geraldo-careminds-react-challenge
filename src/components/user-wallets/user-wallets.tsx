"use client";

import React, { useState, useEffect } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { PortfolioProps } from "@/types/portfolio-types";
import { formatNumber } from "@/lib/utils";
import { usePortfolio } from "@/app/hooks/usePortfolio";

interface UserPortfolioProps {
  userPortfolio: PortfolioProps;
  isLastBorder: boolean;
  isSelected: boolean;
  updateSelectedAsset: (value: string) => void;
}

export function UserWallets({
  userPortfolio,
  isLastBorder,
  isSelected,
  updateSelectedAsset,
}: UserPortfolioProps) {
  const {
    deleteWallet,
    handleFormEditMode,
    handleFormOpen,
    handleFormSelection,
  } = usePortfolio();

  const [totalAssetVaue, setTotalAssetValue] = useState<number>(0);
  const [overalAssetProfitLoss, setOveralAssetProfitLoss] = useState<number>(0);
  const [] = useState<number>(0);

  async function handleUpdateWallet() {
    handleFormEditMode(true);
    handleFormSelection(userPortfolio.id);
    handleFormOpen(true);
  }

  async function handleDeleteWallet() {
    handleFormOpen(false);
    deleteWallet(userPortfolio.id);
  }

  async function handleSelectedWallet() {
    updateSelectedAsset(userPortfolio.walletName);
    handleFormSelection(userPortfolio.id);
  }

  function calculatePortfolioData(portfolios: PortfolioProps[]) {
    return portfolios.map((wallet) => {
      // Calculate Total Value of each wallet based on assets
      const totalAssetValue = wallet.assets.reduce((sum, asset) => {
        return sum + asset.quantity * asset.currentPrice;
      }, 0);

      // Calculate Individual asset gain/loss
      const assetsWithProfitLoss = wallet.assets.map((asset) => {
        const assetSpent = asset.quantity * asset.purchasePrice;
        const assetCurrentValue = asset.quantity * asset.currentPrice;
        const assetProfitLoss = assetCurrentValue - assetSpent;
        return {
          ...asset,
          assetSpent: assetSpent,
          assetCurrentValue: assetCurrentValue,
          assetProfitLoss: assetProfitLoss,
        };
      });

      // Calculate Overall profit/loss per wallet based on assets (alternative to the existing profitLoss)
      const overallAssetProfitLoss = assetsWithProfitLoss.reduce(
        (sum, asset) => {
          return sum + asset.assetProfitLoss;
        },
        0
      );

    });
  }

  useEffect(() => {}, []);

  return (
    <>
      {isLastBorder ? (
        <>
          <TableRow
            className={`cursor-pointer transition delay-150 duration-300 hover:h-24`}
            onClick={() => handleSelectedWallet()}
          >
            <TableCell
              className={`group text-left px-4 ${
                isSelected ? "font-bold" : "font-normal"
              }`}
            >
              <p className="text-wrap w-[150px] text-[16px]">
                {userPortfolio.walletName}
              </p>
              <p className="invisible group-hover:visible text-gray-400">
                Test
              </p>
            </TableCell>
            <TableCell className="text-right px-4">{`$${formatNumber(
              userPortfolio.currentAmount
            )}`}</TableCell>
            <TableCell className="text-right px-4 ">{`$${formatNumber(
              userPortfolio.spentAmount
            )}`}</TableCell>
            <TableCell className="text-right px-4 ">
              <button
                className="cursor-pointer underline"
                onClick={() => handleUpdateWallet()}
              >
                Edit
              </button>
              <button
                className="cursor-pointer ml-2 underline"
                onClick={() => handleDeleteWallet()}
              >
                Delete
              </button>
            </TableCell>
          </TableRow>
        </>
      ) : (
        <>
          <TableRow
            className="cursor-pointer transition delay-150 duration-300 hover:h-24 hover:justify-start"
            onClick={() => handleSelectedWallet()}
          >
            <TableCell
              className={`group text-left border-b border-gray-300 px-4  ${
                isSelected ? "font-bold" : "font-normal"
              }`}
            >
              <p className="text-wrap w-[150px] text-[16px]">
                {userPortfolio.walletName}
              </p>
              <p className="invisible group-hover:visible text-gray-400">
                Test
              </p>
            </TableCell>
            <TableCell className="text-right border-b border-gray-300 px-4">{`$${formatNumber(
              userPortfolio.currentAmount
            )}`}</TableCell>
            <TableCell className="text-right border-b border-gray-300 px-4">{`$${formatNumber(
              userPortfolio.spentAmount
            )}`}</TableCell>
            <TableCell className="text-right px-4 border-b border-gray-300">
              <button
                className="cursor-pointer underline"
                onClick={() => handleUpdateWallet()}
              >
                Edit
              </button>
              <button
                className="cursor-pointer ml-2 underline"
                onClick={() => handleDeleteWallet()}
              >
                Delete
              </button>
            </TableCell>
          </TableRow>
        </>
      )}
    </>
  );
}
