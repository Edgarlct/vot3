// src/composables/useDebates.ts
import { ref } from 'vue';
import { readContract, switchChain } from '../../utils/wallet';
import Vote from '../abi/Vote.json';
import type { Debate } from '../types';

export function useDebates() {
  const debates = ref<Debate[]>([]);
  const loading = ref(false);

  async function getDebates() {
    try {
      loading.value = true;
      await switchChain("0xAA36A7");
      const debatesData = await readContract(Vote.abi, "getAllProposals", [], true);

      debates.value = debatesData.map((debate: any) => ({
        id: debate[0],
        question: debate[1],
        category: debate[2],
        expiatedAt: Number(debate[3]),
        creator: debate[4],
        yesVotesCount: Number(debate[5]),
        noVotesCount: Number(debate[6]),
        voteAnswer: debate[7],
        hasVoted: debate[8]
      }));
    } catch (error) {
      console.error('Erreur lors du chargement des débats:', error);
    } finally {
      loading.value = false;
    }
  }

  return {
    debates,
    loading,
    getDebates
  };
}
