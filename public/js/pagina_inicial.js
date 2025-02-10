// encontrar o botão adicionar tarefa

import store from "../redux/store.js"
import { addAtividadeUsuario, deletarAtividade, getAllAtividadeUser, updateAtividade } from "./services/atividadeService.js"

const btnAdicionarTarefa = document.querySelector('.app__button--add-task')
const formAdicionarTarefa = document.querySelector('.app__form-add-task')
const textarea = document.querySelector('.app__form-textarea')
const ulTarefas = document.querySelector('.app__section-task-list')
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description')
const usuario_text = document.querySelector(".text_usuario").innerHTML = `${store.getState().usuarioAtivo.nome}`

let tarefaSelecionada = null
let liTarefaSelecionada = null


let tarefa = await getAllAtividadeUser(store.getState().usuarioAtivo.id)
let tarefas = tarefa.atividades
console.log("getAllAtividadeUser", tarefas)

async function atualizarTarefas () {
    tarefa =  await getAllAtividadeUser(store.getState().usuarioAtivo.id)
    tarefas = tarefa.atividades
    removerElementosAtividade()
    tarefas.forEach(tarefa => {
        const elementoTarefa = criarElementoTarefa(tarefa)
        ulTarefas.append(elementoTarefa)
    });
}

function removerElementosAtividade(){
    document.querySelectorAll(".app__section-task-list-item").forEach(elemento => {
        elemento.remove();
    });
    
}

function criarElementoTarefa(tarefa) {
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')


    const svg = document.createElement('svg')
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
                fill="#01080E"></path>
        </svg>
    `
    const paragrafo = document.createElement('p')
    paragrafo.textContent = tarefa.descricao
    paragrafo.classList.add('app__section-task-list-item-description')

    const botao = document.createElement('button')
    botao.classList.add(`app_button-edit`)
    botao.setAttribute("id", `atividade-${tarefa.id}`);


    botao.onclick = async  () => {
        // debugger
        const novaDescricao = prompt("Qual é o novo nome da tarefa?")
        // console.log('Nova descrição da tarefa: ', novaDescricao)
        if (novaDescricao) {            
            const id =   botao.id.split("-")[1]
            const result = await updateAtividade(novaDescricao, id)
            alert(result.message)
            atualizarTarefas()
        }
    }

    const botao_excluir = document.createElement("button")
    botao_excluir.classList.add("app_button-edit")
    botao_excluir.setAttribute("id", `excluir_atividade-${tarefa.id}`);

    const imagemBotaoExcluir = document.createElement("img")
    imagemBotaoExcluir.setAttribute("src","/imagens/excluir.png")
    botao_excluir.append(imagemBotaoExcluir)

    botao_excluir.onclick = async () =>{
        const result = await deletarAtividade(tarefa.id)
        alert(result?.message)
    }

    const imagemBotao = document.createElement('img')
    imagemBotao.setAttribute('src', '/imagens/edit.png')
    botao.append(imagemBotao)

    li.append(svg)
    li.append(paragrafo)
    li.append(botao)
    li.append(botao_excluir)

    li.onclick = () => {
        document.querySelectorAll('.app__section-task-list-item-active')
            .forEach(elemento => {
                elemento.classList.remove('app__section-task-list-item-active')
            })
        if (tarefaSelecionada == tarefa) {
            paragrafoDescricaoTarefa.textContent = ''
            tarefaSelecionada = null
            liTarefaSelecionada = null
            return
        }
        tarefaSelecionada = tarefa
        liTarefaSelecionada = li
        paragrafoDescricaoTarefa.textContent = tarefa.descricao

        li.classList.add('app__section-task-list-item-active')
    }

    return li
}   

btnAdicionarTarefa.addEventListener('click', () => {
    formAdicionarTarefa.classList.toggle('hidden')
})

formAdicionarTarefa.addEventListener('submit', async (evento) => {
    evento.preventDefault();
    const tarefa = {
        descricao: textarea.value
    }
   const result =  await addAtividadeUsuario(tarefa.descricao, store.getState().usuarioAtivo.id)
   alert(result.message)
    atualizarTarefas()
    textarea.value = ''
    formAdicionarTarefa.classList.add('hidden')
})

tarefas.forEach(tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa)
});

document.addEventListener('FocoFinalizado', () => {
    if (tarefaSelecionada && liTarefaSelecionada) {
        liTarefaSelecionada.classList.remove('app__section-task-list-item-active')
        liTarefaSelecionada.classList.add('app__section-task-list-item-complete')
        liTarefaSelecionada.querySelector('button').setAttribute('disabled', 'disabled')
    }
})