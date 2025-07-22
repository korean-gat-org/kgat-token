import { PublicKey, Cluster } from '@solana/web3.js';

export interface TokenConfig {
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: number;
  description: string;
  image: string;
}

export const TOKEN_CONFIG: TokenConfig = {
  name: "KGAT Token",
  symbol: "KGAT",
  decimals: 9,
  totalSupply: 1_000_000_000, // 1 billion tokens
  description: "KGAT represents the iconic traditional Korean hat, reimagined as a Solana meme token bridging culture and crypto.",
  image: "./assets/KGAT-symbol.svg"
};

export const SOLANA_CONFIG = {
  cluster: 'devnet' as Cluster,
  rpcUrl: 'https://api.devnet.solana.com'
};

export const PROGRAM_IDS = {
  TOKEN_PROGRAM_ID: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
  ASSOCIATED_TOKEN_PROGRAM_ID: new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'),
  METADATA_PROGRAM_ID: new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s')
};