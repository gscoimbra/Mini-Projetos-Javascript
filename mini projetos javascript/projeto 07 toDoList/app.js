'use strict';

let banco = [
    {'tarefa': 'Estudar JS', 'status': '',},
    {'tarefa': 'Netflix', 'status': 'checked'},
]

const criarItem = (tarefa, status='', indice) => {
    const item = document.createElement('label')
    item.classList.add('todo_item') //Pega o item que criei e adiciona no DOM na classe 'todo_item'
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice}>
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice=${indice}>
    `
    document.getElementById('todoList').appendChild(item)
}

// Esse limpar tarefas é para que quando chamemos o atualizarTela() várias vezes as tarefas não fiquem duplicadas
const limparTarefas = () => {
    const todoList = document.getElementById('todoList')
    while(todoList.firstChild) {
        todoList.removeChild(todoList.lastChild)
    }
}

const atualizarTela = () => {
    limparTarefas()
    banco.forEach((item, indice) => criarItem(item.tarefa, item.status, indice)) // Esse indice é para diferenciar os itens
}

const inserirItem = (evento) => {
    const tecla = evento.key
    const texto = evento.target.value
    if (tecla === 'Enter') {
        banco.push({'tarefa': texto, 'status': ''}) // push adiciona no final
        atualizarTela()
        evento.target.value = '' // Para limpar o espaço que escreve a tarefa
    }
}

const removerItem = (indice) => {
    banco.splice(indice, 1) // 1 porque é ele próprio
    atualizarTela();
}

const clickItem = (evento) => {
    const elemento = evento.target
    if (elemento.type === 'button') {
        const indice = elemento.dataset.indice
        removerItem(indice)
    }
}

document.getElementById('newItem').addEventListener('keypress', inserirItem);
document.getElementById('todoList').addEventListener('click', clickItem) // Para saber onde estou clickando, se é no checkbox ou se é no X de deletar 

atualizarTela();