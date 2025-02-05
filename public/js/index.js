import { login } from "./services/usuarioService.js";

//Botoes
const btn_entrar = document.getElementById("btn_entrar")

//Inputs
const input_email = document.getElementById("email")
const input_senha = document.getElementById("senha")

btn_entrar.addEventListener("click", () => {
  const email = validarEmail(input_email.value)
  const senha = validarSenha(input_senha.value)

  if(email && senha) verificarUsuario(input_email.value,input_senha.value)
});

async function verificarUsuario(email, senha) {
  const dadosUsuario = await login(email,senha); // Aguarda a resposta da API

  dadosUsuario.success ? dadosCorretos() : dadosIncorretos();
  
}

const validarEmail = (email) => {
  const situacao  = email.includes("@");
  modificarCampoEmail(situacao)
  return situacao
};

function modificarCampoEmail(situacao){
  if(situacao){
    input_email.style.border = ""
    document.querySelector(".msg_email").style.display = "none"
  }else{
    input_email.style.border = '2px solid red'
    document.querySelector(".msg_email").style.display = "block"
  }


}

const validarSenha = (senha) =>{
 const situacao = senha != ""
 modificarCampoSenha(situacao)
 return situacao
}

function modificarCampoSenha(situacao){
  if(situacao){
    input_senha.style.border = ""
    document.querySelector(".msg_senha").style.display = "none"
  }else{
    input_senha.style.border = "2px solid red"
    document.querySelector(".msg_senha").style.display = "block"

  }
}

function dadosCorretos(){
  alert("Dados ok")
  window.location.href = "pagina_inicial.html";

}

function dadosIncorretos(){
  alert("Dados not")
}