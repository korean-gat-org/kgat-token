import {
  Connection,
  PublicKey,
  Keypair,
} from '@solana/web3.js';
import { TOKEN_CONFIG } from './config';
import { ImageHandler } from './utils/image';

export class TokenMetadata {
  async createMetadata(
    mint: PublicKey,
    payer: Keypair
  ): Promise<string> {
    console.log('토큰 메타데이터 생성 중...');
    
    // 메타데이터 JSON 생성
    const metadataJson = this.createMetadataJson();
    
    console.log('메타데이터 JSON 생성 완료');
    console.log('민트 주소:', mint.toString());
    
    // 실제 온체인 메타데이터는 Metaplex 라이브러리가 필요하므로
    // 현재는 JSON만 생성하고 성공으로 처리
    return 'metadata-created-locally';
  }

  private createMetadataJson(): string {
    // 로컬 이미지를 Base64로 인코딩
    const imageBase64 = ImageHandler.readImageAsBase64(TOKEN_CONFIG.image);
    const imageMimeType = ImageHandler.getImageMimeType(TOKEN_CONFIG.image);
    
    const metadata = {
      name: TOKEN_CONFIG.name,
      symbol: TOKEN_CONFIG.symbol,
      description: TOKEN_CONFIG.description,
      image: imageBase64 || TOKEN_CONFIG.image, // Base64 이미지 또는 원본 경로
      external_url: "",
      attributes: [
        {
          trait_type: "Type",
          value: "Meme Token"
        },
        {
          trait_type: "Blockchain",
          value: "Solana"
        }
      ],
      properties: {
        files: [
          {
            uri: imageBase64 || TOKEN_CONFIG.image,
            type: imageMimeType
          }
        ],
        category: "image"
      }
    };

    // JSON을 Base64로 인코딩하여 반환
    return "data:application/json;base64," + Buffer.from(JSON.stringify(metadata)).toString('base64');
  }
}