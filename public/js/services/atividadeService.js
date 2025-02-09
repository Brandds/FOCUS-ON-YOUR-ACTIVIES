export async function getAllAtividadeUser(id) {
  try {
    const response = await fetch("https://focus-on-your-activies.onrender.com/atividade/allAtividadeUser/1",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      }
    })

    if(!response.ok){
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    const data = await response.json();
    return data
  } catch (error) {
    console.log("Erro", error);
  }
}