import { stringToHex } from 'viem';
import {
  fetchAddress,
  fetchAddresses,
  fetchClusterByAddress,
  fetchClusterByName,
  fetchClustersByName,
  fetchEvents,
  fetchEventsDA,
  fetchName,
  fetchNameAvailability,
  fetchNameAvailabilityBatch,
  fetchNames,
  fetchRegistrationTransaction,
  fetchTransactionStatus,
} from './api';
import { Cluster, Wallet, DAConfig } from './types';
import {
  NameAvailability,
  Network,
  RegistrationName,
  RegistrationResponse,
  RegistrationTransactionStatusResponse,
} from './types/registration';
import { EventQueryFilter, EventResponse } from './types/event';

export const Clusters = class {
  apiKey: string | undefined = undefined;
  daConfig: DAConfig | undefined = undefined;
  isTestnet: boolean = false;

  constructor(obj?: { apiKey?: string; daConfig?: DAConfig; isTestnet?: boolean }) {
    this.apiKey = obj?.apiKey;
    this.daConfig = obj?.daConfig;
    this.isTestnet = obj?.isTestnet || false;
  }

  getName = async (address: string): Promise<string | null> => {
    try {
      return await fetchName(address, this.isTestnet, this.apiKey);
    } catch (err) {
      return null;
    }
  };

  getNames = async (addresses: string[]): Promise<{ address: string; name: string }[]> => {
    try {
      return await fetchNames(addresses, this.isTestnet, this.apiKey);
    } catch (err) {
      return [];
    }
  };

  getAddress = async (name: string): Promise<Wallet | null> => {
    try {
      const splitCluster = name.split('/');
      return await fetchAddress(splitCluster[0], splitCluster[1] || undefined, this.isTestnet, this.apiKey);
    } catch {
      return null;
    }
  };

  getAddresses = async (names: string[]): Promise<Wallet[]> => {
    try {
      return await fetchAddresses(names, this.isTestnet, this.apiKey);
    } catch {
      return [];
    }
  };

  getCluster = async (clusterName: string): Promise<Cluster | null> => {
    try {
      return await fetchClusterByName(clusterName, this.isTestnet, this.apiKey);
    } catch {
      return null;
    }
  };

  getClusters = async (clusterNames: string[]): Promise<Cluster[]> => {
    try {
      return await fetchClustersByName(clusterNames, this.isTestnet, this.apiKey);
    } catch {
      return [];
    }
  };

  getClusterByAddress = async (address: string): Promise<Cluster | null> => {
    try {
      return await fetchClusterByAddress(address, this.isTestnet, this.apiKey);
    } catch {
      return null;
    }
  };

  getNameAvailability = async (name: string): Promise<NameAvailability> => {
    try {
      return await fetchNameAvailability(name, this.isTestnet, this.apiKey);
    } catch {
      return {
        name,
        isAvailable: false,
      };
    }
  };

  getNameAvailabilityBatch = async (names: string[]): Promise<NameAvailability[]> => {
    try {
      return await fetchNameAvailabilityBatch(names, this.isTestnet, this.apiKey);
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
      return await fetchTransactionStatus(tx, this.isTestnet, this.apiKey);
    } catch {
      return {
        tx,
        status: 'not_found',
      };
    }
  };

  getEvents = async (options?: EventQueryFilter): Promise<EventResponse> => {
    if (this.isTestnet) throw Error('This response is not testnet compatible');
    return await fetchEvents(options || {}, this.apiKey);
  };

  getEventsDA = async (startTimestamp?: number, endTimestamp?: number): Promise<EventResponse> => {
    if (this.isTestnet) throw Error('This response is not testnet compatible');
    return await fetchEventsDA(this.daConfig, startTimestamp, endTimestamp);
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
