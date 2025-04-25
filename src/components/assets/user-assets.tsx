"use client";

import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { UserAssets as Assets } from "@/types/wallets";
import { formatNumber } from "@/lib/utils";

interface UserAssetsProps {
  userAssets: Assets;
  isLastBorder: boolean;
}

export function UserAssets({
  userAssets,
  isLastBorder,
}: UserAssetsProps) {

  return (
    <>
      {isLastBorder ? (
        <>
          <TableRow>
            <TableCell className="text-left px-4">{userAssets.name}</TableCell>
            <TableCell className="text-right px-4">{userAssets.type}</TableCell>
            <TableCell className="text-right px-4">
              {userAssets.quantity}
            </TableCell>
            <TableCell className="text-right px-4">{`$${formatNumber(
              userAssets.purchasePrice
            )}`}</TableCell>
          </TableRow>
        </>
      ) : (
        <>
          <TableRow>
            <TableCell className="text-left border-b border-gray-300 px-4">
              {userAssets.name}
            </TableCell>
            <TableCell className="text-right border-b border-gray-300 px-4">
              {userAssets.type}
            </TableCell>
            <TableCell className="text-right border-b border-gray-300 px-4">
              {userAssets.quantity}
            </TableCell>
            <TableCell className="text-right border-b border-gray-300 px-4">{`$${formatNumber(
              userAssets.purchasePrice
            )}`}</TableCell>
          </TableRow>
        </>
      )}
    </>
  );
}
