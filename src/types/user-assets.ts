import { PortfolioProps } from "./portfolio";

export interface UserAssets {
  id: string;
  type: string;
  symbol: string;
  name: string;
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
}

export interface UpdateAssetType {
  type: string;
  symbol: string;
  name: string;
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
}

export interface AssetContextType {
  loading: boolean;
  selectedAssetId: string;
  isFormAssetEditMode: boolean;
  handleFormAssetIdSelection: (id: string) => void;
  handleFormAssetEditMode: (status: boolean) => void;
  isFormAssetOpen: boolean;
  handleFormAssetOpen: (status: boolean) => void;
  createNewAsset: (
    id: string,
    walletName: string,
    currentAmount: number,
    spentAmount: number,
    profitLoss: number,
    assets: UserAssets[]
  ) => void;
  updateAsset: (
    id: string,
    walletName: string,
    currentAmount: number,
    spentAmount: number,
    profitLoss: number,
    assets: UserAssets[]
  ) => void;
  deleteAsset: (
    id: string,
    walletName: string,
    currentAmount: number,
    spentAmount: number,
    profitLoss: number,
    assets: UserAssets[]
  ) => void;
}
