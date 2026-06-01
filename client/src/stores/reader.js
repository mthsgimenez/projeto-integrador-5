import { defineStore } from "pinia";
import { useTextStore } from "./text";
import { useConfigStore } from "./config";

export const useReaderStore = defineStore("reader", {
  state: () => ({
    currentWordIndex: null,
    currentWordPos: null,
    isPlaying: false,
    isPaused: false,
    voices: [],
    selectedVoiceURI: null,
  }),

  actions: {
    loadVoices() {
      this.voices = window.speechSynthesis.getVoices();
    },

    setWord(index) {
      this.currentWordIndex = index;
      this.currentWordPos = null;
    },

    getVisibleWordTokens() {
      const textStore = useTextStore();
      const configStore = useConfigStore();
      const tokens = textStore.tokens;

      const words = tokens.filter(t => t.isWord);

      if (!configStore.maxWords || configStore.maxWords === Infinity) {
        return words;
      }

      const start = configStore.startIndex;
      const end = start + configStore.maxWords;
      return words.slice(start, end);
    },

    play() {
      const synth = window.speechSynthesis;
      if (!synth) return;

      synth.cancel();

      const words = this.getVisibleWordTokens();
      if (words.length === 0) return;

      let startPos = 0;
      if (this.isPaused && this.currentWordPos !== null) {
        startPos = this.currentWordPos;
        if (startPos >= words.length) startPos = 0;
      } else if (this.currentWordIndex !== null) {
        const found = words.findIndex(w => w.index === this.currentWordIndex);
        if (found !== -1) startPos = found;
      }

      this._cancelRequested = false;
      this.isPlaying = true;
      this.isPaused = false;
      this._speakWord(words, startPos);
    },

    _speakWord(words, pos) {
      if (pos >= words.length) {
        this.isPlaying = false;
        this.isPaused = false;
        this.currentWordIndex = null;
        this.currentWordPos = null;
        return;
      }

      const token = words[pos];
      this.currentWordIndex = token.index;
      this.currentWordPos = pos;

      const utterance = new SpeechSynthesisUtterance(token.text);
      const voice = this.voices.find(v => v.voiceURI === this.selectedVoiceURI);
      if (voice) utterance.voice = voice;
      utterance.rate = useConfigStore().speed;
      utterance.lang = "pt-BR";

      utterance.onend = () => {
        if (this._cancelRequested) return;
        this._speakWord(words, pos + 1);
      };

      utterance.onerror = () => {
        if (this._cancelRequested) return;
        this.isPlaying = false;
        this.isPaused = false;
        this.currentWordIndex = null;
        this.currentWordPos = null;
      };

      window.speechSynthesis.speak(utterance);
    },

    pause() {
      if (this.isPlaying && !this.isPaused) {
        this._cancelRequested = true;
        window.speechSynthesis.cancel();
        this.isPaused = true;
      }
    },

    stop() {
      this._cancelRequested = true;
      window.speechSynthesis.cancel();
      this.isPlaying = false;
      this.isPaused = false;
      this.currentWordIndex = null;
      this.currentWordPos = null;
    },

    togglePlay() {
      if (this.isPlaying) {
        if (this.isPaused) {
          this.play();
        } else {
          this.pause();
        }
      } else {
        this.play();
      }
    },
  },
});
