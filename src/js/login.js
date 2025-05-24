document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const emailDigitado = document.getElementById('email').value;
    const senhaDigitada = document.getElementById('senha').value;

    fetch('http://localhost:3000/usuarios')
        .then(res => res.json())
        .then(usuarios => {
            // Procura usuário com email e senha iguais
            const usuario = usuarios.find(u => u.email === emailDigitado && u.senha === senhaDigitada);

            if (usuario) {
                alert("Login realizado com sucesso!");
                localStorage.setItem("logado", "true");
                localStorage.setItem("usuarioLogado", JSON.stringify(usuario)); // Salva dados do usuário logado
                window.location.href = "forca.html";
            } else {
                alert("Email ou senha incorretos ou usuário não cadastrado.");
            }
        })
        .catch(() => {
            alert("Erro ao conectar com o servidor. Tente novamente mais tarde.");
        });
});