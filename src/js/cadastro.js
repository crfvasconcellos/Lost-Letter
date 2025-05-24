const btn = document.querySelector('.avançar')

    const nick = document.getElementById("nick").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    // Criando um objeto de usuário
    const usuario = { nick, email, senha };

    console.table([nick,email,senha])
})

localStorage.setItem("carro", "bmw")
console.log(localStorage.getItem("carro"))
localStorage.removeItem("carro")

let marcas = ['gibson', 'fender', 'ltd']
localStorage.setItem("guitarras", marcas)
