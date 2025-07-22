import {
  Connection,
  PublicKey,
  Keypair,
  Transaction,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import {
  createUmi,
} from '@metaplex-foundation/umi-bundle-defaults';
import {
  createV1,
  TokenStandard,
  mplTokenMetadata,
} from '@metaplex-foundation/mpl-token-metadata';
import {
  keypairIdentity,
  publicKey as umiPublicKey,
  createSignerFromKeypair,
} from '@metaplex-foundation/umi';
import { TOKEN_CONFIG, SOLANA_CONFIG } from './config';
import { ImageHandler } from './utils/image';

export class OnChainMetadata {
  private connection: Connection;

  constructor() {
    this.connection = new Connection(SOLANA_CONFIG.rpcUrl, 'confirmed');
  }

  async createMetadata(
    mint: PublicKey,
    mintKeypair: Keypair,
    payer: Keypair
  ): Promise<string> {
    try {
      console.log('온체인 메타데이터 등록 시작...');

      // UMI 인스턴스 생성
      const umi = createUmi(SOLANA_CONFIG.rpcUrl).use(mplTokenMetadata());
      
      // 키페어를 UMI 형식으로 변환
      const keypair = umi.eddsa.createKeypairFromSecretKey(payer.secretKey);
      const signer = createSignerFromKeypair(umi, keypair);
      const mintSigner = createSignerFromKeypair(umi, umi.eddsa.createKeypairFromSecretKey(mintKeypair.secretKey));
      umi.use(keypairIdentity(signer));

      // 메타데이터 URI 생성 (실제로는 IPFS나 Arweave 사용 권장)
      const metadataUri = this.createMetadataJson();

      // 메타데이터 생성
      const result = await createV1(umi, {
        mint: mintSigner,
        authority: signer,
        name: TOKEN_CONFIG.name,
        symbol: TOKEN_CONFIG.symbol,
        uri: metadataUri,
        sellerFeeBasisPoints: {
          basisPoints: 0n,
          identifier: '%',
          decimals: 2,
        },
        tokenStandard: TokenStandard.Fungible,
      }).sendAndConfirm(umi);

      console.log('온체인 메타데이터 등록 완료!');
      console.log('거래 서명:', result.signature);
      
      return result.signature.toString();

    } catch (error) {
      console.error('메타데이터 등록 실패:', error);
      throw error;
    }
  }

  private createMetadataJson(): string {
    // GitHub에서 호스팅되는 JSON 파일 URL 반환
    return "https://raw.githubusercontent.com/korean-gat-org/kgat-token/main/metadata.json";
  }
}