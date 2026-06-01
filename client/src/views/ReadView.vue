<script setup>
import { ref } from 'vue';
import axios from 'axios';
import Sidebar from '@/components/Sidebar.vue';
import Reader from '@/components/Reader.vue';
import WordMeaningModal from '@/components/WordMeaningModal.vue';

const showWordMeaning = ref(false);
const selectedWord = ref('');
const definitions = ref([]);
const loading = ref(false);
const error = ref(null);

async function handleWordClick(token) {
  selectedWord.value = token.text;
  definitions.value = [];
  error.value = null;
  loading.value = true;
  showWordMeaning.value = true;

  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE}/word/${encodeURIComponent(token.text)}`
    );
    definitions.value = res.data.definitions;
  } catch {
    error.value = 'not found';
  } finally {
    loading.value = false;
  }
}
</script>

<template>
    <main>
        <Sidebar />
        <Reader @wordClick="handleWordClick" />
        <WordMeaningModal
            :show="showWordMeaning"
            :word="selectedWord"
            :definitions="definitions"
            :loading="loading"
            :error="error"
            @close="showWordMeaning = false"
        />
    </main>
</template>

<style scoped>
main {
    display: flex;
    height: 100vh;
    overflow: hidden;
}
</style>