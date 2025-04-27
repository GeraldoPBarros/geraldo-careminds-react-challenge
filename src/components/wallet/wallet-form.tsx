import { useState, useEffect } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";

import { PortfolioProps } from "@/types/portfolio";

import { usePortfolio } from "@/app/hooks/usePortfolio";

interface WalletFormProps {
  isEditForm: boolean;
  userPortfolio: PortfolioProps[];
}

export function WalletForm({ isEditForm, userPortfolio }: WalletFormProps) {
  const { createNewWallet } = usePortfolio();

  const [walletName, setWalletName] = useState<string>("");
  const [currentAmount, setCurrentAmount] = useState<number>(0);
  const [spentAmount, setSpentAmount] = useState<number>(0);
  const [profitLoss, setProfitLoss] = useState<number>(0);

  useEffect(() => {}, [isEditForm]);

  const onSubmit = async () => {
    createNewWallet(
      walletName,
      currentAmount,
      spentAmount,
      profitLoss
    );
  };

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
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Current Amount
        </Label>
        <Input
          id="name"
          type="number"
          value={currentAmount}
          className="col-span-3"
          onChange={(event) => setCurrentAmount(Number(event.target.value))}
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Spent Amount
        </Label>
        <Input
          id="name"
          type="number"
          value={spentAmount}
          className="col-span-3"
          onChange={(event) => setSpentAmount(Number(event.target.value))}
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Profit/Loss
        </Label>
        <Input
          id="name"
          type="number"
          value={profitLoss}
          className="col-span-3"
          onChange={(event) => setProfitLoss(Number(event.target.value))}
        />
      </div>

      <div className="mt-4 flex justify-end">
        <Button className=" cursor-pointer" size="lg" onClick={onSubmit}>
          Save Wallet
        </Button>
      </div>
    </div>
  );
}
