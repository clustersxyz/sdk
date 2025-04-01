export type AuthMessage = { message: string; signingDate: string };

export type AuthSignature = {
  signature: string;
  signingDate: string;
  type: 'evm' | 'solana' | 'polkadot-substrate';
  wallet: string;
};
