const palavras = [
  "ABACAXI", "ELEFANTE", "COMPUTADOR", "GIRAFA", "CHOCOLATE", "CORAÇÃO", "AÇÃO", "PÃO", "LIMÃO", "CAMINHÃO"
];

const maxErros = 6;
const letrasDisponiveis = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÁÉÍÓÚÇÃÕÊÔ'.split('');

let palavraSecreta = '';
let chutes = [];
let erros = 0;
let fimDeJogo = false;

const imagemForca = document.getElementById('imagem-forca');
const palavraElement = document.getElementById('palavra');
const letrasChutadas = document.getElementById('letras-chutadas');
const mensagem = document.getElementById('mensagem');
const teclado = document.getElementById('teclado');
const btnNovoJogo = document.getElementById('novo-jogo');

function escolhePalavra() {
  const index = Math.floor(Math.random() * palavras.length);
  palavraSecreta = palavras[index];
}

function atualizaImagem() {
    const imgNum = Math.min(erros + 1, 7);
    imagemForca.src = `../../assets/forca/img${imgNum}.png`;
}

function atualizaPalavra() {
  let display = '';
  for (const letra of palavraSecreta) {
    if (chutes.includes(letra)) {
      display += letra + ' ';
    } else {
      display += '_ ';
    }
  }
  palavraElement.textContent = display.trim();
}

function atualizaLetrasChutadas() {
  letrasChutadas.textContent = chutes.length
    ? 'Letras chutadas: ' + chutes.join(', ')
    : '';
}

function verificaFimDeJogo() {
  if (erros >= maxErros) {
    mensagem.textContent = `Você perdeu! A palavra era: ${palavraSecreta}`;
    fimDeJogo = true;
    desabilitaTeclado();
    btnNovoJogo.style.display = 'inline-block';
    return true;
  }
  if (palavraSecreta.split('').every(letra => chutes.includes(letra))) {
    mensagem.textContent = 'Parabéns! Você ganhou!';
    fimDeJogo = true;
    desabilitaTeclado();
    btnNovoJogo.style.display = 'inline-block';
    return true;
  }
  return false;
}

function chutarLetra(letra) {
  if (fimDeJogo) return;
  letra = letra.toUpperCase();

  if (chutes.includes(letra)) {
    mensagem.textContent = 'Você já chutou essa letra!';
    return;
  }

  mensagem.textContent = '';
  chutes.push(letra);

  if (!palavraSecreta.includes(letra)) {
    erros++;
  }

  atualizaImagem();
  atualizaPalavra();
  atualizaLetrasChutadas();

  verificaFimDeJogo();
}

function criaTeclado() {
  teclado.innerHTML = '';
  letrasDisponiveis.forEach(letra => {
    const btn = document.createElement('button');
    btn.textContent = letra;
    btn.disabled = chutes.includes(letra) || fimDeJogo;
    btn.addEventListener('click', () => {
      chutarLetra(letra);
      btn.disabled = true;
      criaTeclado(); 
    });
    teclado.appendChild(btn);
  });
}

function desabilitaTeclado() {
  const botoes = teclado.querySelectorAll('button');
  botoes.forEach(btn => btn.disabled = true);
}

function iniciaJogo() {
  escolhePalavra();
  chutes = [];
  erros = 0;
  fimDeJogo = false;
  mensagem.textContent = '';
  btnNovoJogo.style.display = 'none';
  atualizaImagem();
  atualizaPalavra();
  atualizaLetrasChutadas();
  criaTeclado();
}

btnNovoJogo.addEventListener('click', iniciaJogo);

iniciaJogo();