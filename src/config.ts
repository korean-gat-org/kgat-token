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
  name: "Korean Gat",
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
