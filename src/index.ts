import { fetchAddress, fetchAddresses, fetchCluster, fetchClusters, fetchName, fetchNames } from './api';
import { Cluster, Wallet } from './types';

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
};
