import { defineStore } from "pinia";
import { useTextStore } from "./text";
import { useConfigStore } from "./config";

export const useReaderStore = defineStore("reader", {
  state: () => ({
    currentWordIndex: null,
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

      if (this.isPaused) {
        synth.resume();
        this.isPaused = false;
        return;
      }

      synth.cancel();

      const words = this.getVisibleWordTokens();
      if (words.length === 0) return;

      const session = Date.now();
      this._session = session;

      let startIdx = 0;
      if (this.currentWordIndex !== null) {
        const found = words.findIndex(w => w.index === this.currentWordIndex);
        if (found !== -1) startIdx = found;
      }

      const wordsToRead = words.slice(startIdx);
      if (wordsToRead.length === 0) return;

      let fullText = "";
      const offsets = [];

      wordsToRead.forEach((token, i) => {
        offsets.push({ index: token.index, charOffset: fullText.length });
        if (i > 0) fullText += " ";
        fullText += token.text;
      });

      const utterance = new SpeechSynthesisUtterance(fullText);
      const voice = this.voices.find(v => v.voiceURI === this.selectedVoiceURI);
      if (voice) utterance.voice = voice;
      utterance.rate = useConfigStore().speed;
      utterance.lang = "pt-BR";

      utterance.onboundary = (event) => {
        if (this._session !== session) return;
        if (event.name === "word") {
          const charIndex = event.charIndex;
          let match = offsets[0];
          for (const off of offsets) {
            if (off.charOffset <= charIndex) match = off;
            else break;
          }
          this.currentWordIndex = match.index;
        }
      };

      utterance.onend = () => {
        if (this._session !== session) return;
        this.isPlaying = false;
        this.isPaused = false;
        this.currentWordIndex = null;
      };

      utterance.onerror = () => {
        if (this._session !== session) return;
        this.isPlaying = false;
        this.isPaused = false;
      };

      this.isPlaying = true;
      synth.speak(utterance);
    },

    pause() {
      if (this.isPlaying && !this.isPaused) {
        window.speechSynthesis.pause();
        this.isPaused = true;
      }
    },

    stop() {
      window.speechSynthesis.cancel();
      this.isPlaying = false;
      this.isPaused = false;
      this.currentWordIndex = null;
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
