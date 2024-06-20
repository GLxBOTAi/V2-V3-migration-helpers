kconst HDWalletProvider = require('@truffle/hdwallet-provider');
const privateKeys = ['your_private_key'];

module.exports = {
  networks: {
    mainnet: {
      provider: () => new HDWalletProvider(privateKeys, `https://eth-mainnet.g.alchemy.com/v2/your_alchemy_key`),
      network_id: 1,
      gas: 5500000,
      gasPrice: 20000000000, // 20 gwei
    },
  },
  // Other configurations
};

