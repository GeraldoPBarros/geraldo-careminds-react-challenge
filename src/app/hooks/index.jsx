import React from 'react';
import { AuthProvider } from '@/app/hooks/useAuth';
import { PortfolioProvider } from "@/app/hooks/usePortfolio";

export const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <PortfolioProvider>
        {children}
      </PortfolioProvider>
    </AuthProvider>
  );
};

