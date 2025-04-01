type BitcoinAddressType = 'p2pkh' | 'p2sh' | 'p2wpkh' | 'p2wsh' | 'p2tr';
type LitecoinAddressType = 'p2pkh' | 'p2sh' | 'p2wpkh' | 'p2wsh';
type RippleAddressType = 'classic' | 'x';
export type AddressType =
  | `bitcoin-${BitcoinAddressType}`
  | 'evm'
  | 'cosmos'
  | `cosmos-${string}`
  | 'solana'
  | 'near'
  | 'dogecoin'
  | `litecoin-${LitecoinAddressType}`
  | 'aptos'
  | `ripple-${RippleAddressType}`
  | 'tron'
  | 'hedera'
  | 'stacks'
  | 'algorand'
  | 'filecoin'
  | 'ton'
  | 'arweave'
  | 'polkadot-substrate'
  | null;
