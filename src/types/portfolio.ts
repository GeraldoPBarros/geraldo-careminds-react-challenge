import { UserAssets } from "./wallets";

export interface PortfolioProps {
  walletName: string;
  currentAmount: number;
  spentAmount: number;
  profitLoss: number;
  assets: UserAssets[];
}
