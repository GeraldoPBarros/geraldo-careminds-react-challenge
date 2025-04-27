"use client";

import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { PortfolioProps } from "@/types/portfolio";
import { formatNumber } from "@/lib/utils";

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
  async function handleUpdateWallet() {
    const response = await fetch("api/wallets", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userPortfolio.id,
        walletName: "My new Wallet name",
        currentAmount: userPortfolio.currentAmount,
        spentAmount: userPortfolio.spentAmount,
        profitLoss: userPortfolio.profitLoss,
        assets: userPortfolio.assets
      }),
    });
    console.log(response);
  }

  async function handleDeleteWallet() {
    const response = await fetch("api/wallets", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userPortfolio.id
      }),
    });
    console.log(response);
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
            <TableCell
              className="text-right px-4 "
            >
              <button className="cursor-pointer" onClick={handleUpdateWallet}>Edit</button>
              <button className="cursor-pointer" onClick={handleDeleteWallet}>Delete</button>
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
              Edit
            </TableCell>
          </TableRow>
        </>
      )}
    </>
  );
}
