import {
  Connection,
  PublicKey,
  Keypair,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import {
  createInitializeMintInstruction,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
} from '@solana/spl-token';
import { TOKEN_CONFIG, SOLANA_CONFIG } from './config';

export class MemeToken {
  private connection: Connection;
  private payer: Keypair;
  private mint: Keypair;

  constructor(payerKeypair: Keypair) {
    this.connection = new Connection(SOLANA_CONFIG.rpcUrl, 'confirmed');
    this.payer = payerKeypair;
    this.mint = Keypair.generate();
  }

  async createToken(): Promise<string> {
    console.log('토큰 생성 시작...');
    console.log('민트 주소:', this.mint.publicKey.toString());

    // 민트 계정 생성에 필요한 최소 잔액 계산
    const lamports = await getMinimumBalanceForRentExemptMint(this.connection);

    // 거래 생성
    const transaction = new Transaction().add(
      // 민트 계정 생성
      SystemProgram.createAccount({
        fromPubkey: this.payer.publicKey,
        newAccountPubkey: this.mint.publicKey,
        space: MINT_SIZE,
        lamports,
        programId: TOKEN_PROGRAM_ID,
      }),
      // 민트 초기화
      createInitializeMintInstruction(
        this.mint.publicKey,
        TOKEN_CONFIG.decimals,
        this.payer.publicKey,
        this.payer.publicKey,
        TOKEN_PROGRAM_ID
      )
    );

    // 거래 전송 및 확인
    const signature = await sendAndConfirmTransaction(
      this.connection,
      transaction,
      [this.payer, this.mint]
    );

    console.log('토큰 생성 완료! 서명:', signature);
    return this.mint.publicKey.toString();
  }

  async mintTokens(amount: number): Promise<string> {
    console.log(`${amount} 개의 토큰 민팅 시작...`);

    // 연결된 토큰 계정 주소 가져오기
    const associatedTokenAccount = await getAssociatedTokenAddress(
      this.mint.publicKey,
      this.payer.publicKey,
      false,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    );

    // 거래 생성
    const transaction = new Transaction().add(
      // 연결된 토큰 계정 생성
      createAssociatedTokenAccountInstruction(
        this.payer.publicKey,
        associatedTokenAccount,
        this.payer.publicKey,
        this.mint.publicKey,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      ),
      // 토큰 민팅
      createMintToInstruction(
        this.mint.publicKey,
        associatedTokenAccount,
        this.payer.publicKey,
        amount * Math.pow(10, TOKEN_CONFIG.decimals)
      )
    );

    // 거래 전송 및 확인
    const signature = await sendAndConfirmTransaction(
      this.connection,
      transaction,
      [this.payer]
    );

    console.log('토큰 민팅 완료! 서명:', signature);
    return signature;
  }

  getMintAddress(): string {
    return this.mint.publicKey.toString();
  }

  getMintKeypair(): Keypair {
    return this.mint;
  }
}