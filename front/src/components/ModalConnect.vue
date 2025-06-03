<template>
  <div v-if="visible" class="backdrop">
    <div class="modal">
      <p>Vous devez connecter votre wallet pour effectuer cette action.</p>
      <button @click="connect">Se connecter</button>
      <button @click="$emit('close')">Annuler</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWeb3Store } from '../stores/web3';
import {connectWallet} from "../../utils/wallet.ts";

defineProps<{ visible: boolean }>();
const emit = defineEmits<{
  (e: 'close'): void;
}>();

const store = useWeb3Store();

async function connect() {
  try {
    const account = await connectWallet();
    console.log("Wallet connecté:", account);
    await store.connect(account);
    emit('close');
  } catch (error) {
    console.error('Erreur de connexion:', error);
    return;
  }
}
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}
.modal {
  background: white;
  margin: 20vh auto;
  padding: 2rem;
  width: 80%;
  max-width: 300px;
}
</style>
