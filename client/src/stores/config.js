import { defineStore } from "pinia";
import '@/assets/base.css';

const clamp = (value, min = 0) => Math.max(min, value);
const round1 = (value) => Math.round(value * 10) / 10;

// TODO: dividir em config e reader state quando for implementar salvamento das configs
export const useConfigStore = defineStore('config', {
    state: () => ({
        lineHeight: 1.6,
        wordSpacing: 0.2,
        letterSpacing: 0,
        fontScale: 1.6,
        backgroundColor: "#d6c8bd",
        fontColor: "#2E2E2E",
        fontFamily: "Arial",
        speed: 1,
    }),

    actions: {
        increaseLineHeight(step = 0.2) {
            this.lineHeight = round1(this.lineHeight + step);
        },

        decreaseLineHeight(step = 0.2) {
            this.lineHeight = clamp(
                round1(this.lineHeight - step),
                0
            );
        },

        increaseWordSpacing(step = 0.1) {
            this.wordSpacing = round1(this.wordSpacing + step);
        },

        decreaseWordSpacing(step = 0.1) {
            this.wordSpacing = clamp(
                round1(this.wordSpacing - step),
                0
            );
        },

        increaseLetterSpacing(step = 0.1) {
            this.letterSpacing = round1(this.letterSpacing + step);
        },

        decreaseLetterSpacing(step = 0.1) {
            this.letterSpacing = clamp(
                round1(this.letterSpacing - step),
                0
            );
        },

        increaseFontScale(step = 0.1) {
            this.fontScale = round1(this.fontScale + step);
        },

        decreaseFontScale(step = 0.1) {
            this.fontScale = clamp(
                round1(this.fontScale - step),
                1
            );
        },
    }
});