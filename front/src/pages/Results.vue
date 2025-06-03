<template>
  <div>
    <h1>Résultats</h1>
    <VoteResult
        v-for="debate in debates"
        :key="debate.id"
        :debate="debate"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { fakeDebates } from '../data';
import VoteResult from '../components/VoteResult.vue';

const debates = ref(fakeDebates);
</script>
