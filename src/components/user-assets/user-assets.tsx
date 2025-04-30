"use client";

import React, { useMemo } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  UserAssets as Assets,
  UserAssets as UserAssetsType,
} from "@/types/user-assets-types";

import { checkNumberAndUpdateToDot, checkNumberAndUpdateToComma, formatNumber } from "@/lib/utils";

import { useAsset } from "@/app/hooks/useAsset";
import { PortfolioProps } from "@/types/portfolio-types";
import { usePortfolio } from "@/app/hooks/usePortfolio";
import { PriceDescription } from "../price-description/price-description";

interface UserAssetsProps {
  userAssets: Assets;
  isLastBorder: boolean;
  userPortfolio: PortfolioProps[];
}

export function UserAssets({
  userPortfolio,
  userAssets,
  isLastBorder,
}: UserAssetsProps) {
  const {
    updatePortfolioAsset,
    handleFormAssetEditMode,
    handleFormAssetOpen,
    handleFormAssetIdSelection,
  } = useAsset();

  const { selectedWalletId } = usePortfolio();

  const assetProfitLoss = useMemo(() => {
    const quantity = userAssets.quantity;
    const purchasePrice = userAssets.purchasePrice;
    const currentPrice = userAssets.currentPrice;
    const formattedNumber = formatNumber(quantity * currentPrice - quantity * purchasePrice);
    const correctNumber = checkNumberAndUpdateToDot(formattedNumber);
    return correctNumber;
  }, [userAssets]);

  async function handleUpdateAsset() {
    handleFormAssetEditMode(true);
    handleFormAssetIdSelection(userAssets.id);
    handleFormAssetOpen(true);
  }

  async function handleDeleteAsset() {
    handleFormAssetOpen(false);
    const selectedWallet = userPortfolio.find(
      (portfolio) => portfolio.id === selectedWalletId
    );
    if (selectedWallet !== undefined) {
      const newAssetData: UserAssetsType[] = [];
      selectedWallet.assets.forEach((asset) => {
        if (asset.id !== userAssets.id) {
          newAssetData.push(asset);
        }
      });
      updatePortfolioAsset(
        selectedWalletId,
        selectedWallet.walletName,
        selectedWallet.currentAmount,
        selectedWallet.spentAmount,
        selectedWallet.profitLoss,
        newAssetData
      );
    }
  }
  return (
    <>
      {isLastBorder ? (
        <>
          <TableRow>
            <TableCell className="text-left px-4">
              <p className="text-wrap w-[120px]">{userAssets.name}</p>
              <PriceDescription title="Profit/Loss" value={Number(assetProfitLoss)} />
            </TableCell>
            <TableCell className="text-right px-4">{userAssets.type}</TableCell>
            <TableCell className="text-right px-4">
              {userAssets.quantity}
            </TableCell>
            <TableCell className="text-right px-4">{`$${formatNumber(
              userAssets.purchasePrice
            )}`}</TableCell>
            <TableCell className="text-right px-4 ">
              <button
                className="cursor-pointer underline"
                onClick={() => handleUpdateAsset()}
              >
                Edit
              </button>
              <button
                className="cursor-pointer ml-2 underline"
                onClick={() => handleDeleteAsset()}
              >
                Delete
              </button>
            </TableCell>
          </TableRow>
        </>
      ) : (
        <>
          <TableRow>
            <TableCell className="text-left border-b border-gray-300 px-4">
              <p className="text-wrap w-[120px]">{userAssets.name}</p>
              <PriceDescription title="Profit/Loss" value={Number(assetProfitLoss)} />
            </TableCell>
            <TableCell className="text-right border-b border-gray-300 px-4">
              {userAssets.type}
            </TableCell>
            <TableCell className="text-right border-b border-gray-300 px-4">
              {checkNumberAndUpdateToComma(userAssets.quantity.toString())}
            </TableCell>
            <TableCell className="text-right border-b border-gray-300 px-4">{`$${formatNumber(
              userAssets.purchasePrice
            )}`}</TableCell>
            <TableCell className="text-right px-4 border-b border-gray-300">
              <button
                className="cursor-pointer underline"
                onClick={() => handleUpdateAsset()}
              >
                Edit
              </button>
              <button
                className="cursor-pointer ml-2 underline"
                onClick={() => handleDeleteAsset()}
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
