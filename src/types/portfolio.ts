import { UserAssets } from "./wallets";

export interface PortfolioProps {
  id: string;
  walletName: string;
  currentAmount: number;
  spentAmount: number;
  profitLoss: number;
  assets: UserAssets[];
}

export interface UserPortfolioProps {
  userPortfolio: PortfolioProps[];
}

export interface PortfolioContextType {
  portfolio: PortfolioProps[];
  loading: boolean;
  selectedWalletId: string;
  getPortfolio: () => void;
  createNewWallet: (
    walletName: string,
    currentAmount: number,
    spentAmount: number,
    profitLoss: number
  ) => void;
  updateWallet: (
    id: string,
    walletName: string,
    currentAmount: number,
    spentAmount: number,
    profitLoss: number,
    assets: UserAssets[]
  ) => void;
  deleteWallet: (id: string) => void;
}
