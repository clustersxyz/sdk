import { AddressType } from './address';

export type Wallet = {
  address: string;
  type: AddressType;
  name: string;
  isVerified: boolean;
  chains: string[];
};

export type Cluster = {
  name: string;
  profileUrl: string;
  imageUrl: string;
  hasCustomImage: boolean;
  connectedTwitterId: string | null;
  totalRegistrationWei: string;
  defaultName: string;
  chains: string[];
  wallets: Wallet[];
  nameHoldings: string[];
};

export type DAConfig = {
  manifestUploader: string;
  arweaveRpc?: {
    host: string;
    port: number;
    protocol: 'http' | 'https';
  };
};
