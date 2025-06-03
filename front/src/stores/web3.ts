import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useWeb3Store = defineStore('web3', () => {
  const isConnected = ref(true);
  const userAddress = ref<string | null>(null);
  const contractAddress = "0xE5E7EC65d79C3F722B6F099484Ec2439543579f3";

  async function connect(wallet:string) {
    isConnected.value = true;
    userAddress.value = wallet;
  }

  async function disconnect() {
    isConnected.value = false;
    userAddress.value = null;
  }

  return {
    isConnected,
    userAddress,
    contractAddress,
    connect,
    disconnect
  };
});
