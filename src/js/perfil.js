window.addEventListener("DOMContentLoaded", function() {
    const email = localStorage.getItem("usuarioEmail");
    if (!email) {
        document.getElementById("nickname").textContent = "NICKNAME";
        return;
    }

    fetch("http://localhost:3000/usuarios")
        .then(res => res.json())
        .then(usuarios => {
            const usuario = usuarios.find(u => u.email === email);
            document.getElementById("nickname").textContent = usuario ? usuario.nick : "NICKNAME";
            // Troca a imagem do perfil conforme o número
            if (usuario) {
                let imgSrc = "";
                switch (usuario.imagem) {
                    case 1:
                        imgSrc = "../../assets/Logo zumbi.png";
                        break;
                    case 2:
                        imgSrc = "../../assets/Bloco Triste.png";
                        break;
                    case 3:
                        imgSrc = "../../assets/Esqueleto.png";
                        break;
                    case 4:
                        imgSrc = "../../assets/Robo.png";
                        break;
                    default:
                        imgSrc = "https://vitalprev.com.br/wp-content/uploads/2022/05/road-sign-361514_960_720.png";
                }
                document.querySelector(".fotoperfil img").src = imgSrc;
            }
        })
        .catch(() => {
            document.getElementById("nickname").textContent = "NICKNAME";
        });
});

window.addEventListener("DOMContentLoaded", function() {
    const email = localStorage.getItem("usuarioEmail");
    const nicknameEl = document.getElementById("nickname");
    const avatarImg = document.getElementById("avatar-img");
    const editarAvatar = document.getElementById("editar-avatar");
    const avatarModal = document.getElementById("avatar-modal");
    const avatarSelector = document.getElementById("avatar-selector");
    const salvarBtn = document.getElementById("salvar-avatar");
    const fecharModal = document.getElementById("fechar-modal");
    let usuarioAtual = null;
    let avatarEscolhido = null;

    function atualizaAvatar(imagem) {
        let imgSrc = "";
        switch (Number(imagem)) {
            case 1: imgSrc = "../../assets/Logo zumbi.png"; break;
            case 2: imgSrc = "../../assets/Bloco Triste.png"; break;
            case 3: imgSrc = "../../assets/Esqueleto.png"; break;
            case 4: imgSrc = "../../assets/Robo.png"; break;
            default: imgSrc = "https://vitalprev.com.br/wp-content/uploads/2022/05/road-sign-361514_960_720.png";
        }
        avatarImg.src = imgSrc;
    }

    if (!email) {
        nicknameEl.textContent = "NICKNAME";
        return;
    }

    fetch("http://localhost:3000/usuarios")
        .then(res => res.json())
        .then(usuarios => {
            usuarioAtual = usuarios.find(u => u.email === email);
            nicknameEl.textContent = usuarioAtual ? usuarioAtual.nick : "NICKNAME";
            atualizaAvatar(usuarioAtual ? usuarioAtual.imagem : null);
        });

    // Abrir modal ao clicar no pincel
    editarAvatar.addEventListener("click", function() {
        avatarModal.style.display = "flex";
        // Destacar avatar atual
        [...avatarSelector.children].forEach(img => {
            img.style.border = "3px solid transparent";
            if (usuarioAtual && Number(img.dataset.avatar) === Number(usuarioAtual.imagem)) {
                img.style.border = "3px solid #1e90ff";
                avatarEscolhido = usuarioAtual.imagem;
            }
        });
    });

    // Selecionar avatar no modal
    avatarSelector.addEventListener("click", function(e) {
        if (e.target.tagName === "IMG") {
            [...avatarSelector.children].forEach(img => img.style.border = "3px solid transparent");
            e.target.style.border = "3px solid #1e90ff";
            avatarEscolhido = e.target.dataset.avatar;
            atualizaAvatar(avatarEscolhido);
        }
    });

    // Salvar avatar escolhido
    salvarBtn.addEventListener("click", function() {
        if (!usuarioAtual || !avatarEscolhido) return alert("Selecione um avatar!");
        fetch("http://localhost:3000/usuarios", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: usuarioAtual.email,
                imagem: Number(avatarEscolhido)
            })
        })
        .then(res => res.text())
        .then(msg => {
            usuarioAtual.imagem = avatarEscolhido;
            avatarModal.style.display = "none";
            atualizaAvatar(avatarEscolhido);
            alert("Avatar atualizado com sucesso!");
        })
        .catch(() => alert("Erro ao atualizar avatar."));
    });

    // Fechar modal
    fecharModal.addEventListener("click", function() {
        avatarModal.style.display = "none";
    });
});

window.addEventListener("DOMContentLoaded", function() {
    const email = localStorage.getItem("usuarioEmail");
    const nicknameEl = document.getElementById("nickname");
    const pontuacaoEl = document.getElementById("pontuacao");
    

    fetch("http://localhost:3000/usuarios")
        .then(res => res.json())
        .then(usuarios => {
            const usuario = usuarios.find(u => u.email === email);
            nicknameEl.textContent = usuario ? usuario.nick : "NICKNAME";
            if (usuario && pontuacaoEl) {
                pontuacaoEl.textContent = `Pontos: ${usuario.pontos}`;
            }
            
        })
        
});

window.addEventListener("DOMContentLoaded", function() {
    const email = localStorage.getItem("usuarioEmail");
    const nicknameEl = document.getElementById("nickname");
    const pontuacaoEl = document.getElementById("pontuacao");
    const rankImgPlaceholder = document.getElementById("rank-img-placeholder");

    fetch("http://localhost:3000/usuarios")
        .then(res => res.json())
        .then(usuarios => {
            const usuario = usuarios.find(u => u.email === email);
            nicknameEl.textContent = usuario ? usuario.nick : "NICKNAME";
            if (usuario && pontuacaoEl) {
                pontuacaoEl.textContent = `Pontos: ${usuario.pontos}`;
                // Determina o rank
                let rank = "ferro-removebg-preview";
                if (usuario.pontos >= 500) rank = "prata-removebg-preview";
                if (usuario.pontos >= 1000) rank = "ouro-removebg-preview";
                if (usuario.pontos >= 2000) rank = "esmeralda-removebg-preview";
                if (usuario.pontos >= 5000) rank = "diamante-removebg-preview";
                if (usuario.pontos >= 10000) rank = "chelanger";
                // Mostra a imagem do rank
                rankImgPlaceholder.innerHTML = `<img src="../../assets/Ranks/no_background/${rank}.png" alt="${rank}" style="width:400px; height:400px; border-radius:50%; object-fit:cover;">`;
                // Opcional: muda o background do rank
            }
        });
});