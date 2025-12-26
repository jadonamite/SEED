const { generateWallet, generateNewAccount } = require('@stacks/wallet-sdk');
const { getAddressFromPrivateKey } = require('@stacks/transactions');

const mnemonic = process.argv[2];

async function getKey() {
  let wallet = await generateWallet({
    secretKey: mnemonic,
    password: '',
  });

  console.log("--- Account Explorer ---");

  for (let i = 0; i < 3; i++) {
    const account = wallet.accounts[i];
    
    const mainnetAddress = getAddressFromPrivateKey(
        account.stxPrivateKey, 
        'mainnet' 
    );

    const testnetAddress = getAddressFromPrivateKey(
        account.stxPrivateKey, 
        'testnet' 
    );

    console.log(`ACCOUNT INDEX ${i}`);
    console.log(`  Private Key:     ${account.stxPrivateKey}`);
    console.log(`  Mainnet Address: ${mainnetAddress}`);
    console.log(`  Testnet Address: ${testnetAddress}`);
    console.log('-----------------------------------');

    wallet = await generateNewAccount(wallet, '');
  }
}

getKey();