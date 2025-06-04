const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Rota para cadastrar usuário (salva no usuarios.txt)
app.post('/usuarios', (req, res) => {
    const { nick, email, senha, pontos = 0, imagem = 1 } = req.body;
    const linha = `${nick};${email};${senha};${pontos};${imagem}\n`;
    fs.appendFile('usuarios.txt', linha, (err) => {
        if (err) return res.status(500).send('Erro ao salvar usuário');
        res.send('Usuário cadastrado com sucesso!');
    });
});

// Rota para listar todos os usuários
app.get('/usuarios', (req, res) => {
    fs.readFile('usuarios.txt', 'utf8', (err, data) => {
        if (err) return res.status(500).send('Erro ao ler usuários');
        const usuarios = data.trim().split('\n').map(linha => {
            const [nick, email, senha, pontos, imagem] = linha.split(';');
            return { nick, email, senha, pontos: Number(pontos), imagem: Number(imagem) };
        });
        res.json(usuarios);
    });
});

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));

// Atualiza pontos ou imagem do usuário
app.put('/usuarios', (req, res) => {
    const { email, pontos, imagem } = req.body;
    fs.readFile('usuarios.txt', 'utf8', (err, data) => {
        if (err) return res.status(500).send('Erro ao ler usuários');
        let linhas = data.trim().split('\n');
        let alterado = false;
        linhas = linhas.map(linha => {
            const campos = linha.split(';');
           if (campos[1] === email) {
    if (typeof pontos !== "undefined") {
        campos[3] = String(Number(campos[3]) + Number(pontos)); // Soma os pontos recebidos
    }
    if (typeof imagem !== "undefined") campos[4] = imagem;
    alterado = true;
}
            return campos.join(';');
        });
        if (!alterado) return res.status(404).send('Usuário não encontrado');
        fs.writeFile('usuarios.txt', linhas.join('\n') + '\n', err => {
            if (err) return res.status(500).send('Erro ao salvar');
            res.send('Usuário atualizado com sucesso!');
        });
    });
});