import { fetchAddress, fetchCluster, fetchName } from './api';
import { Cluster, Wallet } from './types';

export const Clusters = class {
  constructor() {}

  getName = async (address: string): Promise<string | null> => {
    try {
      return await fetchName(address);
    } catch (err) {
      return null;
    }
  };

  getAddress = async (name: string): Promise<Wallet | null> => {
    try {
      const splitCluster = name.split('/');
      return await fetchAddress(splitCluster[0], splitCluster[1] || undefined);
    } catch {
      return null;
    }
  };

  getCluster = async (clusterName: string): Promise<Cluster | null> => {
    try {
      return await fetchCluster(clusterName);
    } catch {
      return null;
    }
  };
};
