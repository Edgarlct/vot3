<template>
  <div class="container">
    <div class="header">
      <h1>Débats en cours</h1>
    </div>

    <div v-if="loading" class="loading">
      <p>Chargement des débats...</p>
    </div>

    <div v-else-if="activeDebates.length === 0" class="no-debates">
      <p>Aucun débat en cours pour le moment.</p>
    </div>

    <DebateCard
        v-else
        v-for="debate in activeDebates"
        :key="debate.id"
        :debate="debate"
        @vote="handleVote"
    />

    <ModalConnect :visible="showModal" @close="showModal = false" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useWeb3Store } from '../stores/web3';
import { useDebates } from '../composables/useDebates';
import DebateCard from '../components/DebateCard.vue';
import ModalConnect from '../components/ModalConnect.vue';
import Vote from '../abi/Vote.json';
import {
  connectWallet,
  disconnectWallet,
  writeContract
} from '../../utils/wallet';

const store = useWeb3Store();
const { debates, loading, getDebates } = useDebates();
const showModal = ref(false);

const activeDebates = computed(() => {
  const now = Math.floor(Date.now() / 1000);
  return debates.value.filter(d => d.expiatedAt > now);
});

onMounted(() => {
  getDebates();
});

async function connectOrDisconnect() {
  if (store.isConnected) {
    await disconnectWallet();
    await store.disconnect();
  } else {
    const account = await connectWallet();
    await store.connect(account);
  }
}

function handleVote(debateId: string, vote: 'yes' | 'no') {
  if (!store.isConnected) {
    showModal.value = true;
    return;
  }

  writeContract(Vote.abi, 'vote', [debateId, vote === 'yes']);
  console.log(`Vote: ${vote} pour débat ${debateId} par ${store.userAddress}`);
}
</script>
