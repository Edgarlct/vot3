<template>
  <div class="result">
    <p><strong>Catégorie :</strong> {{ debate.category }}</p>
    <p><strong>Question :</strong> {{ debate.question }}</p>

    <div class="vote-stats">
      <div class="vote-count vote-yes">
        <div>Oui</div>
        <div>{{ debate.yesVotesCount }}</div>
      </div>
      <div class="vote-count vote-no">
        <div>Non</div>
        <div>{{ debate.noVotesCount }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { Debate } from '../types';

defineProps<{
  debate: Debate;
}>();
</script>