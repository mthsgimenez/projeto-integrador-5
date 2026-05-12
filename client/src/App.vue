<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <RouterLink to="/" style="text-decoration: none; color: inherit;">Leitura Fácil 💚</RouterLink>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  background-color: var(--color-header);
  padding: 20px;
  text-align: left;
  font-size: 24px;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
}
</style>