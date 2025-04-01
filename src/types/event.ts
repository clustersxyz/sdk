type EventQuerySortBy = 'newest' | 'oldest';
type EventsQueryBase = { sortBy?: EventQuerySortBy; limit?: number };
type EventsQuery = EventsQueryBase & { fromTimestamp?: undefined; nextPage?: undefined };
type EventsQueryFromTimestamp = EventsQueryBase & { fromTimestamp: number; nextPage?: undefined };
type EventsQueryNextPage = EventsQueryBase & { fromTimestamp?: undefined; nextPage: string };
export type EventQueryFilter = EventsQuery | EventsQueryFromTimestamp | EventsQueryNextPage;

//

type EventBase = { id: string; from: string; isTestnet: boolean; timestamp: number };

type Event_AddWallet = {
  type: 'ADD_WALLET';
  data: { name: string; address: string; clusterId: string; isVerified: boolean; isBackedUp: boolean };
};
type EventCreateCluster = { type: 'CREATE_CLUSTER'; data: { clusterId: string } };
type Event_ExtendName = { type: 'EXTEND_NAME'; data: { name: string; weiAmount: string } };
type Event_RegisterName = { type: 'REGISTER_NAME'; data: { name: string; weiAmount: string } };
type Event_RemoveWallet = { type: 'REMOVE_WALLET'; data: { address: string; clusterId: string } };
type Event_TransferName = { type: 'TRANSFER_NAME'; data: { to: string; name: string } };
type Event_UpdateWalletName = {
  type: 'UPDATE_WALLET_NAME';
  data: { name: string; address: string; clusterId: string };
};
type Event_VerifyWallet = { type: 'VERIFY_WALLET'; data: { address: string; clusterId: string } };

export type Event = EventBase &
  (
    | Event_AddWallet
    | EventCreateCluster
    | Event_ExtendName
    | Event_RegisterName
    | Event_RemoveWallet
    | Event_TransferName
    | Event_UpdateWalletName
    | Event_VerifyWallet
  );

export type EventResponse = { items: Event[]; nextPage?: string };
