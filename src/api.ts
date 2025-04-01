import {
  NameAvailability,
  Network,
  RegistrationResponseEvm,
  RegistrationResponseSolana,
  RegistrationTransactionStatus,
} from './types/registration';
import { EventQueryFilter, EventResponse } from './types/event';
import { Cluster, ClusterName } from './types/cluster';
import { AuthMessage, AuthSignature } from './types/auth';
import { GenerateWalletResponse, GenerateWalletType } from './types/generate';

const VERSION = '1';
const API_URL = 'https://api.clusters.xyz';

const testnetParam = (isTestnet: boolean) => (isTestnet ? '?testnet=true' : '');

const generateHeaders = (apiKey?: string, authKey?: string): { [key: string]: string } => {
  const headerObject: { [key: string]: string } = { 'Content-Type': 'application/json' };
  if (apiKey) headerObject['X-API-KEY'] = apiKey;
  if (authKey) headerObject['Authorization'] = `Bearer ${authKey}`;
  return headerObject;
};

export const fetchAuthMessage = async (apiKey?: string): Promise<AuthMessage> => {
  const getMessage = await fetch(`${API_URL}/v${VERSION}/auth/message`, {
    headers: generateHeaders(apiKey || undefined),
  });
  return (await getMessage.json()) as AuthMessage;
};

export const fetchAuthToken = async (
  signature: string,
  signingDate: string,
  type: 'evm' | 'solana' | 'polkadot-substrate',
  wallet: string,
  apiKey?: string,
): Promise<{ token: string }> => {
  const getToken = await fetch(`${API_URL}/v${VERSION}/auth/token`, {
    method: 'POST',
    headers: generateHeaders(apiKey || undefined),
    body: JSON.stringify({ signature, signingDate, type, wallet }),
  });
  return (await getToken.json()) as { token: string };
};

export const fetchValidateAuthSignature = async (
  authKey: string,
  apiKey?: string,
): Promise<AuthSignature & { isValid: boolean }> => {
  const validate = await fetch(`${API_URL}/v${VERSION}/auth/validate`, {
    headers: generateHeaders(apiKey || undefined, authKey),
  });
  return (await validate.json()) as AuthSignature & { isValid: boolean };
};

export const fetchName = async (address: string, isTestnet: boolean = false, apiKey?: string): Promise<ClusterName> => {
  const getName = await fetch(`${API_URL}/v${VERSION}/names/address/${address}${testnetParam(isTestnet)}`, {
    headers: generateHeaders(apiKey || undefined),
  });
  const name = (await getName.json()) as ClusterName;
  return name;
};

export const fetchNames = async (
  addresses: string[],
  isTestnet: boolean = false,
  apiKey?: string,
): Promise<ClusterName[]> => {
  const getNames = await fetch(`${API_URL}/v${VERSION}/names/address${testnetParam(isTestnet)}`, {
    method: 'POST',
    headers: generateHeaders(apiKey || undefined),
    body: JSON.stringify(addresses),
  });
  const names = (await getNames.json()) as ClusterName[];
  return names;
};

export const fetchAddresses = async (names: string[], isTestnet: boolean, apiKey?: string): Promise<ClusterName[]> => {
  const getWallets = await fetch(`${API_URL}/v${VERSION}/names${testnetParam(isTestnet)}`, {
    method: 'POST',
    headers: generateHeaders(apiKey || undefined),
    body: JSON.stringify(names.map((name) => ({ name }))),
  });
  const wallets = (await getWallets.json()) as ClusterName[];
  return wallets;
};

//

export const fetchNameAvailabilityBatch = async (
  names: string[],
  isTestnet: boolean = false,
  apiKey?: string,
): Promise<NameAvailability[]> => {
  const getData = await fetch(`${API_URL}/v${VERSION}/names/register/check${testnetParam(isTestnet)}`, {
    method: 'POST',
    headers: generateHeaders(apiKey || undefined),
    body: JSON.stringify(names),
  });
  const data = (await getData.json()) as NameAvailability[];
  return data;
};

export const fetchRegistrationTransactionEvm = async (
  names: { name: string; weiAmount?: string }[],
  sender: string,
  network: Network,
  referralClusterId?: `0x${string}`,
  apiKey?: string,
): Promise<RegistrationResponseEvm> => {
  const getData = await fetch(`${API_URL}/v${VERSION}/names/register/evm`, {
    method: 'POST',
    headers: generateHeaders(apiKey || undefined),
    body: JSON.stringify({ names, sender, network, referralClusterId }),
  });
  const data = (await getData.json()) as RegistrationResponseEvm;
  return data;
};

export const fetchRegistrationTransactionSolana = async (
  names: { name: string; weiAmount?: string }[],
  sender: string,
  referralClusterId?: `0x${string}`,
  apiKey?: string,
): Promise<RegistrationResponseSolana> => {
  const getData = await fetch(`${API_URL}/v${VERSION}/names/register/solana`, {
    method: 'POST',
    headers: generateHeaders(apiKey || undefined),
    body: JSON.stringify({ names, sender, network: 'solana', referralClusterId }),
  });
  const data = (await getData.json()) as RegistrationResponseSolana;
  return data;
};

