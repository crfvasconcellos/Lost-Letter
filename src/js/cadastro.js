const btn = document.querySelector('#avançar')

btn.addEventListener("click", function(event) {
    event.preventDefault()

    const nick = document.querySelector('#nick').value
    const email = document.querySelector('#email').value
    const senha = document.querySelector('#senha').value

    console.log([nick,email,senha])
})