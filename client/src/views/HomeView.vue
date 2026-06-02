<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useTextStore } from '@/stores/text';
import router from '@/router';

const text = ref('');
const error = ref('');
const textStore = useTextStore();

async function validate() {
  if (!text.value.trim()) {
    error.value = "Por favor, insira um texto para leitura.";
    return false;
  }

  error.value = '';

  try {
    const res = await axios.post(`${import.meta.env.VITE_API_BASE}/read`, { text: text.value });

    if (res.status === 200) {
      textStore.setTokens(res.data);
      router.push('/read');
    }
  } catch (e) {
    error.value = "Erro ao enviar texto.";
    console.log(e);
  }
}
</script>

<template>
  <main>
    <h3>Digite ou cole seu texto:</h3>
    <form method="POST" action="/api/read" @submit.prevent="validate">
      <textarea v-model="text" required></textarea>

      <p v-if="error" style="color: red;">{{ error }}</p>

      <button type="submit" style="margin-top: 15px;">Abrir para leitura →</button>
    </form>
  </main>
</template>

<style scoped>
textarea {
  width: 100%;
  height: min(50vh, 400px);
  min-height: 150px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 10px;
  resize: none;
}

main {
  padding: 20px;
  max-width: 900px;
  margin: auto;
}

h3 {
  margin-bottom: 14px;
}

@media (max-width: 600px) {
  main {
    display: flex;
    flex-direction: column;
    height: calc(100dvh - 56px);
    padding: 12px;
  }

  form {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  textarea {
    flex: 1;
    height: auto;
  }

  button[type="submit"] {
    width: 100%;
  }
}
</style>