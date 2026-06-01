<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { usePreferencesStore } from '@/stores/preferences';
import { usePaginationStore } from '@/stores/pagination';
import { useReaderStore } from '@/stores/reader';
import { useUserStore } from '@/stores/user';

const preferencesStore = usePreferencesStore();
const paginationStore = usePaginationStore();
const readerStore = useReaderStore();
const userStore = useUserStore();

const feedbackText = ref('');

function showFeedback(msg) {
    feedbackText.value = msg;
    setTimeout(() => { feedbackText.value = ''; }, 2000);
}

async function handleSave() {
    try {
        await preferencesStore.saveToServer();
        showFeedback('Salvo!');
    } catch {
        showFeedback('Erro ao salvar');
    }
}

async function handleReload() {
    try {
        await preferencesStore.reloadFromServer();
        showFeedback('Carregado!');
    } catch {
        showFeedback('Erro ao carregar');
    }
}

function handleReset() {
    preferencesStore.resetToDefaults();
    showFeedback('Configurações resetadas');
}

function loadVoices() {
    readerStore.loadVoices();
}

onMounted(() => {
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
});

onUnmounted(() => {
    window.speechSynthesis.onvoiceschanged = null;
});
</script>

<template>
    <aside class="sidebar">
        <h2>Configurações</h2>

        <div class="group">
            <h4>📏 Espaçamento</h4>

            <div class="control">
                <label>Linhas</label>
                <label>{{ preferencesStore.lineHeight }}</label>
                <div>
                    <button @click="preferencesStore.decreaseLineHeight()">-</button>
                    <button @click="preferencesStore.increaseLineHeight()">+</button>
                </div>
            </div>

            <div class="control">
                <label>Palavras</label>
                <label>{{ preferencesStore.wordSpacing }}</label>
                <div>
                    <button @click="preferencesStore.decreaseWordSpacing()">-</button>
                    <button @click="preferencesStore.increaseWordSpacing()">+</button>
                </div>
            </div>

            <div class="control">
                <label>Letras</label>
                <label>{{ preferencesStore.letterSpacing }}</label>
                <div>
                    <button @click="preferencesStore.decreaseLetterSpacing()">-</button>
                    <button @click="preferencesStore.increaseLetterSpacing()">+</button>
                </div>
            </div>

            <div class="control">
                <label>Tamanho</label>
                <label>{{ preferencesStore.fontScale }}x</label>
                <div>
                    <button @click="preferencesStore.decreaseFontScale()">-</button>
                    <button @click="preferencesStore.increaseFontScale()">+</button>
                </div>
            </div>

            <div class="control">
                <label>N de palavras</label>
                <input type="number" min="1" v-model="paginationStore.maxWords" />
                <button @click="readerStore.stop(); paginationStore.clearMaxWords(); paginationStore.resetScroll();"
                    style="width: 64px;">Limpar</button>
            </div>

            <div class="control">
                <label>Navegação</label>

                <div>
                    <button @click="readerStore.stop(); paginationStore.decreaseScroll()">⬅</button>
                    <button @click="readerStore.stop(); paginationStore.increaseScroll()">➡</button>
                </div>
            </div>
        </div>

        <div class="group">
            <h4>🎨 Aparência</h4>

            <!-- TODO: Fonte OpenDyslexic -->
            <div class="appearance-control">
                <label>Fonte</label>

                <select id="fontSelector" v-model="preferencesStore.fontFamily">
                    <option value="Arial">Normal</option>
                    <option value="Verdana">Verdana</option>
                </select>
            </div>

            <div class="appearance-control">
                <label>Cor de fundo</label>

                <input type="color" v-model="preferencesStore.backgroundColor" />
            </div>

            <div class="appearance-control">
                <label>Cor da fonte</label>

                <input type="color" v-model="preferencesStore.fontColor" />
            </div>

            <div class="appearance-control">
                <label>Cor do destaque</label>

                <input type="color" v-model="preferencesStore.highlightColor" />
            </div>
        </div>

        <div class="group reading-group">
            <h4>🔊 Leitura</h4>

            <div class="reading-control">
                <label for="velocidade">Velocidade</label>

                <input type="range" min="0.5" max="2" step="0.1" v-model="preferencesStore.speed" />
            </div>

            <div class="reading-control">
                <label for="vozes">Voz</label>

                <select id="vozes" v-model="readerStore.selectedVoiceURI">
                    <option value="" disabled>Selecione uma voz</option>
                    <option v-for="v in readerStore.voices" :key="v.voiceURI" :value="v.voiceURI">
                        {{ v.name }}
                    </option>
                </select>
            </div>

            <div class="reading-control">
                <label>Controles</label>

                <div class="buttons">
                    <button @click="readerStore.togglePlay()">
                        {{ readerStore.isPlaying && !readerStore.isPaused ? '⏸️' : '▶️' }}
                    </button>
                    <button @click="readerStore.stop()">⏹️ Parar</button>
                </div>
            </div>
        </div>

        <div class="group" v-if="userStore.isLoggedIn()">
            <h4>💾 Config</h4>

            <div class="persist-buttons">
                <button @click="handleSave" :disabled="preferencesStore.saving" class="btn-persist">
                    {{ preferencesStore.saving ? 'Salvando...' : '💾 Salvar' }}
                </button>
                <button @click="handleReload" :disabled="preferencesStore.loading" class="btn-persist">
                    {{ preferencesStore.loading ? 'Carregando...' : '🔄 Recarregar' }}
                </button>
            </div>
        </div>

        <div class="group">
            <h4>↺ Config</h4>

            <div class="persist-buttons">
                <button @click="handleReset" class="btn-persist">↺ Resetar</button>
            </div>
        </div>

        <div v-if="feedbackText" class="feedback">{{ feedbackText }}</div>

        <!-- TODO: state do reader -->
        <div class="group">
            <button id="breakLinesButton">
                Quebrar linhas
            </button>
        </div>
    </aside>
