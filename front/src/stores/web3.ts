import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useWeb3Store = defineStore('web3', () => {
  const isConnected = ref(false);
  const userAddress = ref<string | null>(null);

  async function connect() {
    console.log('Connexion à Metamask simulée');
    isConnected.value = true;
    userAddress.value = '0xFakeUserAddress';
  }

  return {
    isConnected,
    userAddress,
    connect
  };
});
