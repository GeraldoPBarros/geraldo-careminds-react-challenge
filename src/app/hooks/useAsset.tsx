"use client";

import { AssetContextType, UserAssets } from "@/types/user-assets-types";
import React, { createContext, useContext, useState } from "react";

import { toast } from "react-toastify";
import { usePortfolio } from "./usePortfolio";

const AssetContext = createContext<AssetContextType>({
  selectedAssetId: "",
  loading: false,
  isFormAssetOpen: false,
  isFormAssetEditMode: false,
  handleFormAssetIdSelection: () => {},
  handleFormAssetEditMode: () => {},
  handleFormAssetOpen: () => {},
  updatePortfolioAsset: () => {},
});

export const AssetProvider = ({ children }: any) => {

  const { getPortfolio } = usePortfolio();

  const [loading, setLoading] = useState(false);
  const [selectedAssetId, setSelectedAssetId] = useState<string>("");
  const [isFormAssetOpen, setIsFormAssetOpen] = useState<boolean>(false);
  const [isFormAssetEditMode, setIsFormAssetEditMode] = useState<boolean>(false);

  const handleFormAssetOpen = (status: boolean) => {
    setIsFormAssetOpen(status);
  };

  const handleFormAssetEditMode = (status: boolean) => {
    setIsFormAssetEditMode(status);
  };

  const handleFormAssetIdSelection = (id: string) => {
    setSelectedAssetId(id);
  };

  const updatePortfolioAsset = async (
    id: string,
    walletName: string,
    currentAmount: number,
    spentAmount: number,
    profitLoss: number,
    assets: UserAssets[]
  ) => {
    try {
      const response = await fetch("api/wallets", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          walletName: walletName,
          currentAmount: currentAmount,
          spentAmount: spentAmount,
          profitLoss: profitLoss,
          assets: assets,
        }),
      });
      if (response.ok) {
        toast.success("Asset successfully updated");
        getPortfolio();
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("Error");
    }
  };

  return (
    <AssetContext.Provider
      value={{
        loading,
        selectedAssetId,
        updatePortfolioAsset,
        isFormAssetEditMode,
        isFormAssetOpen,
        handleFormAssetOpen,
        handleFormAssetEditMode,
        handleFormAssetIdSelection,
      }}
    >
      {children}
    </AssetContext.Provider>
  );
};

export const useAsset = () => {
  const context = useContext(AssetContext);
  if (!context) {
    throw new Error("useAsset should be used inside of an AuthProvider");
  }
  return context;
};
