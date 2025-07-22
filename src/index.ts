export { MemeToken } from './token';
export { TokenMetadata } from './metadata';
export { TOKEN_CONFIG, SOLANA_CONFIG } from './config';

// 사용 예제
import { MemeToken } from './token';
import { TokenMetadata } from './metadata';
import { Keypair } from '@solana/web3.js';

async function example() {
  // 새 키페어 생성 (실제로는 기존 지갑을 사용)
  const payer = Keypair.generate();
  
  // 토큰 생성
  const token = new MemeToken(payer);
  const mintAddress = await token.createToken();
  
  // 토큰 민팅
  await token.mintTokens(1000000); // 100만 개 토큰 민팅
  
  // 메타데이터 생성
  const metadata = new TokenMetadata();
  await metadata.createMetadata(token.getMintAddress(), payer);
  
  console.log('KGAT 토큰 생성 완료!');
  console.log('민트 주소:', mintAddress);
}