<template>
  <div class="result">
    <p>{{ debate.question }}</p>
    <p>Oui: {{ debate.yesVotesCount }}</p>
    <p>Non: {{ debate.noVotesCount }}</p>
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
.result {
  border: 1px solid #aaa;
  padding: 1rem;
  margin-bottom: 1rem;
}
</style>
