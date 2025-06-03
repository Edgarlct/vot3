<template>
  <div class="container">
    <div class="header">
      <h1>Créer un débat</h1>
    </div>
    <DebateForm @submit="handleCreate" />
    <ModalConnect :visible="showModal" @close="showModal = false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useWeb3Store } from '../stores/web3';
import DebateForm from '../components/DebateForm.vue';
import ModalConnect from '../components/ModalConnect.vue';
import Vote from '../abi/Vote.json';
import {writeContract} from "../../utils/wallet.ts";

const store = useWeb3Store();
const showModal = ref(false);

async function handleCreate(data: { question: string; category: string; closesAt: string }) {
  if (!store.isConnected) {
    showModal.value = true;
    return;
  }

  const expiatedAt = Math.floor(new Date(data.closesAt).getTime() / 1000);

  await writeContract(
      Vote.abi,
      "createProposal",
      [data.question, data.category, expiatedAt]
  );

  console.log('Débat créé par', store.userAddress, ':', {
    ...data,
    expiatedAt
  });
}
</script>
