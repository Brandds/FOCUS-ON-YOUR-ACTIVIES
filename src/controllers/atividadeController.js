import { cadastrarAtividade, findAllByUserId, removerAtividadeById, updateAtividade } from "../services/atividadeService.js";

export async  function cadastrar(req,res){  
  try {
    const {descricao, usuario_id} = req.body
    const result = await cadastrarAtividade(descricao,usuario_id)
    res.status(200).json(result)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({error:"Erro ao cadastrar usuário"});
  }
}

export async function update(req,res) {
  const {descricao , id} = req.body

  try {
    const result = await updateAtividade(descricao, id);
    res.status(200).json(result)
  } catch (error) {
    console.log(error.message);
    res.status(500).json({error: "Erro ao atualizar atividade"})
  }
}

export async function getAllAtividadeUser(req,res){

  try {
    const {id} = req.params
    const result = await findAllByUserId(id)
    res.status(200).json(result)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({error:"Error ao buscar atividades do usuario"})
  }
}

export async function deleteAtividadeById(req,res) {
  
  try {
  const {id} = req.params 
  console.log("iD", id);
  
  const result = await removerAtividadeById(id)
  res.status(200).json(result)
  } catch (error) {
    console.log(error.message);
    res.status(500).json({error: "Error ao deletar atividade"})
  }
}