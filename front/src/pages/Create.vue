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

const store = useWeb3Store();
const showModal = ref(false);

function handleCreate(newDebate: Debate) {
  if (!store.isConnected) {
    showModal.value = true;
    return;
  }

  console.log('Débat créé par', store.userAddress, ':', newDebate);
}
</script>
