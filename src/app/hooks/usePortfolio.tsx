"use client";

import { PortfolioContextType } from "@/types/portfolio-types";
import { UserAssets } from "@/types/user-assets-types";
import React, { createContext, useContext, useState } from "react";

import { toast } from "react-toastify";

const PortfolioContext = createContext<PortfolioContextType>({
  portfolio: [],
  selectedWalletId: "",
  loading: false,
  isFormOpen: false,
  isFormEditMode: false,
  handleFormSelection: () => {},
  handleFormEditMode: () => {},
  handleFormOpen: () => {},
  getPortfolio: () => {},
  createNewWallet: () => {},
  updateWallet: () => {},
  deleteWallet: () => {},
});

export const PortfolioProvider = ({ children }: any) => {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedWalletId, setSelectedWalletId] = useState<string>("");
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isFormEditMode, setIsFormEditMode] = useState<boolean>(false);

  const handleFormOpen = (status: boolean) => {
    setIsFormOpen(status);
  };

  const handleFormEditMode = (status: boolean) => {
    setIsFormEditMode(status);
  };

  const handleFormSelection = (id: string) => {
    setSelectedWalletId(id);
  };

  const getPortfolio = async () => {
    try {
      fetch("/api/wallets")
        .then((res) => res.json())
        .then(setPortfolio);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const createNewWallet = async (
    walletName: string,
    currentAmount: number,
    spentAmount: number,
    profitLoss: number
  ) => {
    try {
      const response = await fetch("api/wallets", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          walletName: walletName,
          currentAmount: currentAmount,
          spentAmount: spentAmount,
          profitLoss: profitLoss,
        }),
      });
      console.log(response);
      if (response.ok) {
        toast.success("Wallet successfully added");
        getPortfolio();
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const updateWallet = async (
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
        toast.success("Wallet successfully updated");
        getPortfolio();
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const deleteWallet = async (id: string) => {
    try {
      const response = await fetch("api/wallets", {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
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
    <PortfolioContext.Provider
      value={{
        portfolio,
        loading,
        selectedWalletId,
        getPortfolio,
        createNewWallet,
        updateWallet,
        deleteWallet,
        isFormEditMode,
        isFormOpen,
        handleFormOpen,
        handleFormEditMode,
        handleFormSelection,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio should be used inside of an AuthProvider");
  }
  return context;
};
