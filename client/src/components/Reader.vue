<script setup>
import { computed } from "vue";
import { useConfigStore } from "@/stores/config";
import { useTextStore } from "@/stores/text";

const textStore = useTextStore();
const configStore = useConfigStore();

const emit = defineEmits(["wordClick"]);

const visibleTokens = computed(() => {
  let wordCount = 0;

  return textStore.tokens.filter(t => {
    if (!t.isWord && wordCount < configStore.maxWords) return true;

    if (wordCount < configStore.maxWords) {
      wordCount++;
      return true;
    }

    return false;
  });
});

function handleClick(token) {
  if (token.isWord) {
    emit("wordClick", token);
  }
}
</script>

<template>
  <div class="text-wrapper" :style="{ color: configStore.fontColor, backgroundColor: configStore.backgroundColor }">
    <span
      v-for="token in visibleTokens"
      :key="token.index"
      :class="{ word: token.isWord }"
      @click="handleClick(token)"
    >
      {{ token.text }}
    </span>
  </div>
</template>

<style scoped>
.text-wrapper {
  white-space: pre-wrap;
  padding: 24px;
}

.word {
  cursor: pointer;
}

.word:hover {
  background: rgba(0,0,0,0.1);
}
</style>