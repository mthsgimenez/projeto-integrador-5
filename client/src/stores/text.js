import { defineStore } from 'pinia'

export const useTextStore = defineStore('text', {
  state: () => ({
    text: null,
  }),

  actions: {
    setText(text) {
      this.text = text;
    },
  },
});