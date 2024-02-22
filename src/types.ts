export type Wallet = {
  address: string;
  type: 'evm' | 'solana';
  name: string;
  isVerified: boolean;
};

export type Cluster = {
  name: string;
  wallets: Wallet[];
};
