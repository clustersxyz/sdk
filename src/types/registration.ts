export type Network =
  | '1'
  | '10'
  | '56'
  | '137'
  | '8453'
  | '81457'
  | '17000'
  | '42161'
  | '43114'
  | '11155111'
  | 'solana';

export type NameAvailability = { name: string; isAvailable: boolean };

export type RegistrationResponseEvm = {
  type: 'evm';
  gasToken: { symbol: string; decimals: number };
  transactionData: { to: `0x${string}`; data: `0x${string}`; value: string };
  registrationFee: string;
  bridgeFee: string;
  names: { name: string; amount: string; amountWei: string }[];
};

export type RegistrationResponseSolana = {
  type: 'solana';
  gasToken: { symbol: string; decimals: 'lamports' };
  transactionData: string[];
  registrationFee: string;
  bridgeFee: string;
  names: { name: string; amount: string; amountWei: string }[];
};

export type RegistrationTransactionStatus = 'not_found' | 'pending' | 'invalid' | 'finalized';
export type RegistrationTransactionStatusResponse = { tx: `0x${string}`; status: RegistrationTransactionStatus };
