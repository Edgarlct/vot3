// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

contract Vote {

    struct Proposal {
        string question;
        string category;
        uint256 expiatedAt;
        address creator;
        mapping(address => bool) yesVotes;
        uint256 yesVotesCount;
        mapping(address => bool) noVotes;
        uint256 noVotesCount;
    }

    struct ProposalView {
        uint256 id;
        string question;
        string category;
        uint256 expiatedAt;
        address creator;
        uint256 yesVotesCount;
        uint256 noVotesCount;
        bool voteAnswer;
        bool hasVoted;
    }

    mapping(uint256 => Proposal) public proposals;
    uint256 public proposalCount;

    constructor() {}

    function createProposal(string memory question, string memory category, uint256 expiatedAt) public returns (uint256) {
        require(expiatedAt > block.timestamp, "Expiration time must be in the future");

        Proposal storage newProposal = proposals[proposalCount];
        newProposal.question = question;
        newProposal.category = category;
        newProposal.expiatedAt = expiatedAt;
        newProposal.creator = msg.sender;
        newProposal.yesVotesCount = 0;
        newProposal.noVotesCount = 0;

        proposalCount++;
        return proposalCount - 1; // Return the ID of the newly created proposal
    }

    function hasVoted(uint256 proposalId, address voter) public view returns (bool) {
        require(proposalId < proposalCount, "Proposal does not exist");
        Proposal storage proposal = proposals[proposalId];
        return proposal.yesVotes[voter] || proposal.noVotes[voter];
    }

    function getVote(uint256 proposalId, address voter) public view returns (bool, bool) {
        require(proposalId < proposalCount, "Proposal does not exist");
        Proposal storage proposal = proposals[proposalId];
        return (proposal.yesVotes[voter], proposal.noVotes[voter]);
    }

    function vote(uint256 proposalId, bool voteYes) public {
        require(proposalId < proposalCount, "Proposal does not exist");
        Proposal storage proposal = proposals[proposalId];
        require(block.timestamp < proposal.expiatedAt, "Voting period has expired");
        require(!hasVoted(proposalId, msg.sender), "You have already voted on this proposal");

        if (voteYes) {
            proposal.yesVotes[msg.sender] = true;
            proposal.yesVotesCount++;
        } else {
            proposal.noVotes[msg.sender] = true;
            proposal.noVotesCount++;
        }
    }

    function getProposal(uint256 proposalId, address voter) public view returns (ProposalView memory) {
        require(proposalId < proposalCount, "Proposal does not exist");
        Proposal storage proposal = proposals[proposalId];

        uint256 yesVotesCount = proposal.yesVotesCount;
        uint256 noVotesCount = proposal.noVotesCount;

        bool hasVotedOnProposal = hasVoted(proposalId, voter);
        bool voteAnswer = false;
        if (hasVotedOnProposal) {
            (bool yesVote, bool noVote) = getVote(proposalId, voter);
            if (yesVote) {
                voteAnswer = true;
            } else if (noVote) {
                voteAnswer = false;
            }
        }

        return ProposalView({
            id: proposalId,
            question: proposal.question,
            category: proposal.category,
            expiatedAt: proposal.expiatedAt,
            creator: proposal.creator,
            yesVotesCount: yesVotesCount,
            noVotesCount: noVotesCount,
            voteAnswer: voteAnswer,
            hasVoted: hasVotedOnProposal
        });
    }

    function getAllProposals() public view returns (ProposalView[] memory) {
        ProposalView[] memory allProposals = new ProposalView[](proposalCount);
        for (uint256 i = 0; i < proposalCount; i++) {
            // check if we have msg.sender's vote info
            allProposals[i] = getProposal(i, msg.sender);
        }
        return allProposals;
    }

    function getProposalCount() public view returns (uint256) {
        return proposalCount;
    }
}
