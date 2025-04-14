import { stringToHex } from 'viem';
import {
  fetchAddresses,
  fetchAddWallets,
  fetchAuthMessage,
  fetchAuthToken,
  fetchClusterById,
  fetchClusterByName,
  fetchClusterIdByAddress,
  fetchCreateCluster,
  fetchEvents,
  fetchGenerateWallet,
  fetchName,
  fetchNameAvailabilityBatch,
  fetchNames,
  fetchRegisterCommunityCluster,
  fetchRegistrationTransactionEvm,
  fetchRegistrationTransactionSolana,
  fetchRemoveWallets,
  fetchTransactionStatus,
  fetchUpdateWalletNames,
  fetchValidateAuthSignature,
  fetchVerifyWallet,
} from './api';
import {
  NameAvailability,
  Network,
  RegistrationResponseEvm,
  RegistrationResponseSolana,
  RegistrationTransactionStatusResponse,
} from './types/registration';
import { EventQueryFilter, EventResponse } from './types/event';
import { Cluster, ClusterName } from './types/cluster';
import { AuthMessage, AuthSignature } from './types/auth';
import { GenerateWalletResponse } from './types/generate';

export const Clusters = class {
  apiKey: string | undefined = undefined;
  isTestnet: boolean = false;

  constructor(obj?: { apiKey?: string; isTestnet?: boolean }) {
    this.apiKey = obj?.apiKey;
    this.isTestnet = obj?.isTestnet || false;
  }

  getAuthMessage = async (): Promise<AuthMessage> => {
    return await fetchAuthMessage(this.apiKey);
  };

  getAuthToken = async (
    signature: string,
    signingDate: string,
    type: 'evm' | 'solana' | 'polkadot-substrate',
    wallet: string,
  ): Promise<{ token: string }> => {
    return await fetchAuthToken(signature, signingDate, type, wallet, this.apiKey);
  };

  validateAuthToken = async (token: string): Promise<AuthSignature & { isValid: boolean }> => {
    return await fetchValidateAuthSignature(token, this.apiKey);
  };

  getName = async (address: string): Promise<ClusterName> => {
    return await fetchName(address, this.isTestnet, this.apiKey);
  };

  getNames = async (addresses: string[]): Promise<ClusterName[]> => {
    try {
      return await fetchNames(addresses, this.isTestnet, this.apiKey);
    } catch {
      return [];
    }
  };

  getAddresses = async (names: string[]): Promise<ClusterName[]> => {
    try {
      return await fetchAddresses(names, this.isTestnet, this.apiKey);
    } catch {
      return [];
    }
  };

  getNameAvailability = async (names: string[]): Promise<NameAvailability[]> => {
    try {
      return await fetchNameAvailabilityBatch(names, this.isTestnet, this.apiKey);
    } catch {
      return names.map((name) => ({ name, isAvailable: false }));
    }
  };

  getRegistrationTransactionEvm = async (
    names: { name: string; weiAmount?: string }[],
    sender: string,
    network: Network,
    referralClusterId?: `0x${string}`,
  ): Promise<RegistrationResponseEvm | null> => {
    try {
      return await fetchRegistrationTransactionEvm(names, sender, network, referralClusterId, this.apiKey);
    } catch {
      return null;
    }
  };

  getRegistrationTransactionSolana = async (
    names: { name: string; weiAmount?: string }[],
    sender: string,
    referralClusterId?: `0x${string}`,
  ): Promise<RegistrationResponseSolana | null> => {
    try {
      return await fetchRegistrationTransactionSolana(names, sender, referralClusterId, this.apiKey);
    } catch {
      return null;
    }
  };

  getTransactionStatus = async (tx: `0x${string}`): Promise<RegistrationTransactionStatusResponse> => {
    try {
      return await fetchTransactionStatus(tx, this.isTestnet, this.apiKey);
    } catch {
      return { tx, status: 'not_found' };
    }
  };

  getEvents = async (options?: EventQueryFilter): Promise<EventResponse> => {
    return await fetchEvents(options || {}, this.apiKey);
  };

  createCluster = async (authToken: string): Promise<{ id: string } | null> => {
    try {
      return await fetchCreateCluster(authToken, this.isTestnet, this.apiKey);
    } catch {
      return null;
    }
  };

  getClusterById = async (id: string): Promise<Cluster | null> => {
    try {
      return await fetchClusterById(id, this.isTestnet, this.apiKey);
    } catch {
      return null;
    }
  };

  getClusterByName = async (name: string): Promise<Cluster | null> => {
    try {
      return await fetchClusterByName(name, this.isTestnet, this.apiKey);
    } catch {
      return null;
    }
  };

  getClusterIdByAddress = async (address: string): Promise<{ clusterId: string | null }> => {
    try {
      return await fetchClusterIdByAddress(address, this.isTestnet, this.apiKey);
    } catch {
      return { clusterId: null };
    }
  };

  addWallets = async (
    wallets: { address: string; name: string; isPrivate: boolean }[],
    authToken: string,
  ): Promise<{ success: boolean }> => {
    try {
      return await fetchAddWallets(wallets, authToken, this.isTestnet, this.apiKey);
    } catch {
      return { success: false };
    }
  };

  updateWalletNames = async (
    wallets: { address: string; name: string }[],
    authToken: string,
  ): Promise<{ success: boolean }> => {
    try {
      return await fetchUpdateWalletNames(wallets, authToken, this.isTestnet, this.apiKey);
    } catch {
      return { success: false };
    }
  };

  removeWallets = async (wallets: string[], authToken: string): Promise<{ success: boolean }> => {
    try {
      return await fetchRemoveWallets(wallets, authToken, this.isTestnet, this.apiKey);
    } catch {
      return { success: false };
    }
  };

  verifyWallet = async (clusterId: string, authToken: string): Promise<{ success: boolean }> => {
    try {
      return await fetchVerifyWallet(clusterId, authToken, this.isTestnet, this.apiKey);
    } catch {
      return { success: false };
    }
  };

  generateWallet = async (
    type:
      | 'evm'
      | 'solana'
      | 'bitcoin'
      | 'ripple'
      | 'aptos'
      | 'dogecoin'
      | 'litecoin'
      | 'tron'
      | 'near'
      | 'cosmos'
      | 'ton'
      | 'algorand',
    name: string,
    isPrivate: boolean,
    authToken: string,
    passphrase?: string,
  ): Promise<GenerateWalletResponse> => {
    return await fetchGenerateWallet(type, name, isPrivate, authToken, this.isTestnet, passphrase, this.apiKey);
  };

  registerCommunityCluster = async (
    communityName: string,
    name: string,
    authToken: string,
    walletAddress?: string,
  ): Promise<{ clusterName: string; owner: string }> => {
    return await fetchRegisterCommunityCluster(
      communityName,
      name,
      authToken,
      this.isTestnet,
      walletAddress,
      this.apiKey,
    );
  };
};

export const getImageUrl = (name: string) => {
  return `https://cdn.clusters.xyz/profile-image/${name.toLowerCase()}`;
};

export const getProfileUrl = (name: string) => {
  return `https://clusters.xyz/${name.toLowerCase()}`;
};

export const normalizeName = (name: string): string => {
  return name.toLowerCase().normalize('NFC');
};

export const isNameValid = (name: string): boolean => {
  const validCharacters = validNameRegex();
  const normalized = normalizeName(name);
  // Check if name contains only valid characters
  if (!validCharacters.test(normalized)) return false;

  // Is name > 32 bytes
  try {
    if (stringToHex(normalized, { size: 32 })) return true;
  } catch {
    return false;
  }

  return true;
};

export const validNameRegex = () => /^[a-zA-Z0-9\-_]+$/;
