import { percentAmount, generateSigner, signerIdentity, createSignerFromKeypair } from '@metaplex-foundation/umi'
import { TokenStandard, createAndMint } from '@metaplex-foundation/mpl-token-metadata'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { mplCandyMachine } from "@metaplex-foundation/mpl-candy-machine";
import  "@solana/web3.js";
import { config } from 'dotenv';

import secret from '../guideSecret.json';

const name = "Kebabs"
const symbol = "KEBABS"
const decimals = 9
const supply = 1_000_000_000

// Load .env file.
config();

// Establish Solana Connection.
const umiUrl = process.env.RPC_URL;
if (!umiUrl) {
  console.error('UMI_URL environment variable is not defined.');
  process.exit(1);
}
const umi = createUmi(umiUrl);

// Initialize the signer with the secret key.
const userWallet = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(secret));
const userWalletSigner = createSignerFromKeypair(umi, userWallet);

// Creating the metadata variable.
const metadata = {
    name: name,
    symbol: symbol,
    uri: "https://peach-key-ferret-767.mypinata.cloud/ipfs/QmahUd5bioA8t6UYSFUmkQTyWZYktAD4ZAiRKZJENuZma6",
};

// Create a Mint Program Derived Address for our token.
// Learn about what are PDAs in Solana and what is Mint PDA for Tokens on Solana:
// - https://www.quicknode.com/guides/solana-development/anchor/how-to-use-program-derived-addresses#overview-of-pdas
// - https://developers.metaplex.com/token-metadata/mint#creating-accounts
// Below, we are creating a new Mint PDA and asking the umi client to use our wallet initialized earlier from secret as a signer and use Candy Machine to mint tokens.
const mint = generateSigner(umi);
umi.use(signerIdentity(userWalletSigner));
umi.use(mplCandyMachine())

// Show balance of sender:

// Send a transaction to deploy the Mint PDA and mint tokens.
console.log("Minting ", supply ," tokens...");
createAndMint(umi, {
    mint,
    authority: umi.identity,
    name: metadata.name,
    symbol: metadata.symbol,
    uri: metadata.uri,
    sellerFeeBasisPoints: percentAmount(0),
    decimals: decimals,
    amount: supply * Math.pow(10, decimals),
    tokenOwner: userWallet.publicKey,
    tokenStandard: TokenStandard.Fungible,
})
.sendAndConfirm(umi).then(() => {
    console.log("Successfully minted ", supply ," tokens (", mint.publicKey, ")");
});