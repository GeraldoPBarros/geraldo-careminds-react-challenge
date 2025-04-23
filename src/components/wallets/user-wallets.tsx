"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function UserWallets() {
  return (
    <div className="flex flex-col">
      <label className="text-black">Wallets</label>
      <Table className="mt-4 border border-gray-300 rounded-lg text-black">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Current Amount</TableHead>
            <TableHead>Spent Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Main Investment</TableCell>
            <TableCell>$42.000</TableCell>
            <TableCell>$35.000</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
