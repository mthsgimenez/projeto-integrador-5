<script setup>
import { useConfigStore } from '@/stores/config';

const configStore = useConfigStore();
</script>

<template>
    <aside class="sidebar">
        <h2>Configurações</h2>

        <div class="group">
            <h4>📏 Espaçamento</h4>

            <div class="control">
                <label>Linhas</label>
                <label>{{ configStore.lineHeight }}</label>
                <div>
                    <button @click="configStore.decreaseLineHeight()">-</button>
                    <button @click="configStore.increaseLineHeight()">+</button>
                </div>
            </div>

            <div class="control">
                <label>Palavras</label>
                <label>{{ configStore.wordSpacing }}</label>
                <div>
                    <button @click="configStore.decreaseWordSpacing()">-</button>
                    <button @click="configStore.increaseWordSpacing()">+</button>
                </div>
            </div>

            <div class="control">
                <label>Letras</label>
                <label>{{ configStore.letterSpacing }}</label>
                <div>
                    <button @click="configStore.decreaseLetterSpacing()">-</button>
                    <button @click="configStore.increaseLetterSpacing()">+</button>
                </div>
            </div>

            <div class="control">
                <label>Tamanho</label>
                <label>{{ configStore.fontScale }}x</label>
                <div>
                    <button @click="configStore.decreaseFontScale()">-</button>
                    <button @click="configStore.increaseFontScale()">+</button>
                </div>
            </div>

            <div class="control">
                <label>N de palavras</label>
                <input type="number" min="1" v-model="configStore.maxWords" />
                <button @click="configStore.clearMaxWords(); configStore.resetScroll();" style="width: 64px;">Limpar</button>
            </div>

            <div class="control">
                <label>Navegação</label>

                <div>
                    <button @click="configStore.decreaseScroll()">⬅</button>
                    <button @click="configStore.increaseScroll()">➡</button>
                </div>
            </div>
        </div>

        <div class="group">
            <h4>🎨 Aparência</h4>

            <!-- TODO: Fonte OpenDyslexic -->
            <div class="appearance-control">
                <label>Fonte</label>

                <select id="fontSelector">
                    <option value="Arial">Normal</option>
                    <option value="Verdana">Verdana</option>
                </select>
            </div>

            <div class="appearance-control">
                <label>Cor de fundo</label>

                <input type="color" v-model="configStore.backgroundColor" />
            </div>

            <div class="appearance-control">
                <label>Cor da fonte</label>

                <input type="color" v-model="configStore.fontColor" />
            </div>
        </div>

        <div class="group reading-group">
            <h4>🔊 Leitura</h4>

            <div class="reading-control">
                <label for="velocidade">Velocidade</label>

                <input type="range" min="0.5" max="2" step="0.1" v-model="configStore.speed" />
            </div>

            <!-- TODO: Seleção de vozes -->
            <div class="reading-control">
                <label for="vozes">Voz</label>

                <select id="vozes"></select>
            </div>

            <!-- TODO: state do reader -->
            <div class="reading-control">
                <label>Controles</label>

                <div class="buttons">
                    <button id="playButton">▶️</button>
                    <button id="pauseButton">⏸️ Pausar</button>
                </div>
            </div>
        </div>

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
</style>