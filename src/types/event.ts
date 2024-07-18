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
  bytes32Address: `0x${string}`;
  address: string;
  addressType: AddressType;
  clusterName: string;
  data: {
    weiAmount: number;
  };
  timestamp: number;
};
export type UpdateEvent = {
  eventType: 'update';
  bytes32Address: `0x${string}`;
  address: string;
  addressType: AddressType;
  clusterName: string | null;
  data: {
    name: string | null;
    isVerified: boolean;
  };
  timestamp: number;
};
export type Event = RegistrationEvent | UpdateEvent;
export type EventResponse = {
  nextPage?: string;
  items: Event[];
};
