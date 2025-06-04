// Verificar se o usuário está logado antes de carregar o jogo
if (localStorage.getItem("logado") !== "true") {
    alert("Você precisa estar logado para jogar!");
    window.location.href = "login.html"; // Redireciona para a tela de login
}

const palavras = [
  "ABACAXI", "ELEFANTE", "COMPUTADOR", "GIRAFA", "CHOCOLATE",
  "BANANA", "CACHORRO", "JANELA", "LIVRO", "MONTANHA",
  "PIRATA", "QUADRO", "SAPATO", "TIGRE", "URSO",
  "VIOLAO", "XADREZ", "ZEBRA", "BICICLETA", "CAMINHAO",
  "DINOSSAURO", "ESCOLA", "FANTASMA", "GUITARRA", "HIPOPOTAMO",
  "IGREJA", "JORNAL", "LAMPADA", "MACACO", "NAVIO",
  "OCULOS", "PIPOCA", "QUEIJO", "RAPOSA", "SORVETE",
  "TELEFONE", "UNICORNIO", "VASSOURA", "WIFI", "YOGA"
];  

const maxErros = 6;
const linhasTeclado = [
  'QWERTYUIOP'.split(''),
  'ASDFGHJKL'.split(''),
  'ZXCVBNM'.split('')
];

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
    btnNovoJogo.style.display = 'block';
    return true;
  }
  if (palavraSecreta.split('').every(letra => chutes.includes(letra))) {
    mensagem.textContent = 'Parabéns! Você ganhou!';
    fimDeJogo = true;
    desabilitaTeclado();
    btnNovoJogo.style.display = 'block';
    pontuacao += 100; // Soma pontos na hora
    atualizaPontuacao();
    salvaPontuacaoUsuario(); // Salva pontos imediatamente ao ganhar
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
  linhasTeclado.forEach(linha => {
    const divLinha = document.createElement('div');
    divLinha.style.display = 'flex';
    divLinha.style.justifyContent = 'center';
    divLinha.style.marginBottom = '5px';
    linha.forEach(letra => {
      const btn = document.createElement('button');
      btn.textContent = letra;
      btn.disabled = chutes.includes(letra) || fimDeJogo;
      btn.addEventListener('click', () => {
        chutarLetra(letra);
        btn.disabled = true;
        criaTeclado();
      });
      divLinha.appendChild(btn);
    });
    teclado.appendChild(divLinha);
  });
}

function desabilitaTeclado() {
  const botoes = teclado.querySelectorAll('button');
  botoes.forEach(btn => btn.disabled = true);
}

let pontuacao = 0;

function iniciaJogo() {
  const email = localStorage.getItem("usuarioEmail");
  if (email) {
    fetch("http://localhost:3000/usuarios")
      .then(res => res.json())
      .then(usuarios => {
        const usuario = usuarios.find(u => u.email === email);
        if (usuario) {
          pontuacao = Number(usuario.pontos) || 0;
          atualizaPontuacao();
        }
        iniciarRodada();
      });
  } else {
    iniciarRodada();
  }
}

function iniciarRodada() {
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

function atualizaPontuacao() {
  let el = document.getElementById('pontuacao-forca');
  if (!el) {
    el = document.createElement('div');
    el.id = 'pontuacao-forca';
    el.style = "font-size:1.3em;color:#1e90ff;margin:10px 0;text-align:center;";
    mensagem.parentNode.insertBefore(el, mensagem);
  }
  el.textContent = `Pontuação: ${pontuacao}`;
}
  


iniciaJogo();

function salvaPontuacaoUsuario() {
  const email = localStorage.getItem("usuarioEmail");
  if (!email) return;
  fetch("http://localhost:3000/usuarios", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      pontos: 100 // sempre 100 por vitória
    })
  });
}

btnNovoJogo.addEventListener('click', function() {
  iniciarRodada();
});