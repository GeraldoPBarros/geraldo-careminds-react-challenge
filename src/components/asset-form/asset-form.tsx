"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";

import { UserAssets } from "@/types/user-assets-types";

import { useAsset } from "@/app/hooks/useAsset";
import { PortfolioProps } from "@/types/portfolio-types";

interface AssetsFormProps {
  userPortfolio: PortfolioProps[];
  selectedWalletId: string;
}

export function AssetForm({
  userPortfolio,
  selectedWalletId,
}: AssetsFormProps) {
  const {
    updatePortfolioAsset,
    selectedAssetId,
    handleFormAssetOpen,
    isFormAssetEditMode,
  } = useAsset();

  const [assetName, setAssetName] = useState<string>("");
  const [assetType, setAssetType] = useState<string>("");
  const [assetSymbol, setAssetSymbol] = useState<string>("");
  const [assetQuantity, setAssetQuantity] = useState<number>(0);
  const [assetPurchasePrice, setAssetPurchasePrice] = useState<number>(0);
  const [assetCurrentPrice, setAssetCurrentPrice] = useState<number>(0);

  useEffect(() => {
    console.log(isFormAssetEditMode);
    if (isFormAssetEditMode) {
      const selectedWallet = userPortfolio.find(
        (portfolio) => portfolio.id === selectedWalletId
      );

      if (selectedWallet !== undefined) {
        const newFormData = selectedWallet.assets.find(
          (asset: UserAssets) => asset.id === selectedAssetId
        );
        if (newFormData !== undefined) {
          setAssetName(newFormData.name);
          setAssetSymbol(newFormData.symbol);
          setAssetType(newFormData.type);
          setAssetCurrentPrice(newFormData.currentPrice);
          setAssetQuantity(newFormData.quantity);
          setAssetPurchasePrice(newFormData.purchasePrice);
        }
      }
    } else {
      cleanFormData();
    }
  }, [isFormAssetEditMode]);

  const onSubmit = async () => {
    const selectedWallet = userPortfolio.find(
      (portfolio) => portfolio.id === selectedWalletId
    );
    if (selectedWallet !== undefined) {
      if (!isFormAssetEditMode) {
        const selectedAsset: UserAssets = {
          id: uuidv4(),
          type: assetType,
          symbol: assetSymbol,
          name: assetName,
          currentPrice: assetCurrentPrice,
          purchasePrice: assetPurchasePrice,
          quantity: assetQuantity,
        };
        const newAssetData: UserAssets[] = [
          ...selectedWallet.assets,
          selectedAsset,
        ];
        updatePortfolioAsset(
          selectedWalletId,
          selectedWallet.walletName,
          selectedWallet.currentAmount,
          selectedWallet.spentAmount,
          selectedWallet.profitLoss,
          newAssetData
        );
      } else {
        const newAssetData: UserAssets[] = [];
        selectedWallet.assets.forEach((asset) => {
          if (asset.id !== selectedAssetId) {
            newAssetData.push(asset);
          } else {
            newAssetData.push({
              id: asset.id,
              type: assetType,
              symbol: assetSymbol,
              name: assetName,
              currentPrice: assetCurrentPrice,
              purchasePrice: assetPurchasePrice,
              quantity: assetQuantity,
            });
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

    handleFormAssetOpen(false);
    cleanFormData();
  };

  function cleanFormData() {
    setAssetName("");
    setAssetSymbol("");
    setAssetType("");
    setAssetCurrentPrice(0);
    setAssetQuantity(0);
    setAssetPurchasePrice(0);
  }

  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Asset Name
        </Label>
        <Input
          id="name"
          value={assetName}
          className="col-span-3"
          onChange={(event) => setAssetName(event.target.value)}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Type
        </Label>
        <Input
          id="asset-type"
          value={assetType}
          className="col-span-3"
          onChange={(event) => setAssetType(event.target.value)}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Symbol
        </Label>
        <Input
          id="asset-symbol"
          value={assetSymbol}
          className="col-span-3"
          onChange={(event) => setAssetSymbol(event.target.value)}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Current Price
        </Label>
        <Input
          id="asset-current-price"
          type="number"
          value={assetCurrentPrice}
          className="col-span-3"
          onChange={(event) => setAssetCurrentPrice(Number(event.target.value))}
        />
      </div>

      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Purchase Price
        </Label>
        <Input
          id="asset-purchase-price"
          type="number"
          value={assetPurchasePrice}
          className="col-span-3"
          onChange={(event) =>
            setAssetPurchasePrice(Number(event.target.value))
          }
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Quantity
        </Label>
        <Input
          id="asset-quantity"
          type="number"
          value={assetQuantity}
          className="col-span-3"
          onChange={(event) => setAssetQuantity(Number(event.target.value))}
        />
      </div>

      <div className="mt-4 flex justify-end">
        <Button className=" cursor-pointer" size="lg" onClick={onSubmit}>
          Save Asset
        </Button>
      </div>
    </div>
  );
}
