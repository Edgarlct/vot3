<template>
  <div>
    <nav>
      <a href="/">Accueil</a> |
      <a href="/results">Résultats</a> |
      <a href="/create">Créer</a>
      <a href="#" @click="connectOrDisconnect">{{store.isConnected ? "Déconnexion" : "Connection"}}</a>
    </nav>
    <router-view />
  </div>
</template>

<script setup lang="ts">

import {connectWallet, disconnectWallet} from "../utils/wallet.ts";
import {useWeb3Store} from "./stores/web3.ts";
const store = useWeb3Store();

async function connectOrDisconnect() {
  if (store.isConnected) {
    await disconnectWallet()
    await store.disconnect()
  } else {
    const account = await connectWallet()
    await store.connect(account)
  }
}

</script>

<style scoped>
nav {
  padding: 1rem;
  font-size: 1rem;
}
a {
  margin-right: 1rem;
}
</style>
