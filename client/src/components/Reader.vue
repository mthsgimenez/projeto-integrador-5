<script setup>
import { computed } from "vue";
import { useConfigStore } from "@/stores/config";
import { useTextStore } from "@/stores/text";

const textStore = useTextStore();
const configStore = useConfigStore();

const emit = defineEmits(["wordClick"]);

const visibleTokens = computed(() => {
  if (!configStore.maxWords) {
    return textStore.tokens;
  }

  let wordIndex = 0;

  return textStore.tokens.filter(token => {
    if (!token.isWord) {
      return (
        wordIndex >= configStore.startIndex &&
        wordIndex < configStore.startIndex + configStore.maxWords
      );
    }

    const visible =
      wordIndex >= configStore.startIndex &&
      wordIndex < configStore.startIndex + configStore.maxWords;

    wordIndex++;

    return visible;
  });
});

function handleClick(token) {
  if (token.isWord) {
    emit("wordClick", token);
  }
}

function isDark(color) {
  const c = color.substring(1);
  const rgb = parseInt(c, 16);
  const r = (rgb >> 16) & 255;
  const g = (rgb >> 8) & 255;
  const b = rgb & 255;

  return (r * 0.299 + g * 0.587 + b * 0.114) < 140;
}
</script>

<template>
  <div class="text-wrapper" :style="{
    '--bg': configStore.backgroundColor,
    '--fg': configStore.fontColor,
    '--hover': isDark(configStore.backgroundColor)
      ? 'rgba(255,255,255,0.15)'
      : 'rgba(0,0,0,0.15)',

    color: configStore.fontColor,
    backgroundColor: configStore.backgroundColor,
    fontSize: configStore.fontScale + 'em',
    lineHeight: configStore.lineHeight + 'em',
    wordSpacing: configStore.wordSpacing + 'em',
    letterSpacing: configStore.letterSpacing + 'em',
  }">
    <span v-for="token in visibleTokens" :key="token.index" :class="{ word: token.isWord }" @click="handleClick(token)">
      {{ token.text }}
    </span>
  </div>
</template>

<style scoped>
.text-wrapper {
  white-space: pre-wrap;
  padding: 24px;

  flex: 1;
  min-height: 0;
  overflow-y: auto;

  transition:
    font-size 0.3s ease,
    letter-spacing 0.3s ease,
    word-spacing 0.3s ease,
    line-height 0.3s ease;
}

.word {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.word:hover {
  background-color: var(--hover);
}
</style>