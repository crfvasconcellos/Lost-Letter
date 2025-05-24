document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const emailDigitado = document.getElementById("email").value;
    const senhaDigitada = document.getElementById("senha").value;

    // Pegando os dados armazenados no Local Storage
    const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));

    if (!usuarioSalvo) {
        alert("Usuário não cadastrado!");
        return;
    }

    if (usuarioSalvo.email === emailDigitado && usuarioSalvo.senha === senhaDigitada) {
        alert("Login realizado com sucesso!");
        localStorage.setItem("logado", "true"); // Marcamos que o usuário está logado
        window.location.href = "perfil.html"; // Redireciona para a página protegida
    } else {
        alert("Email ou senha incorretos.");
    }
});