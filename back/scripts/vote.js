const hre = require("hardhat");

async function main() {
  const [owner] = await hre.ethers.getSigners();
  const vote = await hre.ethers.getContractFactory("Vote");
  const contractAddress = "0xE5E7EC65d79C3F722B6F099484Ec2439543579f3";
  const voteInstance = await vote.attach(contractAddress);


  // Set a new vote
  const tCreate = await voteInstance.connect(owner).createProposal("Web3 is it the future?","testC", 1749366990);
  await tCreate.wait();

  const proposals = await voteInstance.getAllProposals();
  const formattedProposals = proposals.map((debate) => ({
    id: debate[0],
    question: debate[1],
    category: debate[2],
    expiatedAt: debate[3],
    creator: debate[4],
    yesVotesCount: debate[5],
    noVotesCount: debate[6],
    voteAnswer: debate[7],
    hasVoted: debate[8]
  }));
  console.log("Proposals:", formattedProposals);



  // Vote for a proposal
  const proposalId = formattedProposals[0].id;
  const tVote = await voteInstance.connect(owner).vote(proposalId, true);
  await tVote.wait();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
