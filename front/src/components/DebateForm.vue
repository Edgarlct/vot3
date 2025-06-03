<template>
  <form @submit.prevent="submitForm">
    <label>
      Question :
      <input v-model="question" required />
    </label>

    <label>
      Catégorie :
      <select v-model="category" required>
        <option disabled value="">Choisir une catégorie</option>
        <option v-for="cat in categories" :key="cat" :value="cat">
          {{ cat }}
        </option>
      </select>
    </label>

    <label>
      Date de clôture :
      <input type="datetime-local" v-model="closesAt" required />
    </label>

    <button type="submit">Créer</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Debate } from '../types';

const question = ref('');
const category = ref('');
const closesAt = ref('');

const categories = [
  'Environnement',
  'Économie',
  'Éducation',
  'Santé',
  'Technologie'
];

const emit = defineEmits<{
  (e: 'submit', debate: Debate): void;
}>();

function submitForm() {
  const newDebate: Debate = {
    id: crypto.randomUUID(),
    question: question.value,
    category: category.value,
    closesAt: closesAt.value,
    votesYes: 0,
    votesNo: 0,
  };

  emit('submit', newDebate);
}
</script>
