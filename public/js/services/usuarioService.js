export async function login(email, senha) {
  let response400;
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
    console.log(email);
    console.log(senha);
    
    const data = await response.json();
    return data  
  } catch (error) {
    console.error("Erro:", error);
    return ({success: false})
  }
}
