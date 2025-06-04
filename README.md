# 🎮 Lost Letter - Jogo da Forca

Projeto desenvolvido por **[Cláudio Vasconcellos](https://github.com/crfvasconcellos)** e **[Otávio Augusto](https://github.com/otavio-asr)** Durante o **curso de introdução ao Desenvolvimento Web e Design de Interfaces** da **EPIC** , com o objetivo de aplicar conhecimentos de HTML, CSS e JavaScript em um projeto prático e interativo.

---

## 📌 Descrição

**Lost Letter** é um jogo da forca online, onde o jogador deve adivinhar palavras ocultas antes que o boneco seja completamente enforcado. O sistema possui:

- Tela inicial com logo e botão para jogar
- Sistema de login e cadastro de usuários
- Tela principal do jogo da forca
- Sistema de pontuação individual e persistente
- Perfil do usuário com avatar personalizável
- Armazenamento dos dados dos usuários em arquivo `usuarios.txt` via backend Node.js
---

## 🧱 Tecnologias Utilizadas

- HTML5  
- CSS3  
- JavaScript (Vanilla JS)
- Node.js (backend simples para persistência dos usuários)
- Express.js e CORS

---

## 🚀 Como rodar o projeto

1. **Clone o repositório e instale as dependências do backend:**

   ```bash
   cd data/meu-banco-node
   npm install
   ```

2. **Inicie o servidor backend:**

   ```bash
   node server.js
   ```

   O backend ficará disponível em `http://localhost:3000` e será responsável por cadastrar, autenticar e atualizar os usuários e suas pontuações no arquivo `usuarios.txt`.

3. **Abra o arquivo HTML principal no navegador:**

   - Acesse `src/pages/index.html` para começar a jogar.
   - O jogo depende do backend rodando para login, cadastro e salvar pontuação.

---

## 📁 Estrutura do Projeto

```bash
Lost-Letter/
│
├── src/
│   ├── pages/               # Páginas HTML do projeto
│   │   ├── index.html
│   │   ├── login.html
│   │   ├── cadastro.html
│   │   ├── perfil.html
│   │   └── forca.html
│   │
│   ├── css/                 # Estilos CSS
│   │   ├── style.css
│   │   ├── perfil.css
│   │   ├── forca.css
│   │   ├── cadastro.css
│   │   └── login.css
│   │
│   ├── js/                  # Scripts JS
│   │   ├── forca.js
│   │   ├── perfil.js
│   │   ├── cadastro.js
│   │   └── login.js
│   │
│   └── assets/              # Imagens, logos e avatares
│       ├── Logo/
│       ├── Ranks/
│       ├── forca/
│       ├── Bloco Triste.png
│       ├── Esqueleto.png
│       ├── Logo zumbi.png
│       ├── Robo.png
│       └── ...
│
├── data/
│   └── meu-banco-node/
│       ├── server.js        # Backend Node.js (Express)
│       └── package.json
│
├── usuarios.txt             # Banco de dados dos usuários (arquivo texto)
└── README.md
```

---

## 🏆 Funcionalidades em destaque

- **Cadastro e Login:** Usuários podem se cadastrar e fazer login. Dados são salvos em `usuarios.txt`.
- **Jogo da Forca:** Palavras aleatórias, sem repetição na sessão. Teclado virtual e contagem de erros.
- **Pontuação:** Cada palavra acertada soma pontos que são salvos no beckend.
- **Ranking:** Exibe o ranking do usuário com imagem correspondente ao nível de pontos.
- **Perfil:** Usuário pode escolher e salvar seu avatar.
- **Persistência:** Todos os dados são persistidos em `usuarios.txt` via backend Node.js.

---

## ⚠️ Observações

- **É obrigatório iniciar o backend (`server.js`)** antes de acessar as páginas HTML, pois o frontend depende das rotas para autenticação, cadastro e atualização de pontuação.
- O backend utiliza o arquivo `usuarios.txt` na raiz do projeto para armazenar os dados dos usuários.
- O projeto foi desenvolvido para fins didáticos e pode ser expandido para incluir mais funcionalidades, como recuperação de senha e ranking global.

---

## 👨‍💻 Autores

- [Cláudio Vasconcellos](https://github.com/crfvasconcellos)
- [Otávio Augusto](https://github.com/otavio-asr)

---