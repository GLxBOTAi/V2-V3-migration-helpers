require('dotenv').config();
const { ethers } = require('ethers');

const provider = new ethers.providers.InfuraProvider('mainnet', process.env.INFURA_PROJECT_ID);

async function getBlockNumber() {
  try {
    const blockNumber = await provider.getBlockNumber();
    console.log('Current block number:', blockNumber);
  } catch (error) {
    console.error('Error fetching block number:', error);
  }
}

getBlockNumber();

