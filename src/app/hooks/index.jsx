import React from 'react';
import { AuthProvider } from '@/app/hooks/useAuth';
import { PortfolioProvider } from "@/app/hooks/usePortfolio";
import { AssetProvider } from "@/app/hooks/useAsset";

export const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <AssetProvider>
        {children}
        </AssetProvider>
      </PortfolioProvider>
    </AuthProvider>
  );
};

