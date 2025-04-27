import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { toast, ToastContainer } from "react-toastify";

import { Button } from "@/components/ui/button";

export function WalletForm() {
  const [walletName, setWalletName] = useState<string>("");
  const [currentAmount, setCurrentAmount] = useState<string>("");
  const [spentAmount, setSpentAmount] = useState<string>("");
  const [profitLoss, setProfitLoss] = useState<string>("");

  const onSubmit = async () => {
    try {
      const response = await fetch("api/wallets", {
        method: "POST",
        body: JSON.stringify({
          walletName: walletName,
          currentAmount: Number(currentAmount),
          spentAmount: Number(spentAmount),
          profitLoss: Number(profitLoss),
        }),
      });

      if (response.ok) {
        toast.success("Wallet successfully added");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="grid gap-4 py-4">
      <ToastContainer />
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
          value={currentAmount}
          className="col-span-3"
          onChange={(event) => setCurrentAmount(event.target.value)}
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Spent Amount
        </Label>
        <Input
          id="name"
          value={spentAmount}
          className="col-span-3"
          onChange={(event) => setSpentAmount(event.target.value)}
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Profit/Loss
        </Label>
        <Input
          id="name"
          value={profitLoss}
          className="col-span-3"
          onChange={(event) => setProfitLoss(event.target.value)}
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
