import store from "../../redux/store.js";


export async function login(email, senha) {
  try {
    const response = await fetch("http://localhost:3000/usuario/verificar", {
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
    console.log(email);
    console.log(senha);
    
    const data = await response.json();
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

