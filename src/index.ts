import { ResolveWalletsItem, getResolveAddress, getResolveName, getResolveWallets } from './api';
import { Wallet } from './types';

export const Clusters = class {
  constructor() {}

  resolveName = async (address: string): Promise<string | null> => {
    try {
      return await getResolveName(address);
    } catch (err) {
      return null;
    }
  };

  resolveAddress = async (cluster: string): Promise<Wallet | null> => {
    try {
      const splitCluster = cluster.split('/');
      return await getResolveAddress(splitCluster[0], splitCluster[1] || undefined);
    } catch {
      return null;
    }
  };

  resolveWallets = async (clusterName: string): Promise<ResolveWalletsItem[]> => {
    try {
      return await getResolveWallets(clusterName);
    } catch {
      return [];
    }
  };
};
