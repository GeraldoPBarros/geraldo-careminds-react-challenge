"use client";

import React, { useState, useEffect } from "react";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { PortfolioProps } from "@/types/portfolio";
import { UserWallets } from "@/components/wallets/user-wallets";
import { UserAssets } from "@/components/assets/user-assets";

import { UserAssets as UserAssetsProps } from "@/types/wallets";

interface UserPortfolioProps {
  userPortfolio: PortfolioProps[];
}

export function UserPortfolio({ userPortfolio }: UserPortfolioProps) {
  const [userAssets, setUserAssets] = useState<UserAssetsProps[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<string>("");

  useEffect(() => {
    if (selectedAsset !== "") {
      const newSelectedUserAssets = userPortfolio.find(
        (portfolio) => portfolio.walletName === selectedAsset
      );
      if (newSelectedUserAssets !== undefined) {
        setUserAssets(newSelectedUserAssets?.assets);
      }
    }
  }, [selectedAsset]);

  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-col">
        <label className="text-black text-2xl">Wallets</label>
        <Table className="mt-4 border border-gray-300 text-black rounded-lg border-separate">
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="border-gray-300 px-4 py-2">
                Name
              </TableHead>
              <TableHead className="border-b border-gray-300 px-4 py-2">
                Current Amount
              </TableHead>
              <TableHead className="border-b border-gray-300 px-4 py-2">
                Spent Amount
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userPortfolio.map((portfolio, index) => (
              <UserWallets
                key={`${portfolio.walletName}` + index}
                userPortfolio={portfolio}
                isLastBorder={index === userPortfolio.length - 1}
                updateSelectedAsset={setSelectedAsset}
              />
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col ml-4">
        <label className="text-black text-2xl">Assets</label>
        <Table className="mt-4 border border-gray-300 text-black rounded-lg border-separate">
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="border-b border-gray-300 px-4 py-2">
                Asset
              </TableHead>
              <TableHead className="border-b border-gray-300 px-4 py-2">
                Type
              </TableHead>
              <TableHead className="border-b border-gray-300 px-4 py-2">
                Quantity
              </TableHead>
              <TableHead className="border-b border-gray-300 px-4 py-2">
                Purchase Price
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userAssets.map((assets, index) => (
              <UserAssets
                key={`${assets.name}` + index}
                userAssets={assets}
                isLastBorder={index === userPortfolio.length - 1}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
