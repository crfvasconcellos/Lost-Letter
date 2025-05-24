document.getElementById("cadastroForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Impede que a página recarregue ao enviar o formulário

    // Captura os valores digitados
    const nick = document.getElementById("nick").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    // Envia os dados para o servidor via requisição HTTP
    const resposta = await fetch("http://localhost:3000/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nick, email, senha })
    });

    const dados = await resposta.json();
    
    if (resposta.ok) {
        alert("Cadastro realizado com sucesso!");
        window.location.href = "login.html"; // Redireciona para a página de login
    } else {
        alert("Erro ao cadastrar: " + dados.mensagem);
    }
});