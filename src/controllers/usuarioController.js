import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { cadatrarUsuario, deletarUsuario, updateUsuario, verificarUsuario } from "../services/usuarioService.js";

dotenv.config();


export async function cadastrar(req, res) {
  const {nome, email, cpf, senha} = req.body;

  const usuario = {
    nome:nome,
    email:email,
    cpf:cpf,
    senha:senha
  }

  try {
    const result = await cadatrarUsuario(usuario)
    console.log(result);
    
    if(!result.success) return res.status(400).json({success:false, message: `${result.message}` });
    
    if(result.success && result?.situacao) return res.status(200).json(result)
    
    const token = jwt.sign({ nome: usuario.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({success:true, message: token});

  } catch (error) {
    console.error(error.message)
    res.status(500).json({error:"Erro ao cadastrar usuário"});
  }
}

export async function verificar(req,res) {
  const {email, senha} = req.body;

  try {
    const result = await verificarUsuario(email, senha)

    if(!result.success) return res.status(400).json({success:false, message: "Usuário não encontrado!" });
    console.log(result)
    const token = jwt.sign({ nome: email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ success:true, message: token, usuario: result.usuario });

  } catch (error) {
    console.error(error.message)
    res.status(500).json({error:"Erro ao tentar buscar usuario usuário"});
  }
}

export async function update(req,res) {
  try {
    const {nome, senha, id, imagem} = req.body
    console.log(req.body);
    
    const usuario = {
      nome:nome,
      senha:senha,
      id:id,
      imagem:imagem != undefined ? imagem : null

    }
    const result = await updateUsuario(usuario)
    res.status(200).json(result)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({error:"Erro ao atualizar usuario"})
  }
  
}

export async function deleteUsuarioById(req,res) {
  try {
    const {id} = req.params
    const result = await deletarUsuario(id)
    res.status(200). json(result)
  } catch (error) {
    console.log(error.message);
    res.status(500).json({error: "Não foi possivel fazer a deleção"})
  }
}