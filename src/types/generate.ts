export type GenerateWalletType =
  | 'evm'
  | 'solana'
  | 'bitcoin'
  | 'ripple'
  | 'aptos'
  | 'dogecoin'
  | 'litecoin'
  | 'tron'
  | 'near'
  | 'cosmos'
  | 'ton'
  | 'algorand';

export type GenerateWalletResponse = { type: GenerateWalletType; address: string; name: string; share: string };
