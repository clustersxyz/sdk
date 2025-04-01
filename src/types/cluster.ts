import { AddressType } from './address';

type ClusterName_Found = {
  address: string;
  type: AddressType;
  clusterName: string;
  walletName: string;
  isVerified: boolean;
};
type ClusterName_NotFound = { address: string; type: AddressType; clusterName: null; walletName: null };
export type ClusterName = ClusterName_Found | ClusterName_NotFound;

export type Cluster = {
  id: string;
  createdBy: string;
  createdAt: string;
  wallets: ClusterWallet[];
  isTestnet: boolean;
};

export type ClusterWallet = {
  address: string;
  name: string;
  isVerified: boolean;
  isPrivate: boolean;
  isBackedUp: boolean;
  updatedAt: string;
  updatedBy: string;
  createdAt: string;
};
