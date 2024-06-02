import {
  Cluster,
  NameAvailability,
  Network,
  RegistrationName,
  RegistrationResponse,
  RegistrationTransactionStatus,
  Wallet,
} from './types';

const VERSION = '0.1';
// const API_URL = 'https://api.clusters.xyz';
const API_URL = 'http://localhost:60000';

const generateHeaders = (apiKey?: string): { [key: string]: string } => {
  const headerObject: { [key: string]: string } = {
    'Content-Type': 'application/json',
  };
  if (apiKey) headerObject['X-API-KEY'] = apiKey;
  return headerObject;
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

//

export const fetchNameAvailability = async (name: string, apiKey?: string): Promise<NameAvailability> => {
  const getData = await fetch(`${API_URL}/v${VERSION}/register/check/${name}`, {
    headers: generateHeaders(apiKey || undefined),
  });
  const data = (await getData.json()) as NameAvailability;
  return data;
};

export const fetchNameAvailabilityBatch = async (names: string[], apiKey?: string): Promise<NameAvailability[]> => {
  const getData = await fetch(`${API_URL}/v${VERSION}/register/check`, {
    method: 'POST',
    headers: generateHeaders(apiKey || undefined),
    body: JSON.stringify(names),
  });
  const data = (await getData.json()) as NameAvailability[];
  return data;
};

export const fetchRegistrationTransaction = async (
  names: RegistrationName[],
  sender: string,
  network: Network,
  apiKey?: string,
): Promise<RegistrationResponse> => {
  const getData = await fetch(`${API_URL}/v${VERSION}/register`, {
    method: 'POST',
    headers: generateHeaders(apiKey || undefined),
    body: JSON.stringify({
      names,
      sender,
      network,
    }),
  });
  const data = (await getData.json()) as RegistrationResponse;
  return data;
};

export const fetchTransactionStatus = async (
  tx: `0x${string}`,
  apiKey?: string,
): Promise<{
  tx: `0x${string}`;
  status: RegistrationTransactionStatus;
}> => {
  const getData = await fetch(`${API_URL}/v${VERSION}/register/tx/${tx}`, {
    headers: generateHeaders(apiKey || undefined),
  });
  const data = (await getData.json()) as { tx: `0x${string}`; status: RegistrationTransactionStatus };
  return data;
};
