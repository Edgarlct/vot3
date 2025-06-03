const hre = require("hardhat");

async function main() {
  const [owner] = await hre.ethers.getSigners();
  const vote = await hre.ethers.getContractFactory("Vote");
  const voteInstance = await vote.connect(owner).deploy();

  await voteInstance.waitForDeployment();
  console.log("Deploying contract with address", owner.address);
  const log = await voteInstance.test();
  console.log("Test function output:", log);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
