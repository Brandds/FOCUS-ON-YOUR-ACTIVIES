import { sqlDeleteAtividadeById, sqlFindAllByUserId, sqlUpdateAtividade } from '../components/const.js';
import db from '../db/db.js';

export async function cadastrarAtividade(descricao, usuario_id){

  try {
    const [rows] = await db.query("insert into atividade(descricao, usuario_id) values(?,?)",[descricao, usuario_id]);
    console.log(rows)
    
    return rows.affectedRows > 0 
      ? { success: true, message: "Atividade registrada com sucesso" }
      : { success: false, message: "Atividade não foi registrada" };
      
  } catch (error) {
    return  ({success:false, message: "Erro ao registrar atividade"})
  }
}

export async function updateAtividade(descricao, id) {
  let atividade = await buscarAtividade(id)

  if(atividade != null){
      atividade.descricao = descricao
      try {
        const [rows] = await db.execute(sqlUpdateAtividade, [
          atividade.descricao,
          atividade.concluido,
          new Date(atividade.data_criacao),
          atividade.usuario_id,
          atividade.id
        ])
        console.log(rows);
        
        if (rows.affectedRows > 0) {
          if (rows.changedRows > 0) {
            return ({success: true, message:"✅ Atividade atualizada com sucesso!"});
          } else {
            return ({success:false, message:"⚠️ Nenhuma alteração foi feita (os valores eram os mesmos)."})
          }
        } else {
          return ({success:false, message:"❌ Nenhuma atividade encontrada com esse ID."});
        }
        
      } catch (error) {
        console.log(error.message);
        return ({success:false, message: "Problema ao atualizar..."})
      }
      
  }
  
}

export async function findAllByUserId(id) {
  try {
    const [rows] = await db.execute(sqlFindAllByUserId,[id])
    return({success:true, atividades:rows})
  } catch (error) {
    return({success:false, message:"Erro ao buscar atividade pelo id;"})
  }
  
}

export async function removerAtividadeById(id) {
  try {
    const [result] = await db.execute(sqlDeleteAtividadeById, [id])
    if (result.affectedRows > 0) {
      return ({ success: true, message: "Atividade removida com sucesso!" });
    } else {
      return ({ success: false, message: "Atividade não encontrada!" });
    }
  } catch (error) {
    console.log(error.message)
    return({success:false, message: "Erro ao remover atividade "})
  }
}

async function buscarAtividade(id) {
  
  try {
    const [rows] = await db.query("select * from atividade a where a.id = ?", [id])
    return rows.length > 0 ? rows[0] : null

  } catch (error) {
    return null
  }
}

