"use client";

import { AssetContextType, UserAssets } from "@/types/user-assets";
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
  createNewAsset: () => {},
  updateAsset: () => {},
  deleteAsset: () => {},
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

  const createNewAsset = async (
    id: string,
    walletName: string,
    currentAmount: number,
    spentAmount: number,
    profitLoss: number,
    assets: UserAssets[]
  ) => {
    try {
      const response = await fetch("api/assets", {
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
      console.log(response);
      if (response.ok) {
        toast.success("Asset successfully added");
        getPortfolio();
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const updateAsset = async (
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
    }
  };

  const deleteAsset = async (
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
        toast.success("Wallet deleted successfully");
        getPortfolio();
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <AssetContext.Provider
      value={{
        loading,
        selectedAssetId,
        createNewAsset,
        updateAsset,
        deleteAsset,
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
    throw new Error("usePortfolio should be used inside of an AuthProvider");
  }
  return context;
};
