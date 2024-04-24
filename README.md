# SLP Kebabs Deployer

![banner](./resources/banner.png)

> :information_source: **Deployment:** https://solscan.io/token/269rCyiVasyQBULUS4hj5Zy8c3HjHyJDo4J6DgrJpd2u
> 
This repository contains the deployment script for SLP $KEBABS token on Solana.







## Requirements
- [Node.js](https://nodejs.org/en): JavaScript runtime
- [NPM](https://www.npmjs.com): Node.js package manager

## Usage

### Installation
To install the scripts, you can use NPM package manager. Open your terminal and run the following commands:

```bash
npm install
```

### Generate Keypair
Before deploying the token, you need to generate a keypair for the wallet. Run the following command:
```bash
npm run gen-wallet
```
This will generate a `secret.json` containing a new keypair. Optionally, you pass a key directly to the deploy script.

### Deploy Token
To deploy the token, run the following command:
```bash
npm run deploy
```