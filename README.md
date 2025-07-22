# KGAT 밈토큰 (Solana)

Solana 블록체인 기반의 밈토큰 프로젝트입니다.

## 기능

- SPL 토큰 생성 및 민팅
- 토큰 메타데이터 설정
- devnet 환경에서 배포

## 설치

```bash
npm install
```

## 사용법

### 1. 프로젝트 빌드
```bash
npm run build
```

### 2. 토큰 배포
```bash
npm run deploy
```

배포 후 `deploy-result.json` 파일에서 토큰 정보를 확인할 수 있습니다.

### 3. 개발 모드 실행
```bash
npm run dev
```

## 토큰 정보

- **이름**: KGAT Token
- **심볼**: KGAT
- **소수점**: 9
- **총 공급량**: 1,000,000,000 (10억 개)
- **네트워크**: Solana Devnet

## 파일 구조

```
src/
├── config.ts       # 토큰 및 네트워크 설정
├── token.ts        # SPL 토큰 생성 및 민팅 로직
├── metadata.ts     # 토큰 메타데이터 관리
├── deploy.ts       # 배포 스크립트
└── index.ts        # 메인 모듈 및 예제
```

## 이미지 설정

토큰 심볼 이미지를 추가하려면:

1. `assets/` 폴더에 이미지 파일을 넣으세요 (예: `KGAT-symbol.svg`)
2. `src/config.ts`에서 `image` 경로를 업데이트하세요

지원 이미지 형식: PNG, JPG, GIF, SVG

## 주의사항

- 현재 devnet 환경으로 설정되어 있습니다
- mainnet 배포 시 `src/config.ts`에서 네트워크 설정을 변경하세요
- 실제 사용 시에는 충분한 SOL이 지갑에 있어야 합니다
- 로컬 이미지는 Base64로 인코딩되어 메타데이터에 포함됩니다
- 더 나은 성능을 위해서는 IPFS나 Arweave 사용을 권장합니다

## 라이센스

MIT