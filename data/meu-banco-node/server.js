const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

const USUARIOS_PATH = path.join(__dirname, 'usuarios.txt');

// Função auxiliar para checar existência do arquivo
function checarArquivoUsuarios(res, cb) {
    fs.access(USUARIOS_PATH, fs.constants.F_OK, (err) => {
        if (err) return res.status(404).send('Arquivo de usuários não encontrado');
        cb();
    });
}

// Rota para cadastrar usuário (NÃO cria arquivo novo)
app.post('/usuarios', (req, res) => {
    checarArquivoUsuarios(res, () => {
        const { nick, email, senha, pontos = 0, imagem = 1 } = req.body;
        const linha = `${nick};${email};${senha};${pontos};${imagem}\n`;
        fs.appendFile(USUARIOS_PATH, linha, { flag: 'r+' }, (err) => {
         if (err) return res.status(404).send('Arquivo de usuários não encontrado');
        res.send('Usuário cadastrado com sucesso!');
        });
    });
});

// Rota para listar todos os usuários
app.get('/usuarios', (req, res) => {
    checarArquivoUsuarios(res, () => {
        fs.readFile(USUARIOS_PATH, 'utf8', (err, data) => {
            if (err) return res.status(500).send('Erro ao ler usuários');
            const usuarios = data.trim().split('\n').map(linha => {
                const [nick, email, senha, pontos, imagem] = linha.split(';');
                return { nick, email, senha, pontos: Number(pontos), imagem: Number(imagem) };
            });
            res.json(usuarios);
        });
    });
});

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));

// Atualiza pontos ou imagem do usuário
app.put('/usuarios', (req, res) => {
    checarArquivoUsuarios(res, () => {
        const { email, pontos, imagem } = req.body;
        fs.readFile(USUARIOS_PATH, 'utf8', (err, data) => {
            if (err) return res.status(500).send('Erro ao ler usuários');
            let linhas = data.trim().split('\n');
            let alterado = false;
            linhas = linhas.map(linha => {
                const campos = linha.split(';');
                if (campos[1] === email) {
                    if (typeof pontos !== "undefined") {
                        campos[3] = String(Number(campos[3]) + Number(pontos));
                    }
                    if (typeof imagem !== "undefined") campos[4] = imagem;
                    alterado = true;
                }
                return campos.join(';');
            });
            if (!alterado) return res.status(404).send('Usuário não encontrado');
            fs.writeFile(USUARIOS_PATH, linhas.join('\n') + '\n', { flag: 'r+' }, err => {
            if (err) return res.status(404).send('Arquivo de usuários não encontrado');
            res.send('Usuário atualizado com sucesso!');
            });
        });
    });
});
