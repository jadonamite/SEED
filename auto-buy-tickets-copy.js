import 'dotenv/config';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// FIX 1: Import PostConditionMode
const { makeContractCall, broadcastTransaction, AnchorMode, PostConditionMode } = require('@stacks/transactions');
const { StacksTestnet, StacksMainnet } = require('@stacks/network');

// Configuration
const PRIVATE_KEY = process.env.PRIVATE_KEY_2;
const NETWORK_ENV = process.env.NETWORK || 'testnet';
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const CONTRACT_NAME = process.env.CONTRACT_NAME;

const NETWORK = NETWORK_ENV === 'mainnet' ? new StacksMainnet() : new StacksTestnet();

// Ticket counter
let ticketCount = 1;

async function buyTickets(count) {
  console.log(`\n🎟️  Buying ${count} ticket(s) on ${NETWORK_ENV}...`);
  
  try {
    for (let i = 0; i < count; i++) {
      const txOptions = {
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: 'buy-ticket',
        functionArgs: [],
        senderKey: PRIVATE_KEY,
        network: NETWORK,
        anchorMode: AnchorMode.Any,
        // FIX 2: Allow the contract to move your STX
        postConditionMode: PostConditionMode.Allow, 
      };

      const transaction = await makeContractCall(txOptions);
      const broadcastResponse = await broadcastTransaction(transaction, NETWORK);
      
      if (broadcastResponse.error) {
         console.error(`❌ Transaction failed: ${broadcastResponse.reason}`);
         continue;
      }

      console.log(`✅ Ticket ${i + 1}/${count} purchased!`);
      const txId = typeof broadcastResponse === 'string' ? broadcastResponse : broadcastResponse.txid;
      console.log(`   TX ID: 0x${txId}`);
      
      if (i < count - 1) {
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }
    
    console.log(`\n✨ Batch complete!`);
    
  } catch (error) {
    console.error('❌ Script Error:', error);
  }
}

async function runBot() {
  console.log(`\n🤖 Auto Ticket Buyer Started`);
  console.log(`📍 Target: ${CONTRACT_ADDRESS}.${CONTRACT_NAME}`);
  console.log(`⏰ Schedule: Every 3 minutes`); 
  
  await buyTickets(ticketCount);
  
  ticketCount++;
  if (ticketCount > 10) {
    ticketCount = 1; 
    console.log('🔄 Resetting batch size to 1');
  }
  
  console.log(`\n⏳ Waiting 3 minutes...`); 
}

runBot();
setInterval(runBot, 3 * 60 * 1000);