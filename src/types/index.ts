import { AddressType } from './address';

export type Wallet = {
  address: string;
  type: AddressType;
  name: string;
  isVerified: boolean;
};

export type Cluster = {
  name: string;
  profileUrl: string;
  imageUrl: string;
  hasCustomImage: boolean;
  wallets: Wallet[];
};
