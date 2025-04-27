"use client";

import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { PortfolioProps } from "@/types/portfolio";
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
  const { updateWallet, deleteWallet } = usePortfolio();

  async function handleUpdateWallet() {
    updateWallet(
      userPortfolio.id,
      "My new Wallet name",
      userPortfolio.currentAmount,
      userPortfolio.spentAmount,
      userPortfolio.profitLoss,
      userPortfolio.assets
    );
  }

  async function handleDeleteWallet() {
    deleteWallet(userPortfolio.id);
  }

  return (
    <>
      {isLastBorder ? (
        <>
          <TableRow
            className="cursor-pointer"
            onClick={() => updateSelectedAsset(userPortfolio.walletName)}
          >
            <TableCell
              className={`text-left px-4 ${
                isSelected ? "font-bold" : "font-normal"
              }`}
            >
              {userPortfolio.walletName}
            </TableCell>
            <TableCell className="text-right px-4">{`$${formatNumber(
              userPortfolio.currentAmount
            )}`}</TableCell>
            <TableCell className="text-right px-4 ">{`$${formatNumber(
              userPortfolio.spentAmount
            )}`}</TableCell>
            <TableCell className="text-right px-4 ">
              <button className="cursor-pointer" onClick={handleUpdateWallet}>
                Edit
              </button>
              <button className="cursor-pointer" onClick={handleDeleteWallet}>
                Delete
              </button>
            </TableCell>
          </TableRow>
        </>
      ) : (
        <>
          <TableRow
            className="cursor-pointer"
            onClick={() => updateSelectedAsset(userPortfolio.walletName)}
          >
            <TableCell
              className={`text-left border-b border-gray-300 px-4 ${
                isSelected ? "font-bold" : "font-normal"
              }`}
            >
              {userPortfolio.walletName}
            </TableCell>
            <TableCell className="text-right border-b border-gray-300 px-4">{`$${formatNumber(
              userPortfolio.currentAmount
            )}`}</TableCell>
            <TableCell className="text-right border-b border-gray-300 px-4">{`$${formatNumber(
              userPortfolio.spentAmount
            )}`}</TableCell>
            <TableCell
              className="text-right px-4 "
              onClick={handleUpdateWallet}
            >
              <button className="cursor-pointer" onClick={handleUpdateWallet}>
                Edit
              </button>
              <button className="cursor-pointer" onClick={handleDeleteWallet}>
                Delete
              </button>
            </TableCell>
          </TableRow>
        </>
      )}
    </>
  );
}
