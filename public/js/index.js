import { login } from "./services/usuarioService.js";

//Botoes
const btn_entrar = document.getElementById("btn_entrar")

//Inputs
const input_email = document.getElementById("email")
const input_senha = document.getElementById("senha")

btn_entrar.addEventListener("click", () => {
  alert("teste");
  verificarUsuario()
});

async function verificarUsuario() {
  alert("chamou");
  const dadosUsuario = await login("teste@hotmail.com","senha123"); // Aguarda a resposta da API
  console.log("Dados do usuário:", dadosUsuario);
}