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
async function sendEther(toAddress, usdAmount) {
  try {
    // Adjusted ETH price
    const ethPriceInUsd = 2000; // Adjusted to $2000 per ETH

    // Calculate the amount to send in ETH
    const amountInEth = usdAmount / ethPriceInUsd;

    // Estimate gas price
    const gasPrice = await infuraProvider.getGasPrice();
    const gasLimit = ethers.utils.hexlify(21000); // Gas limit for a standard transaction

    // Calculate gas cost in ETH
    const gasCost = gasPrice.mul(gasLimit);
    const gasCostInEth = ethers.utils.formatEther(gasCost);

    // Ensure the total cost (value + gas fee) is below $100
    const totalCostInEth = parseFloat(gasCostInEth) + amountInEth;

    console.log(`Estimated gas cost in ETH: ${gasCostInEth}`);
    console.log(`Total transaction cost in ETH: ${totalCostInEth}`);
    console.log(`Total transaction cost in USD: ${totalCostInEth * ethPriceInUsd}`);

    if (totalCostInEth * ethPriceInUsd > 100) {
      throw new Error(`Total cost exceeds $100: ${totalCostInEth * ethPriceInUsd}`);
    }

    // Transaction details
    const transaction = {
      to: toAddress,
      value: ethers.utils.parseEther(amountInEth.toFixed(18).toString()),
      gasLimit: gasLimit,
      gasPrice: gasPrice,
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
const toAddress = '0xf61Bf210a39478c962240a35dF45AA1Bc7C965B1'; // Valid target address
const amountToSendInUsd = 95; // Amount in USD, reduced to fit within the $100 limit
sendEther(toAddress, amountToSendInUsd);

