"use client";

import React, { useMemo } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { PortfolioProps } from "@/types/portfolio-types";
import { formatNumber } from "@/lib/utils";
import { usePortfolio } from "@/app/hooks/usePortfolio";
import { PriceDescription } from "../price-description/price-description";

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

  const walletTotalValue = useMemo(() => {
    let totalAssetValue = 0;
    userPortfolio.assets.forEach((asset) => {
      totalAssetValue += asset.quantity * asset.currentPrice;
    });
    return totalAssetValue;
  }, [userPortfolio]);

  const overallWalletProfitLoss = useMemo(() => {
    let totalAssetValue = 0;
    userPortfolio.assets.forEach((asset) => {
      const quantity = asset.quantity;
      const purchasePrice = asset.purchasePrice;
      const currentPrice = asset.currentPrice;
      totalAssetValue += quantity * currentPrice - quantity * purchasePrice;
    });
    return formatNumber(totalAssetValue);
  }, [userPortfolio]);

  return (
    <>
      {isLastBorder ? (
        <>
          <TableRow
            className={`cursor-pointer transition delay-150 duration-300`}
            onClick={() => handleSelectedWallet()}
          >
            <TableCell
              className={`text-left px-4 ${
                isSelected ? "font-bold" : "font-normal"
              }`}
            >
              <p className="text-wrap w-[120px] text-[16px]">
                {userPortfolio.walletName}
              </p>
              <div className="flex">
                <PriceDescription title="Total" value={walletTotalValue} />

                <div className="flex flex-col ml-4 items-start">
                  <PriceDescription
                    title="Profit/Loss"
                    value={Number(overallWalletProfitLoss)}
                  />
                </div>
              </div>
            </TableCell>
            <TableCell className="text-right justify-end">
              {`$${formatNumber(userPortfolio.currentAmount)}`}
            </TableCell>
            <TableCell className="text-right px-4 ">{`$${formatNumber(
              userPortfolio.spentAmount
            )}`}</TableCell>
            <TableCell className="text-right">
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
            className="cursor-pointer max-w-[30px] transition delay-150 duration-300"
            onClick={() => handleSelectedWallet()}
          >
            <TableCell
              className={`text-left border-b border-gray-300 px-4  ${
                isSelected ? "font-bold" : "font-normal"
              }`}
            >
              <p className="text-wrap w-[120px] text-[16px]">
                {userPortfolio.walletName}
              </p>
              <div className="flex">
                <PriceDescription title="Total" value={walletTotalValue} />

                <div className="flex flex-col ml-4 items-start">
                  <PriceDescription
                    title="Profit/Loss"
                    value={Number(overallWalletProfitLoss)}
                  />
                </div>
              </div>
            </TableCell>

            <TableCell className="text-right border-b border-gray-300">
              {`$${formatNumber(userPortfolio.currentAmount)}`}
            </TableCell>
            <TableCell className="text-right border-b border-gray-300 px-4">{`$${formatNumber(
              userPortfolio.spentAmount
            )}`}</TableCell>
            <TableCell className="text-right border-b border-gray-300">
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
