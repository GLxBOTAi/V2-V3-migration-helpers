// Load environment variables
require('dotenv').config();

const { ethers } = require('ethers');

// Get Infura project details from environment variables
const infuraProjectId = process.env.INFURA_PROJECT_ID;
const privateKey = process.env.PRIVATE_KEY;

// Create an Infura provider
const infuraProvider = new ethers.providers.InfuraProvider('mainnet', infuraProjectId);

// Connect to the network using your private key
const wallet = new ethers.Wallet(privateKey, infuraProvider);

// Function to get the current block number
async function getBlockNumber() {
  try {
    const blockNumber = await infuraProvider.getBlockNumber();
    console.log('Current block number:', blockNumber);
  } catch (error) {
    console.error('Error fetching block number:', error);
  }
}

// Function to get the balance of an address
async function getBalance(address) {
  try {
    const balance = await infuraProvider.getBalance(address);
    console.log(`Balance of ${address}:`, ethers.utils.formatEther(balance), 'ETH');
  } catch (error) {
    console.error('Error fetching balance:', error);
  }
}

// Function to send Ether
async function sendEther(toAddress, amount) {
  try {
    // Convert amount to wei
    const amountInWei = ethers.utils.parseEther(amount.toString());

    // Transaction details
    const transaction = {
      to: toAddress,
      value: amountInWei,
      gasLimit: ethers.utils.hexlify(21000), // Gas limit for a standard transaction
      gasPrice: ethers.utils.parseUnits('10', 'gwei'), // You can adjust the gas price
    };

    // Send transaction
    const tx = await wallet.sendTransaction(transaction);
    console.log('Transaction hash:', tx.hash);

    // Wait for the transaction to be mined
    await tx.wait();
    console.log('Transaction mined!');

    // Check the updated balance
    getBalance(wallet.address);
  } catch (error) {
    console.error('Error sending Ether:', error);
  }
}

// Example usage
getBlockNumber();

// Replace with a valid Ethereum address
const ethereumAddress = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';
getBalance(ethereumAddress);

// Send Ether
const toAddress = '0xf61Bf210a39478c962240a35dF45AA1Bc7C965B1'; // Target address
const amountToSend = 8.01; // Amount in ETH
sendEther(toAddress, amountToSend);

