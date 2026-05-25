const btnComecar = document.querySelector("#comecar")
const btnJogar = document.querySelector("#jogar")
const bonequinho = document.querySelector(".bonequinho")
const entrada = document.querySelector("#entrada")

let palavraSorteada = ""
let erros = 0
const maxErros = 6

// monta os espaços da palavra
const montarTabuleiro = (palavra) => {
    const ulLetras = document.querySelector(".tentativas")
    ulLetras.innerHTML = ""

    for(let i = 0; i < palavra.length; i++) {
        ulLetras.innerHTML += "<li></li>"
    }
}

// sorteia palavra
const sortearPalavra = listaPalavras => {
    const totalPalavras = listaPalavras.length
    const numSorteio = Math.floor(Math.random() * totalPalavras)
    return listaPalavras[numSorteio]
}

// desenha boneco
const desenharBoneco = () => {
    const partes = [
        "",
        "😐",
        "😐<br>|",
        "😐<br>/|",
        "😐<br>/|\\",
        "😐<br>/|\\<br>/",
        "😐<br>/|\\<br>/ \\"
    ]

    bonequinho.innerHTML = partes[erros]
}

// botão começar
btnComecar.addEventListener("click", () => {
    palavraSorteada = sortearPalavra(palavras)
    erros = 0

    montarTabuleiro(palavraSorteada)
    desenharBoneco()

    console.log("Palavra:", palavraSorteada)
})

// botão jogar
btnJogar.addEventListener("click", () => {

    if(palavraSorteada == "") {
        alert("Clique em Começar primeiro!")
        return
    }

    const letra = entrada.value.toUpperCase()
    const liDoDOM = document.querySelectorAll(".tentativas li")

    if(letra == "") return

    let acertou = false

    // procura letra na palavra
    for(let i = 0; i < palavraSorteada.length; i++) {

        if(palavraSorteada[i].toUpperCase() == letra) {
            liDoDOM[i].innerHTML = letra
            acertou = true
        }
    }

    // se errou
    if(!acertou) {
        erros++
        desenharBoneco()

        if(erros >= maxErros) {
            alert("Game Over! A palavra era: " + palavraSorteada)
            palavraSorteada = ""
        }
    }

    // verificar vitória
    let venceu = true

    for(let i = 0; i < liDoDOM.length; i++) {
        if(liDoDOM[i].innerHTML == "") {
            venceu = false
        }
    }

    if(venceu) {
        alert("Parabéns! Você venceu!")
        palavraSorteada = ""
    }

    entrada.value = ""
    entrada.focus()
})