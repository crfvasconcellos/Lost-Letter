const btn = document.querySelector('.avançar')

btn.addEventListener("click", function(event) {
    event.preventDefault()

    const nick = document.querySelector('#nick').value
    const email = document.querySelector('#email').value
    const senha = document.querySelector('#senha').value

    console.table([nick,email,senha])
})

localStorage.setItem("carro", "bmw")
console.log(localStorage.getItem("carro"))
localStorage.removeItem("carro")

let marcas = ['gibson', 'fender', 'ltd']
localStorage.setItem("guitarras", marcas)