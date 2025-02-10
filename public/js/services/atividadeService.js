export async function getAllAtividadeUser(id) {
  try {
    const response = await fetch(`https://focus-on-your-activies.onrender.com/atividade/allAtividadeUser/${id}`,{
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

export async function addAtividadeUsuario(descricao, idUser){
  try {
    const response = await fetch("https://focus-on-your-activies.onrender.com/atividade/cadastrar",{
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        "descricao": `${descricao}`,
        "usuario_id": `${idUser}`
      })
    })

    if(!response.ok) throw new Error(`Erro na requisição: ${response.status}`)
      const data = await response.json()
      return data
  } catch (error) {
    console.log("Erro", error);
  }
}

export async function updateAtividade(descricao, idAtividade){
  try {
    const response = await fetch("https://focus-on-your-activies.onrender.com/atividade/update",{
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        "descricao":`${descricao}`,
        "id": idAtividade
      })
    })

    if(!response.status) throw new Error(`Erro na requisição: ${response.status}`);

    const data = await response.json()
    return data
  } catch (error) {
    console.log("Erro", error);
    
  }
}

export async function deletarAtividade(id) {
  try {
    const response = await fetch(`https://focus-on-your-activies.onrender.com/atividade/delete/${id}`,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json"
      }
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}