require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork:"testnet",
  solidity: "0.8.28",
  networks: {
    testnet: {
      url: "https://sepolia.infura.io/v3/f1f2bb8ce3f14b108ba398b2a144a349",
      accounts:[
        // ADD YOUR WALLET HERE
      ]
    }
  }
};
