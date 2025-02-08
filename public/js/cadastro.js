import { MSG_ERRO } from "../../src/components/const.js"
import { cadastro } from "./services/usuarioService.js"
//botoes
const btnCadastrar = document.querySelector("#bnt_cadastrar")


//valores dos inputs
let nome = document.getElementById("nome")
let sobrenome = document.getElementById("sobrenome")
let email = document.getElementById("email")
let senha = document.getElementById("senha")
let confirmSenhaenha = document.getElementById("confirmSenha")
let termo = document.getElementById("termo")
let cpf = document.getElementById("cpf")

const modal = [
  {mensagem:"Cadastro feito com sucesso.",button:"Ir para o login", backGround:"green", function:irTelaLogin},
  {mensagem:"Erro  ao fazer cadastro.",button:"Fechar",backGround:"red", function:recarregarPaginaCadastro},
]
const mensagem_modal = document.querySelector(".mensagem_modal")
const bnt_modal = document.getElementById("fechar_modal")
const corpo_modal = document.getElementById("corpo_modal")



btnCadastrar.addEventListener("click", () =>{
  verificarDadosCadastro()

})

//Aplica a formatação
document.getElementById("cpf").addEventListener("input", function (e) {
  let cpf = e.target.value;
  
  // Remove tudo que não for número
  cpf = cpf.replace(/\D/g, "");

  // Aplica a máscara 000.000.000-00
  if (cpf.length > 3) cpf = cpf.substring(0, 3) + "." + cpf.substring(3);
  if (cpf.length > 7) cpf = cpf.substring(0, 7) + "." + cpf.substring(7);
  if (cpf.length > 11) cpf = cpf.substring(0, 11) + "-" + cpf.substring(11, 14);

  // Atualiza o campo com o valor formatado
  e.target.value = cpf;
});

document.getElementById("termo").addEventListener("change", function () {
  this.value = this.checked ? "true" : "false";
});


function verificarDadosCadastro() {
  const campos = [
      { elemento: nome, atributo: "nome", mensagem: MSG_ERRO[0] },
      { elemento: sobrenome, atributo: "sobrenome", mensagem: MSG_ERRO[1] },
      { elemento: email, atributo: "email", mensagem: MSG_ERRO[2] },
      { elemento: senha, atributo: "senha", mensagem: MSG_ERRO[3] },
      { elemento: confirmSenhaenha, atributo: "confirmSenha", mensagem: MSG_ERRO[4] , validar: (v) => v === senha.value},
      { elemento: termo, atributo: "termo", mensagem: MSG_ERRO[5], validar: (v) => v !== "" && v !== "false" },
      { elemento: cpf, atributo: "cpf", mensagem: MSG_ERRO[6], validar: (v) => v.length == 14}
  ];

  let todosValidos = true
  campos.forEach(({ elemento, atributo, mensagem, validar = (v) => v !== "" }) => {
      if (validar(elemento.value)) {
          sucesso(elemento, atributo);
      } else {
          mensagemError(elemento, atributo, mensagem);
          todosValidos = false;
      }
  });

  if (todosValidos) cadastrar();
}

function mensagemError(elemento, atributo, mensagem) {
  elemento.style.border = "1px solid red";
  document.querySelector(`.msg_erro_${atributo}`).textContent = mensagem;
}

function sucesso(elemento, atributo) {
  elemento.style.border = "1px solid green";
  document.querySelector(`.msg_erro_${atributo}`).textContent = "";
}

async function cadastrar() {
  const usuario = {
    nome:nome.value,
    sobrenome:sobrenome.value,
    email:email.value,
    cpf:cpf.value.replace(/\D/g, ""),
    senha:senha.value
  }
  btnCadastrar.disabled = true

  try {
    const result = await cadastro(usuario)
    console.log("result",result);
    const mensagem = result?.situacao ? result.message : null
    result.success ? sucessAoCadastrarUsuario(mensagem) : errorAoCadastrarUsuario()  
  } catch (error) {
    errorAoCadastrarUsuario()
  }finally{
    btnCadastrar.disalbed = false
  }
  
}

function sucessAoCadastrarUsuario(mensagem){
  console.log(mensagem)
  mensagem_modal.innerHTML =  mensagem != null ? `${mensagem}` : `${modal[0].mensagem}` 
  corpo_modal.style.backgroundColor = mensagem != null ? "#000080	" :  `${modal[0].backGround}`
  bnt_modal.innerHTML =  mensagem != null ? "Fechar" : `${modal[0].button}` 
  bnt_modal.addEventListener("click",modal[0].function)

  let myModal = new bootstrap.Modal(document.getElementById("myModal"));
  myModal.show();
}

function errorAoCadastrarUsuario(){
  console.log("testes");
  
  mensagem_modal.innerHTML = `${modal[1].mensagem}`
  mensagem_modal.style.color = "white"
  corpo_modal.style.backgroundColor = `${modal[1].backGround}`
  bnt_modal.innerHTML = `${modal[1].button}`
  bnt_modal.addEventListener("click",modal[1].function)
  let myModal = new bootstrap.Modal(document.getElementById("myModal"));
  myModal.show();
}

function irTelaLogin(){
  window.location.href = "index.html";

}

function recarregarPaginaCadastro(){
  window.location.href = "cadastro.html";
}

