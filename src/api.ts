import { Cluster, Wallet } from './types';

const VERSION = '0.1';
const API_URL = 'https://api.clusters.xyz';

export const fetchName = async (address: string): Promise<string | null> => {
  const getName = await fetch(`${API_URL}/v${VERSION}/name/${address}`);
  const name = (await getName.json()) as string | null;
  return name;
};

export const fetchNames = async (addresses: string[]): Promise<{ address: string; name: string }[]> => {
  const getNames = await fetch(`${API_URL}/v${VERSION}/name/addresses`, {
    method: 'POST',
    body: JSON.stringify(addresses),
  });
  const names = (await getNames.json()) as { address: string; name: string }[];
  return names;
};

export const fetchAddress = async (name: string, addressName?: string): Promise<Wallet | null> => {
  const getWallet = await fetch(`${API_URL}/v${VERSION}/address/${name}${addressName ? `/${addressName}` : ''}`);
  const wallet = (await getWallet.json()) as Wallet | null;
  return wallet;
};

export const fetchAddresses = async (names: string[]): Promise<Wallet[]> => {
  const getWallets = await fetch(`${API_URL}/v${VERSION}/address/names`, {
    method: 'POST',
    body: JSON.stringify(names),
  });
  const wallets = (await getWallets.json()) as Wallet[];
  return wallets;
};

export const fetchCluster = async (name: string): Promise<Cluster | null> => {
  const fetchCluster = await fetch(`${API_URL}/v${VERSION}/cluster/${name}`);
  const cluster = (await fetchCluster.json()) as Cluster | null;
  return cluster;
};

export const fetchClusters = async (names: string[]): Promise<Cluster[]> => {
  const fetchClusters = await fetch(`${API_URL}/v${VERSION}/cluster/names`, {
    method: 'POST',
    body: JSON.stringify(names),
  });
  const clusters = (await fetchClusters.json()) as Cluster[];
  return clusters;
};
