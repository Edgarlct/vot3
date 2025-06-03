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
import { ref } from 'vue';
import { useWeb3Store } from '../stores/web3';
import DebateCard from '../components/DebateCard.vue';
import ModalConnect from '../components/ModalConnect.vue';
import { fakeDebates } from '../data';
import type { Debate } from '../types';

const store = useWeb3Store();
const debates = ref<Debate[]>(fakeDebates);
const showModal = ref(false);

function handleVote(debateId: string, vote: 'yes' | 'no') {
  if (!store.isConnected) {
    showModal.value = true;
    return;
  }

  console.log(`Vote: ${vote} pour débat ${debateId} par ${store.userAddress}`);
}
</script>
