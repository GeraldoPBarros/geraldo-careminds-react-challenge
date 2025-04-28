"use client";

import React, { useState, useEffect, Profiler } from "react";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { UserPortfolioProps } from "@/types/portfolio-types";
import { UserWallets } from "@/components/user-wallets/user-wallets";
import { UserAssets } from "@/components/user-assets/user-assets";

import { UserAssets as UserAssetsProps } from "@/types/user-assets-types";
import FormDialog from "../ui/form-dialog";
import { WalletForm } from "../wallet-form/wallet-form";
import { usePortfolio } from "@/app/hooks/usePortfolio";
import { AssetForm } from "../asset-form/asset-form";
import { useAsset } from "@/app/hooks/useAsset";

export function UserPortfolio({ userPortfolio }: UserPortfolioProps) {
  const {
    isFormEditMode,
    isFormOpen,
    handleFormOpen,
    handleFormEditMode,
    selectedWalletId,
  } = usePortfolio();

  const {
    isFormAssetEditMode,
    isFormAssetOpen,
    handleFormAssetOpen,
    handleFormAssetEditMode,
  } = useAsset();

  const [userAssets, setUserAssets] = useState<UserAssetsProps[]>([]);
  const [selectedUserWallet, setSelectedUserWallet] = useState<string>("");

  useEffect(() => {
    if (selectedUserWallet !== "") {
      const newSelectedUserAssets = userPortfolio.find(
        (portfolio) => portfolio.walletName === selectedUserWallet
      );
      if (newSelectedUserAssets !== undefined) {
        setUserAssets(newSelectedUserAssets?.assets);
      }
    }
  }, [selectedUserWallet]);

  useEffect(() => {
    if (selectedUserWallet !== "") {
      const newSelectedUserAssets = userPortfolio.find(
        (portfolio) => portfolio.walletName === selectedUserWallet
      );
      if (newSelectedUserAssets !== undefined) {
        setUserAssets(newSelectedUserAssets?.assets);
      }
    }
  }, [userPortfolio]);

  async function onOpenWalletDialog() {
    handleFormEditMode(false);
    handleFormOpen(true);
  }

  async function onOpenAssetDialog() {
    handleFormAssetEditMode(false);
    handleFormAssetOpen(true);
  }

  return (
    <div className="flex max-sm:flex-col  w-full justify-center mt-8">
      <div className="flex flex-col w-[600px]">
        <div className="flex justify-between">
          <label className="text-black text-2xl">Wallets</label>
          <button
            className="w-[50px] bg-gray-700 hover:bg-gray-800 text-white cursor-pointer rounded-lg mr-8"
            onClick={() => onOpenWalletDialog()}
          >
            Add
          </button>
        </div>
        <Table className="mt-4 border border-gray-300 text-black rounded-lg border-separate max-w-[300px]">
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="border-b border-gray-300 px-4 py-2">
                Name
              </TableHead>
              <TableHead className="border-b border-gray-300 px-4 py-2">
                Current Amount
              </TableHead>
              <TableHead className="border-b border-gray-300 px-4 py-2">
                Spent Amount
              </TableHead>
              <TableHead className="border-b border-gray-300 px-4 py-2">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userPortfolio.map((portfolio, index) => (
              <UserWallets
                key={`${portfolio.walletName}` + index}
                userPortfolio={portfolio}
                isSelected={selectedUserWallet === portfolio.walletName}
                isLastBorder={index === userPortfolio.length - 1}
                updateSelectedAsset={setSelectedUserWallet}
              />
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col w-[600px]">
        <div className="flex justify-between">
          <label className="text-black text-2xl">Assets</label>
          <button
            title="Selecte one wallet"
            disabled={selectedUserWallet === ""}
            className="w-[50px] bg-gray-700 hover:bg-gray-800 text-white cursor-pointer rounded-lg disabled:bg-gray-200"
            onClick={() => onOpenAssetDialog()}
          >
            Add
          </button>
        </div>
        <Table className="mt-4 border border-gray-300 text-black rounded-lg border-separate">
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="border-b border-gray-300 px-4 py-2">
                Asset
              </TableHead>
              <TableHead className="border-b border-gray-300 px-4 py-2 text-right">
                Type
              </TableHead>
              <TableHead className="border-b border-gray-300 px-4 py-2 text-right">
                Quantity
              </TableHead>
              <TableHead className="border-b border-gray-300 px-4 py-2 text-right">
                Purchase Price
              </TableHead>
              <TableHead className="border-b border-gray-300 px-4 py-2">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userAssets.map((assets, index) => (
              <UserAssets
                key={`${assets.name}` + index}
                userAssets={assets}
                userPortfolio={userPortfolio}
                isLastBorder={index === userAssets.length - 1}
              />
            ))}
          </TableBody>
        </Table>
      </div>
      <FormDialog
        title={`${isFormEditMode ? "Update" : "Insert"} wallet`}
        isOpen={isFormOpen}
        onDismiss={() => handleFormOpen(false)}
      >
        <WalletForm userPortfolio={userPortfolio} />
      </FormDialog>
      <Profiler
        id="2"
        onRender={() => console.log("SELECTED PROFILER: ", selectedWalletId)}
      >
        <FormDialog
          title={`${isFormAssetEditMode ? "Update" : "Insert"} asset`}
          isOpen={isFormAssetOpen}
          onDismiss={() => handleFormAssetOpen(false)}
        >
          <AssetForm
            userPortfolio={userPortfolio}
            selectedWalletId={selectedWalletId}
          />
        </FormDialog>
      </Profiler>
    </div>
  );
}
