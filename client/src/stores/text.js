import { defineStore } from "pinia";

export const useTextStore = defineStore("text", {
  state: () => ({
    tokens: []
  }),

  actions: {
    setTokens(tokens) {
      this.tokens = tokens;
    },

    clear() {
      this.tokens = [];
    }
  }
});