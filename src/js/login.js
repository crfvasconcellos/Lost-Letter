document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o recarregamento da página

    const emailDigitado = document.getElementById('email').value;
    const senhaDigitada = document.getElementById('senha').value;

    // Recupera o usuário salvo no localStorage (ajuste conforme seu cadastro)
    const usuarioSalvo = JSON.parse(localStorage.getItem('usuario'));

    if (
        usuarioSalvo &&
        usuarioSalvo.email === emailDigitado &&
        usuarioSalvo.senha === senhaDigitada
    ) {
        alert("Login realizado com sucesso!");
        localStorage.setItem("logado", "true");
        window.location.href = "forca.html"; // Redireciona para o jogo da forca
    } else {
        alert("Email ou senha incorretos.");
    }
});