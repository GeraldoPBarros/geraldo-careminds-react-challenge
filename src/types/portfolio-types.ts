import { UserAssets } from "./user-assets-types";

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
  isFormEditMode: boolean;
  handleFormSelection: (id: string) => void;
  handleFormEditMode: (status: boolean) => void;
  isFormOpen: boolean;
  handleFormOpen: (status: boolean) => void;
  getPortfolio: () => void;
  createNewWallet: (
    walletName: string,
  ) => void;
  updateWallet: (
    id: string,
    walletName: string,
    assets: UserAssets[]
  ) => void;
  deleteWallet: (id: string) => void;
}
