import bcrypt from "bcryptjs";
import { sqlSelectUsuario, sqlUpdateUsuario } from "../components/const.js";
import db from '../db/db.js';

const saltRounds = 10;


export async function cadatrarUsuario(usuario) {
  const existeUusuario = await isUsuario(usuario.email)

  if(!existeUusuario)
  {
    const senhaHash = await gerarHashSenha(usuario.senha)
    try {
      const [rows] = await db.query("insert into usuario (nome, email,cpf,senha) values (?,?,?,?)",[usuario.nome, usuario.email, usuario.cpf, senhaHash]);

      return rows.affectedRows > 0
      ? { success: true, message: "Usuario  criado com sucesso" }
      : { success: false, message: "Usuario não foi registrada" };
    } catch (error) {
      return { success: false, message: "Erro ao cadastrar usuário.", error: error.message };
    }
  }

  return { success: false, message: "Email já cadastrado!" };
}

export async function verificarUsuario(email, senha){
  const user = await getSenha(email)
  
  if(user != null){
    try {
      const senhaUsuarioValida = await verificarSenha(senha, user.senha)
      if(senhaUsuarioValida){
        const usuarioVo = {
          id: user.id,
          nome:user.nome,
          email:user.email,
          cpf:user.cpf,
          imagem:user.imagem
        }
        return ({success: true, message: "Usuario encontrado", usuario: usuarioVo})
      }
      return ({success: false , message: "Senha do usuario incorreta"});
    } catch (error) {
      return { success: false, message: "Erro ao buscar usuário.", error: error.message };
    }
  }
  return ({success: false , message: "Usuario não encontrado"})
  
}

async function isUsuario(email) {
  try {
    const [rows] = await db.query("SELECT * FROM usuario u WHERE u.email = ?", [email]);
    return rows.length > 0; // Retorna true se houver algum usuário com o email, senão retorna false
  } catch (error) {
    console.error("Erro ao verificar usuário:", error);
    return false; 
  }
}

async function gerarHashSenha(senha){
  const salt = await bcrypt.genSalt(saltRounds)
  const hash = await bcrypt.hash(senha, salt)
  return hash;
}

async function getSenha(email){
  try {
    const [rows] = await db.query("SELECT * FROM usuario u WHERE u.email = ?", [email])
    return rows.length > 0 ? rows[0] : null
  } catch (error) {
    return null;
  }
}

async function verificarSenha(senhaDigitada, senhaHash){
  return await bcrypt.compare(senhaDigitada,senhaHash)
}

export async function updateUsuario(usuario) {
  try {
    await verificarUpdateUsuario(usuario)
    const [rows] = await db.execute(sqlUpdateUsuario,[
      usuario.nome,
      usuario.senha,
      usuario.imagem,
      usuario.id
    ])

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
    console.log(error.message)
    return ({success:false, message:"Error ao atualizar usuario no banco"})
  }
}

export async function deletarUsuario(id) {
  try {
    const[rows] = await db.execute(sqlSelectUsuario,[id])
    console.log(rows)
    if(rows.affectedRows > 0){
      return ({success: true, message:"✅ Usuario deletado atualizada com sucesso!"});
    }else{
      return({success:false, message:"⚠️ Nenhuma deleção foi feita (não foi encontrado o id)."})
    }
  } catch (error) {
    console.log(error.message)
    return({success:false, message:"Erro ao tentar deletar o usuario"})
  }
}

async function verificarUpdateUsuario(usuario){
  usuario.senha = await gerarHashSenha(usuario.senha)
}
