import store from "../../redux/store.js";


export async function login(email, senha) {
  try {
    const response = await fetch("https://focus-on-your-activies.onrender.com/usuario/verificar", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "email": `${email}`,
        "senha": `${senha}`
      })
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    
    const data = await response.json();
    return data  
  } catch (error) {
    console.error("Erro:", error);
    return ({success: false})
  }
}

export async function cadastro(usuario) {
  console.log("Usuario", usuario);
  
  try {
    const response = await fetch("https://focus-on-your-activies.onrender.com/usuario/cadastrar", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "nome":`${usuario.nome}  ${usuario.sobrenome}`,
        "email":`${usuario.email}`,
        "cpf":`${usuario.cpf}`,
        "senha":`${usuario.senha}`,
      })
    });
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(data);
    
    return data
    
  } catch (error) {
    console.error("Erro:", error);
    
    return ({success: false})
  }
}

export function salvarToken(token){
  sessionStorage.setItem("token", token)
}

export function obterToken(){
  return sessionStorage.getItem("token")
}

export function salvarUsuarioRedux(usuario){
  console.log("Usuario", usuario)
  store.dispatch({ type: "SET_USUARIO", payload: usuario });
}

