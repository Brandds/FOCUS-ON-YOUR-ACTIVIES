export async function login(email, senha) {
  alert("entrei login")
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
    console.log("Resposta:", data);
    return data.token
  } catch (error) {
    console.error("Erro:", error);
  }
}
