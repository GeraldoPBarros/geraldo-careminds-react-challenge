"use client";

import React from "react";
import { UserWallets } from "@/components/wallets/user-wallets";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { PortfolioProps } from "@/types/portfolio";

interface UserPortfolioProps {
  userPortfolio: PortfolioProps[];
}

export function UserPortfolio({ userPortfolio }: UserPortfolioProps) {
  
  return (
    <div className="flex flex-col">
      <label className="text-black">Wallets</label>
      <Table className="mt-4 border border-gray-300 text-black rounded-lg border-separate">
        <TableHeader>
          <TableRow >
            <TableHead className="border-b border-gray-300 px-4 py-2">Name</TableHead>
            <TableHead className="border-b border-gray-300 px-4 py-2">Current Amount</TableHead>
            <TableHead className="border-b border-gray-300 px-4 py-2">Spent Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userPortfolio.map((portfolio, index) => (
            <UserWallets
              key={`${portfolio.walletName}` + index}
              userPortfolio={portfolio}
              isLastBorder={index === (userPortfolio.length - 1)} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
