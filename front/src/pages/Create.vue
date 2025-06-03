<template>
  <div>
    <h1>Créer un débat</h1>
    <DebateForm @submit="handleCreate" />
    <ModalConnect :visible="showModal" @close="showModal = false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useWeb3Store } from '../stores/web3';
import DebateForm from '../components/DebateForm.vue';
import ModalConnect from '../components/ModalConnect.vue';
import type { Debate } from '../types';
import Vote from '../abi/Vote.json';
import {writeContract} from "../../utils/wallet.ts";

const store = useWeb3Store();
const showModal = ref(false);

async function handleCreate(newDebate: Debate) {
  if (!store.isConnected) {
    showModal.value = true;
    return;
  }

  await writeContract(
    Vote.abi,
    "createProposal",
    [newDebate.question, newDebate.category, newDebate.expiatedAt],
  );

  console.log('Débat créé par', store.userAddress, ':', newDebate);
}
</script>
