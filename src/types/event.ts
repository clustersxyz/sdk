import { AddressType } from './address';

export type EventQuerySortBy = 'newest' | 'oldest';
export type EventsQueryBase = {
  sortBy?: EventQuerySortBy;
  limit?: number;
};
export type EventsQuery = EventsQueryBase & {
  fromTimestamp?: undefined;
  nextPage?: undefined;
};
export type EventsQueryFromTimestamp = EventsQueryBase & {
  fromTimestamp: number;
  nextPage?: undefined;
};
export type EventsQueryNextPage = EventsQueryBase & {
  fromTimestamp?: undefined;
  nextPage: string;
};
export type EventQueryFilter = EventsQuery | EventsQueryFromTimestamp | EventsQueryNextPage;

//

export type RegistrationEvent = {
  eventType: 'register';
  clusterId: number;
  bytes32Address: `0x${string}`;
  address: string;
  addressType: AddressType;
  data: {
    name: string;
    weiAmount: number;
  };
  timestamp: number;
};

export type UpdateWalletEvent = {
  eventType: 'updateWallet';
  clusterId: number;
  bytes32Address: `0x${string}`;
  address: string;
  addressType: AddressType;
  data: {
    name: string;
    isVerified: boolean;
  };
  timestamp: number;
};

export type RemoveWalletEvent = {
  eventType: 'removeWallet';
  clusterId: number;
  bytes32Address: `0x${string}`;
  address: string;
  addressType: AddressType;
  data: null;
  timestamp: number;
};

export type Event = RegistrationEvent | UpdateWalletEvent | RemoveWalletEvent;
export type EventResponse = {
  nextPage?: string;
  items: Event[];
};

export type DAConfig = {
  host: string;
  port: number;
  protocol: 'http' | 'https';
};
