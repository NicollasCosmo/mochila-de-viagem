const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itens = []

form.addEventListener("submit", (evento) => {
    evento.preventDefault()                     // enterrompe o evento do submit //


    const nome = evento.target.elements['nome']       // busca no evento o target elemento onde consta o nome
    const quantidade = evento.target.elements['quantidade']     // busca no evento a quantidade

    criaElemento(nome.value, quantidade.value)   // usa a função passando os parâmetros nome e quantidade

    nome.value = ""
    quantidade.value = ""       // nome e quantidade recebe "" (zero valor) para limpar o input após envio
})



function criaElemento(nome, quantidade) {

    const novoItem = document.createElement('li')                // cria um elemento <li> automaticamente
    novoItem.classList.add("item")                       // cria uma classe chamada "item" automaticamente

    const numeroItem = document.createElement('strong')  // cria um elemento <strong> automaticamente
    numeroItem.innerHTML = quantidade           // insere a quantidade no html

    novoItem.appendChild(numeroItem)         // insere um objeto dentro do outro
    novoItem.innerHTML += nome              // acrescenta o nome

    lista.appendChild(novoItem)         // finaliza inserindo o novo "item" a lista (um dentro do outro)

    const itemAtual = {             //informações de chave e conteúdo concentfyradas em apenas um "objeto"//
        "nome": nome,               // para serem usadas na const itemAtual. //
        "quantidade": quantidade
    }

    // puxando as informações de nome e quantidade passadas pelo usuário para dentro do arry //
    itens.push(itemAtual)  

    // inserindo o item, transformando objeto "itemAtual" em texto  com o JASON.stringfy
    localStorage.setItem("item", JSON.stringify(itens)) 

}