document.getElementById("cadastroForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita recarregar a página ao enviar o formulário

    const nick = document.getElementById("nick").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    // Criando um objeto de usuário
    const usuario = { nick, email, senha };

    // Salvando no Local Storage
    localStorage.setItem("usuario", JSON.stringify(usuario));

    alert("Cadastro realizado com sucesso!");

    fetch('http://localhost:3000/usuarios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nick, email, senha, pontos: 0, imagem: 1 })
})
.then(res => res.text())
.then(alert)
.catch(console.error);

    // Redireciona para login
    window.location.href = "login.html";
});