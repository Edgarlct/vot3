<template>
  <div class="card">
    <p><strong>Catégorie :</strong> {{ debate.category }}</p>
    <p><strong>Question :</strong> {{ debate.question }}</p>
    <p><strong>Clôture :</strong> {{ formatDate(debate.expiatedAt) }}</p>
    <div v-if="!debate.hasVoted" class="card-buttons">
      <button class="btn-yes" @click="$emit('vote', debate.id, 'yes')">Oui</button>
      <button class="btn-no" @click="$emit('vote', debate.id, 'no')">Non</button>
    </div>
    <p v-else>Vous avez déjà voté.</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { Debate } from '../types';

defineProps<{
  debate: Debate;
}>();

function formatDate(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

</script>
