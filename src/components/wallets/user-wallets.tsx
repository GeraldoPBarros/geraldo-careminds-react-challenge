"use client";

import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { PortfolioProps } from "@/types/portfolio";
import { formatNumber } from "@/lib/utils";

interface UserPortfolioProps {
  userPortfolio: PortfolioProps;
  isLastBorder: boolean;
}

export function UserWallets({
  userPortfolio,
  isLastBorder,
}: UserPortfolioProps) {
  return (
    <>
      {isLastBorder ? (
        <>
          <TableRow>
            <TableCell className="text-left px-4">{userPortfolio.walletName}</TableCell>
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
          <TableRow>
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
