import { Keypair, PublicKey } from '@solana/web3.js';
import fs from 'fs';
import { MemeToken } from './token';
import { OnChainMetadata } from './metadata-onchain';
import { TOKEN_CONFIG } from './config';

async function deploy() {
  try {
    console.log('=== KGAT 밈토큰 배포 시작 ===');
    
    // 지갑 키페어 로드 또는 생성
    let payer: Keypair;
    const walletPath = './wallet.json';
    
    if (fs.existsSync(walletPath)) {
      console.log('기존 지갑 로드 중...');
      const walletData = JSON.parse(fs.readFileSync(walletPath, 'utf8'));
      payer = Keypair.fromSecretKey(new Uint8Array(walletData));
    } else {
      console.log('새 지갑 생성 중...');
      payer = Keypair.generate();
      fs.writeFileSync(walletPath, JSON.stringify(Array.from(payer.secretKey)));
      console.log('새 지갑이 wallet.json에 저장되었습니다.');
    }

    console.log('지갑 주소:', payer.publicKey.toString());

    // 토큰 생성
    const token = new MemeToken(payer);
    const mintAddress = await token.createToken();
    
    console.log('토큰 민트 주소:', mintAddress);

    // 토큰 민팅
    await token.mintTokens(TOKEN_CONFIG.totalSupply);

    // 온체인 메타데이터 생성
    const metadata = new OnChainMetadata();
    const mintPublicKey = new PublicKey(token.getMintAddress());
    const mintKeypair = token.getMintKeypair();
    await metadata.createMetadata(mintPublicKey, mintKeypair, payer);

    // 결과 저장
    const deployResult = {
      tokenName: TOKEN_CONFIG.name,
      symbol: TOKEN_CONFIG.symbol,
      mintAddress: mintAddress,
      deployerAddress: payer.publicKey.toString(),
      totalSupply: TOKEN_CONFIG.totalSupply,
      decimals: TOKEN_CONFIG.decimals,
      deployTime: new Date().toISOString(),
      network: 'devnet'
    };

    fs.writeFileSync('./deploy-result.json', JSON.stringify(deployResult, null, 2));
    
    console.log('=== 배포 완료 ===');
    console.log('토큰 정보:');
    console.log(`- 이름: ${TOKEN_CONFIG.name}`);
    console.log(`- 심볼: ${TOKEN_CONFIG.symbol}`);
    console.log(`- 민트 주소: ${mintAddress}`);
    console.log(`- 총 공급량: ${TOKEN_CONFIG.totalSupply.toLocaleString()}`);
    console.log('배포 결과가 deploy-result.json에 저장되었습니다.');
    
  } catch (error) {
    console.error('배포 중 오류 발생:', error);
    process.exit(1);
  }
}

// 스크립트 직접 실행 시 배포 함수 호출
if (require.main === module) {
  deploy();
}