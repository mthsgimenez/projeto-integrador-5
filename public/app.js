let spacing = 1.6;
let dyslexicFont = false;
const synth = window.speechSynthesis;
let utterance = null;

function toggleFont() {
  const output = document.getElementById('resultado');
  dyslexicFont = !dyslexicFont;
  output.classList.toggle('dyslexic');
}

function increaseSpacing() {
  spacing += 0.2;
  document.getElementById('resultado').style.lineHeight = spacing;
}

function decreaseSpacing() {
  if (spacing > 1) {
    spacing -= 0.2;
    document.getElementById('resultado').style.lineHeight = spacing;
  }
}

function adaptarTexto() {
  let texto = document.getElementById("texto").value;
  // Simples adaptação: aumenta espaçamento e quebra frases
  let adaptado = texto.replace(/\./g, ".<br><br>");
  document.getElementById("resultado").innerHTML = adaptado;
}

function mudarFonte(fonte) {
  document.getElementById("resultado").style.fontFamily = fonte;
}

function carregarVozes() {
  let select = document.getElementById("vozes");
  let vozes = synth.getVoices() || [];

  select.innerHTML = "";

  vozes.forEach((voz, index) => {
    let option = document.createElement("option");
    option.value = index;
    option.textContent = voz.name + " (" + voz.lang + ")";
    select.appendChild(option);
  });
}

// Some browsers populate voices asynchronously
speechSynthesis.onvoiceschanged = carregarVozes;
window.addEventListener('load', () => { carregarVozes(); setTimeout(carregarVozes, 500); });

function lerTexto() {
  const text = document.getElementById("resultado").innerText;
  if (!text) return;

  // Cancela qualquer fala anterior antes de começar outra
  synth.cancel();

  utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'pt-BR';

  // velocidade
  let velocidade = document.getElementById("velocidade").value;
  utterance.rate = velocidade;

  // voz escolhida (safely)
  let vozes = synth.getVoices() || [];
  let index = document.getElementById("vozes").value;
  if (vozes.length && index !== "") {
    utterance.voice = vozes[index];
  }

  utterance.onend = () => {
    document.getElementById("pause-button").textContent = "⏸️ Pausar";
    utterance = null;
  };
  utterance.onerror = () => { utterance = null; };

  synth.speak(utterance);
  document.getElementById("pause-button").textContent = "⏸️ Pausar";
}

function pause() {
  // toggle pause/resume and update button label
  if (synth.speaking && !synth.paused) {
    synth.pause();
    document.getElementById("pause-button").textContent = "▶️ Resumir";
  } else if (synth.paused) {
    synth.resume();
    document.getElementById("pause-button").textContent = "⏸️ Pausar";
  }
}
