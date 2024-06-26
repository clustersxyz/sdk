import {
  fetchAddress,
  fetchAddresses,
  fetchCluster,
  fetchClusters,
  fetchName,
  fetchNameAvailability,
  fetchNameAvailabilityBatch,
  fetchNames,
  fetchRegistrationTransaction,
  fetchTransactionStatus,
} from './api';
import type {
  Cluster,
  NameAvailability,
  Network,
  RegistrationName,
  RegistrationResponse,
  RegistrationTransactionStatusResponse,
  Wallet,
} from './types';

export const Clusters = class {
  apiKey: string | undefined = undefined;

  constructor(obj?: { apiKey: string }) {
    this.apiKey = obj?.apiKey;
  }

  getName = async (address: string): Promise<string | null> => {
    try {
      return await fetchName(address, this.apiKey);
    } catch (err) {
      return null;
    }
  };

  getNames = async (addresses: string[]): Promise<{ address: string; name: string }[]> => {
    try {
      return await fetchNames(addresses, this.apiKey);
    } catch (err) {
      return [];
    }
  };

  getAddress = async (name: string): Promise<Wallet | null> => {
    try {
      const splitCluster = name.split('/');
      return await fetchAddress(splitCluster[0], splitCluster[1] || undefined, this.apiKey);
    } catch {
      return null;
    }
  };

  getAddresses = async (names: string[]): Promise<Wallet[]> => {
    try {
      return await fetchAddresses(names, this.apiKey);
    } catch {
      return [];
    }
  };

  getCluster = async (clusterName: string): Promise<Cluster | null> => {
    try {
      return await fetchCluster(clusterName, this.apiKey);
    } catch {
      return null;
    }
  };

  getClusters = async (clusterNames: string[]): Promise<Cluster[]> => {
    try {
      return await fetchClusters(clusterNames, this.apiKey);
    } catch {
      return [];
    }
  };

  getNameAvailability = async (name: string): Promise<NameAvailability> => {
    try {
      return await fetchNameAvailability(name, this.apiKey);
    } catch {
      return {
        name,
        isAvailable: false,
      };
    }
  };

  getNameAvailabilityBatch = async (names: string[]): Promise<NameAvailability[]> => {
    try {
      return await fetchNameAvailabilityBatch(names, this.apiKey);
    } catch {
      return names.map((name) => ({
        name,
        isAvailable: false,
      }));
    }
  };

  getRegistrationTransaction = async (
    names: RegistrationName[],
    sender: string,
    network: Network,
    referralAddress?: `0x${string}`,
  ): Promise<RegistrationResponse | null> => {
    try {
      return await fetchRegistrationTransaction(names, sender, network, referralAddress, this.apiKey);
    } catch {
      return null;
    }
  };

  getTransactionStatus = async (tx: `0x${string}`): Promise<RegistrationTransactionStatusResponse> => {
    try {
      return await fetchTransactionStatus(tx, this.apiKey);
    } catch {
      return {
        tx,
        status: 'not_found',
      };
    }
  };
};

export const getImageUrl = (name: string) => {
  const splitName = name.toLowerCase().split('/');
  return `https://cdn.clusters.xyz/profile/${splitName[0]}`;
};

export const getProfileUrl = (name: string) => {
  const splitName = name.toLowerCase().split('/');
  return `https://clusters.xyz/${splitName[0]}`;
};

export const normalizeName = (name: string): string => {
  return name.toLowerCase().normalize('NFC');
};

export const isNameValid = (name: string): boolean => {
  const validCharacters = /^[a-zA-Z0-9-_]+$/;
  const normalized = normalizeName(name);
  // Check if name contains only valid characters
  if (!validCharacters.test(normalized)) return false;
  // Is name > 32 bytes
  if (encodeURI(normalized).split(/%..|./).length - 1 > 32) return false;
  return true;
};

const name0 = 'abc123';
const name1 = 'abc_123';
const name2 = 'abc-123';
const name3 = 'abc!123'; // Fails
console.log(isNameValid(name0));
console.log(isNameValid(name1));
console.log(isNameValid(name2));
console.log(isNameValid(name3));
