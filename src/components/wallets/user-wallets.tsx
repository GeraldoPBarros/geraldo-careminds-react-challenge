"use client";

import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { PortfolioProps } from "@/types/portfolio";
import { formatNumber } from "@/lib/utils";

interface UserPortfolioProps {
  userPortfolio: PortfolioProps;
  isLastBorder: boolean;
  updateSelectedAsset: (value: string) => void;
}

export function UserWallets({
  userPortfolio,
  isLastBorder,
  updateSelectedAsset,
}: UserPortfolioProps) {
  return (
    <>
      {isLastBorder ? (
        <>
          <TableRow
            className="cursor-pointer"
            onClick={() => updateSelectedAsset(userPortfolio.walletName)}
          >
            <TableCell className="text-left px-4">
              {userPortfolio.walletName}
            </TableCell>
            <TableCell className="text-right px-4">{`$${formatNumber(
              userPortfolio.currentAmount
            )}`}</TableCell>
            <TableCell className="text-right px-4">{`$${formatNumber(
              userPortfolio.spentAmount
            )}`}</TableCell>
          </TableRow>
        </>
      ) : (
        <>
          <TableRow
            className="cursor-pointer"
            onClick={() => updateSelectedAsset(userPortfolio.walletName)}
          >
            <TableCell className="text-left border-b border-gray-300 px-4">
              {userPortfolio.walletName}
            </TableCell>
            <TableCell className="text-right border-b border-gray-300 px-4">{`$${formatNumber(
              userPortfolio.currentAmount
            )}`}</TableCell>
            <TableCell className="text-right border-b border-gray-300 px-4">{`$${formatNumber(
              userPortfolio.spentAmount
            )}`}</TableCell>
          </TableRow>
        </>
      )}
    </>
  );
}
