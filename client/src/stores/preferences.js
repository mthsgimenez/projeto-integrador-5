import { defineStore } from "pinia";

const clamp = (value, min = 0) => Math.max(min, value);
const round1 = (value) => Math.round(value * 10) / 10;

export const usePreferencesStore = defineStore("preferences", {
  state: () => ({
    lineHeight: 1.6,
    wordSpacing: 0,
    letterSpacing: 0,
    fontScale: 1.6,
    backgroundColor: "#d6c8bd",
    fontColor: "#2E2E2E",
    highlightColor: "#ffdc32",
    fontFamily: "Arial",
    speed: 1,
  }),

  actions: {
    increaseLineHeight(step = 0.2) {
      this.lineHeight = round1(this.lineHeight + step);
    },

    decreaseLineHeight(step = 0.2) {
      this.lineHeight = clamp(round1(this.lineHeight - step), 1);
    },

    increaseWordSpacing(step = 0.1) {
      this.wordSpacing = round1(this.wordSpacing + step);
    },

    decreaseWordSpacing(step = 0.1) {
      this.wordSpacing = clamp(round1(this.wordSpacing - step), 0);
    },

    increaseLetterSpacing(step = 0.1) {
      this.letterSpacing = round1(this.letterSpacing + step);
    },

    decreaseLetterSpacing(step = 0.1) {
      this.letterSpacing = clamp(round1(this.letterSpacing - step), 0);
    },

    increaseFontScale(step = 0.1) {
      this.fontScale = round1(this.fontScale + step);
    },

    decreaseFontScale(step = 0.1) {
      this.fontScale = clamp(round1(this.fontScale - step), 1);
    },

    loadFromUser(user) {
      if (!user || !user.configs) return;
      const c = user.configs;
      if (c.espacoLinha != null) this.lineHeight = c.espacoLinha;
      if (c.espacoPalavra != null) this.wordSpacing = c.espacoPalavra;
      if (c.espacoLetra != null) this.letterSpacing = c.espacoLetra;
      if (c.tamanhoFonte != null) this.fontScale = c.tamanhoFonte;
      if (c.corFundo != null) this.backgroundColor = c.corFundo;
      if (c.corFonte != null) this.fontColor = c.corFonte;
      if (c.corDestaque != null) this.highlightColor = c.corDestaque;
      if (c.nomeFonte != null) this.fontFamily = c.nomeFonte;
      if (c.velocidadeVoz != null) this.speed = c.velocidadeVoz;
    },

    resetToDefaults() {
      this.lineHeight = 1.6;
      this.wordSpacing = 0;
      this.letterSpacing = 0;
      this.fontScale = 1.6;
      this.backgroundColor = "#d6c8bd";
      this.fontColor = "#2E2E2E";
      this.highlightColor = "#ffdc32";
      this.fontFamily = "Arial";
      this.speed = 1;
    },
  },
});
