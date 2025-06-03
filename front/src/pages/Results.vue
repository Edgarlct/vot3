<template>
  <div class="container">
    <div class="header">
      <h1>Résultats</h1>
    </div>

    <div v-if="loading" class="loading">
      <p>Chargement des résultats...</p>
    </div>

    <div v-else-if="expiredDebates.length === 0" class="no-results">
      <p>Aucun débat clôturé pour le moment.</p>
    </div>

    <VoteResult
        v-else
        v-for="debate in expiredDebates"
        :key="debate.id"
        :debate="debate"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useDebates } from '../composables/useDebates';
import VoteResult from '../components/VoteResult.vue';

const { debates, loading, getDebates } = useDebates();

onMounted(() => {
  getDebates();
});

const expiredDebates = computed(() => {
  const now = Math.floor(Date.now() / 1000);
  return debates.value.filter(d => d.expiatedAt <= now);
});
</script>
