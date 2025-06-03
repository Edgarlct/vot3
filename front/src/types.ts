export interface Debate {
  id: string;
  question: string;
  creator: string;
  yesVotesCount: number;
  noVotesCount: number;
  voteAnswer: string;
  hasVoted: boolean;
  category: string;
  expiatedAt: number;
}
