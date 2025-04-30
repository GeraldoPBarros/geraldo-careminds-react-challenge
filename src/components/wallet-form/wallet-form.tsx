import { useState, useEffect } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";

import { PortfolioProps } from "@/types/portfolio-types";

import { usePortfolio } from "@/app/hooks/usePortfolio";

interface WalletFormProps {
  userPortfolio: PortfolioProps[];
}

export function WalletForm({ userPortfolio }: WalletFormProps) {
  const {
    createNewWallet,
    selectedWalletId,
    handleFormOpen,
    isFormEditMode,
    updateWallet,
  } = usePortfolio();

  const [walletName, setWalletName] = useState<string>("");

  useEffect(() => {
    if (isFormEditMode) {
      const newFormData = userPortfolio.find(
        (portfolio) => portfolio.id === selectedWalletId
      );
      if (newFormData !== undefined) {
        setWalletName(newFormData.walletName);
      }
    } else {
      cleanFormData();
    }
  }, [isFormEditMode]);

  const onSubmit = async () => {
    if (!isFormEditMode) {
      createNewWallet(walletName);
    } else {
      const selectedPortfolio = userPortfolio.find(
        (portfolio) => portfolio.id === selectedWalletId
      );
      updateWallet(
        selectedWalletId,
        walletName,
        selectedPortfolio!.assets
      );
    }
    handleFormOpen(false);
    cleanFormData();
  };

  function cleanFormData() {
    setWalletName("");
  }

  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Wallet Name
        </Label>
        <Input
          id="name"
          value={walletName}
          className="col-span-3"
          onChange={(event) => setWalletName(event.target.value)}
        />
      </div>


      
      <div className="mt-4 flex justify-end">
        <Button
          className=" cursor-pointer bg-gray-700 hover:bg-gray-800 text-white"
          size="lg"
          onClick={onSubmit}
        >
          Save Asset
        </Button>
      </div>
    </div>
  );
}
