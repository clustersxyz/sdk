import { Cluster, Wallet } from './types';

const VERSION = '0.1';
const API_URL = 'https://api.clusters.xyz';

const generateHeaders = (apiKey?: string): { [key: string]: string } => {
  if (apiKey)
    return {
      'X-API-KEY': apiKey,
    };

  return {};
};

export const fetchName = async (address: string, apiKey?: string): Promise<string | null> => {
  const getName = await fetch(`${API_URL}/v${VERSION}/name/${address}`, {
    headers: generateHeaders(apiKey || undefined),
  });
  const name = (await getName.json()) as string | null;
  return name;
};

export const fetchNames = async (
  addresses: string[],
  apiKey?: string,
): Promise<{ address: string; name: string }[]> => {
  const getNames = await fetch(`${API_URL}/v${VERSION}/name/addresses`, {
    method: 'POST',
    headers: generateHeaders(apiKey || undefined),
    body: JSON.stringify(addresses),
  });
  const names = (await getNames.json()) as { address: string; name: string }[];
  return names;
};

export const fetchAddress = async (name: string, addressName?: string, apiKey?: string): Promise<Wallet | null> => {
  const getWallet = await fetch(`${API_URL}/v${VERSION}/address/${name}${addressName ? `/${addressName}` : ''}`, {
    headers: generateHeaders(apiKey || undefined),
  });
  const wallet = (await getWallet.json()) as Wallet | null;
  return wallet;
};

export const fetchAddresses = async (names: string[], apiKey?: string): Promise<Wallet[]> => {
  const getWallets = await fetch(`${API_URL}/v${VERSION}/address/names`, {
    method: 'POST',
    headers: generateHeaders(apiKey || undefined),
    body: JSON.stringify(names),
  });
  const wallets = (await getWallets.json()) as Wallet[];
  return wallets;
};

export const fetchCluster = async (name: string, apiKey?: string): Promise<Cluster | null> => {
  const fetchCluster = await fetch(`${API_URL}/v${VERSION}/cluster/${name}`, {
    headers: generateHeaders(apiKey || undefined),
  });
  const cluster = (await fetchCluster.json()) as Cluster | null;
  return cluster;
};

export const fetchClusters = async (names: string[], apiKey?: string): Promise<Cluster[]> => {
  const fetchClusters = await fetch(`${API_URL}/v${VERSION}/cluster/names`, {
    method: 'POST',
    headers: generateHeaders(apiKey || undefined),
    body: JSON.stringify(names),
  });
  const clusters = (await fetchClusters.json()) as Cluster[];
  return clusters;
};
