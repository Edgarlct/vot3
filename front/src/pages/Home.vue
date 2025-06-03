<template>
  <div>
    <h1>Débats en cours</h1>
    <DebateCard
        v-for="debate in debates"
        :key="debate.id"
        :debate="debate"
        @vote="handleVote"
    />
    <ModalConnect :visible="showModal" @close="showModal = false" />
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import { useWeb3Store } from '../stores/web3';
import DebateCard from '../components/DebateCard.vue';
import ModalConnect from '../components/ModalConnect.vue';
import type { Debate } from '../types';
import {readContract, switchChain, writeContract} from "../../utils/wallet.ts";
import Vote from '../abi/Vote.json';

const store = useWeb3Store();
const debates = ref<Debate[]>([]);
const showModal = ref(false);

onMounted(() => {
  getDebates();
})

function handleVote(debateId: string, vote: 'yes' | 'no') {
  if (!store.isConnected) {
    showModal.value = true;
    return;
  }

  writeContract(Vote.abi, "vote", [debateId, vote === 'yes'])

  console.log(`Vote: ${vote} pour débat ${debateId} par ${store.userAddress}`);
}

async function getDebates() {
  await switchChain("0xAA36A7")
  const debatesData = await readContract(Vote.abi,"getAllProposals", [], true)
  const formattedDebates = debatesData.map((debate:any) => ({
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
  debates.value = formattedDebates;
}
</script>
