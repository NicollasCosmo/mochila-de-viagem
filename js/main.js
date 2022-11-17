const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("item")) || []

itens.forEach( (elemento) => {
    criaElemento(elemento)
})

form.addEventListener("submit", (evento) => {
    evento.preventDefault()                     // enterrompe o evento do submit //


    const nome = evento.target.elements['nome']       // busca no evento o target elemento onde consta o nome
    const quantidade = evento.target.elements['quantidade']     // busca no evento a quantidade

    const existe = itens.find(elemento => elemento.nome === nome.value)


    const itemAtual = {             //informações de chave e conteúdo concentradas em apenas um "objeto"//
        "nome": nome.value,               // para serem usadas na const itemAtual. //
        "quantidade": quantidade.value
    }


    if (existe) {
        itemAtual.id = existe.id  // se ele existe, usa o mesmo id existente

        atualizaElemento(itemAtual)

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual //escreve o itemAtual por cima do conteúdo existente p atualizar
    }else {

        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0; // cria um id do tamanho que for o array

        criaElemento(itemAtual)   // usa a função passando o objeto onde está nome e quantidade

        // puxando as informações de nome e quantidade passadas pelo usuário para dentro do arry //
        itens.push(itemAtual) 
    }


    // inserindo o item, transformando objeto "itemAtual" em texto  com o JASON.stringfy
    localStorage.setItem("item", JSON.stringify(itens))

    nome.value = ""
    quantidade.value = ""       // nome e quantidade recebe "" (zero valor) para limpar o input após envio
})



function criaElemento(item) {

    const novoItem = document.createElement('li')                // cria um elemento <li> automaticamente
    novoItem.classList.add("item")                       // cria uma classe chamada "item" automaticamente

    const numeroItem = document.createElement('strong')  // cria um elemento <strong> automaticamente
    numeroItem.innerHTML = item.quantidade  // insere a quantidade no html
    numeroItem.dataset.id = item.id         // cria um id tipo data      

    novoItem.appendChild(numeroItem)         // insere um objeto dentro do outro
    novoItem.innerHTML += item.nome             // acrescenta o nome

    novoItem.appendChild(botaoDeleta(item.id))

    lista.appendChild(novoItem)         // finaliza inserindo o novo "item" a lista (um dentro do outro) 

}

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade

}

function botaoDeleta(id) {      // coloca também o id
    const elementoBotao = document.createElement("button") //cria um elemento botão com um "x"
    elementoBotao.innerText = "x"

    elementoBotao.addEventListener("click", function() { // no click, chama a função deletaElemento
        deletaElemento(this.parentNode, id)     // usando o parentNode para remover o parente pai do nó
    })                                          // também enviando o id.

    return elementoBotao
}

function deletaElemento(elemento, id) {     // função para deletar um elemento
    elemento.remove()    
    
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1) // splice(o queremos remover, 1 item a partir daquela posição)

    localStorage.setItem("item", JSON.stringify(itens))

   
}

