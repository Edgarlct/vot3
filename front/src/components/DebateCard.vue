<template>
  <div class="card">
    <p><strong>Catégorie :</strong> {{ debate.category }}</p>
    <p><strong>Question :</strong> {{ debate.question }}</p>
    <p>Clôture : {{ debate.expiatedAt }}</p>
    <p>vote ? : {{debate.hasVoted}}</p>
    <button @click="$emit('vote', debate.id, 'yes')">Oui</button>
    <button @click="$emit('vote', debate.id, 'no')">Non</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { Debate } from '../types';

defineProps<{
  debate: Debate;
}>();
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
}
</style>
