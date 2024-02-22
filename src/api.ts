import { Cluster, Wallet } from './types';

const VERSION = '0.1';
const API_URL = 'https://api.clusters.xyz';

export const fetchName = async (address: string): Promise<string | null> => {
  const getName = await fetch(`${API_URL}/v${VERSION}/name/${address}`);
  const name = (await getName.json()) as string | null;
  return name;
};

export const fetchAddress = async (name: string, addressName?: string): Promise<Wallet | null> => {
  const getWallet = await fetch(`${API_URL}/v${VERSION}/address/${name}${addressName ? `/${addressName}` : ''}`);
  const wallet = (await getWallet.json()) as Wallet | null;
  return wallet;
};

export const fetchCluster = async (name: string): Promise<Cluster | null> => {
  const fetchCluster = await fetch(`${API_URL}/v${VERSION}/cluster/${name}`);
  const cluster = (await fetchCluster.json()) as Cluster | null;
  return cluster;
};