export const fetchTransactionStatus = async (
  tx: `0x${string}`,
  isTestnet: boolean = false,
  apiKey?: string,
): Promise<{ tx: `0x${string}`; status: RegistrationTransactionStatus }> => {
  const getData = await fetch(`${API_URL}/v${VERSION}/names/register/tx/${tx}${testnetParam(isTestnet)}`, {
    headers: generateHeaders(apiKey || undefined),
  });
  const data = (await getData.json()) as { tx: `0x${string}`; status: RegistrationTransactionStatus };
  return data;
};

//

export const fetchEvents = async (queryParams: EventQueryFilter, apiKey?: string): Promise<EventResponse> => {
  const queryString = Object.keys(queryParams)
    // @ts-ignore
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
    .join('&');

  const getData = await fetch(`${API_URL}/v${VERSION}/events?${queryString}`, {
    headers: generateHeaders(apiKey || undefined),
  });
  const data = (await getData.json()) as EventResponse;
  return data;
};

//

export const fetchCreateCluster = async (
  authToken: string,
  isTestnet: boolean,
  apiKey?: string,
): Promise<{ id: string }> => {
  const getData = await fetch(`${API_URL}/v${VERSION}/clusters${testnetParam(isTestnet)}`, {
    method: 'POST',
    headers: generateHeaders(apiKey || undefined, authToken),
  });
  const data = (await getData.json()) as { id: string };
  return data;
};

export const fetchClusterById = async (id: string, isTestnet: boolean, apiKey?: string): Promise<Cluster> => {
  const getData = await fetch(`${API_URL}/v${VERSION}/clusters/id/${id}${testnetParam(isTestnet)}`, {
    method: 'GET',
    headers: generateHeaders(apiKey || undefined),
  });
  const data = (await getData.json()) as Cluster;
  return data;
};

export const fetchClusterByName = async (name: string, isTestnet: boolean, apiKey?: string): Promise<Cluster> => {
  const getData = await fetch(`${API_URL}/v${VERSION}/clusters/name/${name}${testnetParam(isTestnet)}`, {
    method: 'GET',
    headers: generateHeaders(apiKey || undefined),
  });
  const data = (await getData.json()) as Cluster;
  return data;
};

export const fetchClusterIdByAddress = async (
  address: string,
  isTestnet: boolean,
  apiKey?: string,
): Promise<{ clusterId: string }> => {
  const getData = await fetch(`${API_URL}/v${VERSION}/clusters/address/${address}${testnetParam(isTestnet)}`, {
    method: 'GET',
    headers: generateHeaders(apiKey || undefined),
  });
  const data = (await getData.json()) as { clusterId: string };
  return data;
};

export const fetchAddWallets = async (
  wallets: { address: string; name: string; isPrivate: boolean }[],
  authToken: string,
  isTestnet: boolean,
  apiKey?: string,
): Promise<{ success: boolean }> => {
  const getData = await fetch(`${API_URL}/v${VERSION}/clusters/wallets${testnetParam(isTestnet)}`, {
    method: 'POST',
    headers: generateHeaders(apiKey || undefined, authToken),
    body: JSON.stringify(wallets),
  });
  const data = (await getData.json()) as { success: boolean };
  return data;
};

export const fetchUpdateWalletNames = async (
  wallets: { address: string; name: string }[],
  authToken: string,
  isTestnet: boolean,
  apiKey?: string,
): Promise<{ success: boolean }> => {
  const getData = await fetch(`${API_URL}/v${VERSION}/clusters/wallets/names${testnetParam(isTestnet)}`, {
    method: 'PUT',
    headers: generateHeaders(apiKey || undefined, authToken),
    body: JSON.stringify(wallets),
  });
  const data = (await getData.json()) as { success: boolean };
  return data;
};

export const fetchRemoveWallets = async (
  wallets: string[],
  authToken: string,
  isTestnet: boolean,
  apiKey?: string,
): Promise<{ success: boolean }> => {
  const getData = await fetch(`${API_URL}/v${VERSION}/clusters/wallets${testnetParam(isTestnet)}`, {
    method: 'DELETE',
    headers: generateHeaders(apiKey || undefined, authToken),
    body: JSON.stringify(wallets),
  });
  const data = (await getData.json()) as { success: boolean };
  return data;
};

export const fetchGenerateWallet = async (
  type: GenerateWalletType,
  name: string,
  isPrivate: boolean,
  authToken: string,
  isTestnet: boolean,
  passphrase?: string,
  apiKey?: string,
): Promise<GenerateWalletResponse> => {
  const getData = await fetch(`${API_URL}/v${VERSION}/clusters/generate/wallet${testnetParam(isTestnet)}`, {
    method: 'POST',
    headers: generateHeaders(apiKey || undefined, authToken),
    body: JSON.stringify({ type, name, isPrivate, passphrase }),
  });
  const data = (await getData.json()) as GenerateWalletResponse;
  return data;
};

export const fetchVerifyWallet = async (
  clusterId: string,
  authToken: string,
  isTestnet: boolean,
  apiKey?: string,
): Promise<{ success: boolean }> => {
  const getData = await fetch(`${API_URL}/v${VERSION}/clusters/verify/${clusterId}${testnetParam(isTestnet)}`, {
    method: 'POST',
    headers: generateHeaders(apiKey || undefined, authToken),
  });
  const data = (await getData.json()) as { success: boolean };
  return data;
};
