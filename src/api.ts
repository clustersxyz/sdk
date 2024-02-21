import { Wallet } from './types';

const VERSION = '0.1';
const API_URL = 'https://api.clusters.xyz';

export const getResolveName = async (address: string): Promise<string | null> => {
  const getName = await fetch(`${API_URL}/sdk/v${VERSION}/resolve/name/${address}`);
  const name = (await getName.json()) as string | null;
  return name;
};

export const getResolveAddress = async (name: string, addressName?: string): Promise<Wallet | null> => {
  const getWallet = await fetch(
    `${API_URL}/sdk/v${VERSION}/resolve/address/${name}${addressName ? `/${addressName}` : ''}`,
  );
  const wallet = (await getWallet.json()) as Wallet | null;
  return wallet;
};

export type ResolveWalletsItem = {
  type: 'evm' | 'solana';
  address: string;
  name: string;
  isVerified: boolean;
};

export const getResolveWallets = async (name: string): Promise<ResolveWalletsItem[]> => {
  const getWallets = await fetch(`${API_URL}/sdk/v${VERSION}/resolve/wallets/${name}`);
  const wallets = (await getWallets.json()) as ResolveWalletsItem[];
  return wallets;
};