</template>

<style scoped>
h2 {
    font-weight: bold;
    margin-bottom: 14px;
}

.sidebar {
    width: 284px;
    height: 100vh;
    padding: 20px;
    overflow-y: auto;
    flex-shrink: 0;

    background: var(--color-text);
    color: white;
}

/* SECTIONS */
.group {
    margin-bottom: 24px;
}

.group h4 {
    margin-bottom: 14px;
    font-weight: bold;
}

/* GENERIC CONTROLS */
.control {
    display: grid;
    grid-template-columns: 1fr 60px auto;
    align-items: center;
    gap: 10px;
    margin-bottom: 12px;
}

.control label:nth-child(2) {
    text-align: center;
}

/* BUTTON GROUP INSIDE CONTROL */
.control div {
    display: flex;
    gap: 6px;
}

/* BUTTONS */
button {
    padding: 8px 12px;
    border: none;
    border-radius: 6px;

    background: var(--color-button-dark);
    color: white;
    cursor: pointer;

    transition: background 0.2s;
}

button:hover {
    background: var(--color-button-dark-hover);
}

/* small step buttons */
.control button {
    width: 32px;
    height: 32px;
    padding: 0;
}

/* APPEARANCE + READING SHARED STYLE */
.appearance-control,
.reading-control {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 14px;
}

.appearance-control label,
.reading-control label {
    font-size: 14px;
    font-weight: 600;
}

/* FORM ELEMENTS */
select,
input[type="color"],
input[type="range"] {
    width: 100%;
    height: 38px;
}

/* BUTTON GROUP */
.buttons {
    display: flex;
    gap: 10px;
    margin-top: 4px;
}

.persist-buttons {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.btn-persist {
    width: 100%;
    padding: 10px 16px;
}

.feedback {
    text-align: center;
    font-size: 13px;
    padding: 6px 12px;
    border-radius: 6px;
    background-color: rgba(255, 255, 255, 0.15);
    margin-bottom: 12px;
}
</style>