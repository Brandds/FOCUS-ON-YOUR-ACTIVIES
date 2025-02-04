import { MSG_ERRO } from "../../src/components/const.js"
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
  console.log("Valor atual:", this.value);
});


function verificarDadosCadastro() {
  const campos = [
      { elemento: nome, atributo: "nome", mensagem: MSG_ERRO[0] },
      { elemento: sobrenome, atributo: "sobrenome", mensagem: MSG_ERRO[1] },
      { elemento: email, atributo: "email", mensagem: MSG_ERRO[2] },
      { elemento: senha, atributo: "senha", mensagem: MSG_ERRO[3] },
      { elemento: confirmSenhaenha, atributo: "confirmSenha", mensagem: MSG_ERRO[4] },
      { elemento: termo, atributo: "termo", mensagem: MSG_ERRO[5], validar: (v) => v !== "" && v !== "false" },
      { elemento: cpf, atributo: "cpf", mensagem: MSG_ERRO[6] }
  ];

  let todosValidos = true;

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

function cadastrar() {
  alert("Todos os dados estão corretos!");
}
