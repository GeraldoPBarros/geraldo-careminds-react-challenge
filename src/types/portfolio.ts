import { UserAssets } from "./wallets";

export interface PortfolioProps {
  id: string;
  walletName: string;
  currentAmount: number;
  spentAmount: number;
  profitLoss: number;
  assets: UserAssets[];
}
