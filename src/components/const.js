 export const MSG_ERRO = [
  "Insira um valor no campo nome",
  "Insira um valor no campo sobrenome",
  "Insira um valor no campo email",
  "Insira um valor no campo senha",
  "Senhas não correspondem",
  "Aceite os termos",
  "Insira um calor no campo cpf",
]


export const  sqlUpdateAtividade = `
  UPDATE atividade 
  SET descricao = ?, concluido = ?, data_criacao = ? , usuario_id = ?
  WHERE id = ?
  `

export const sqlFindAllByUserId = `
  SELECT * FROM atividade a WHERE a.usuario_id = ?
`;

export const sqlDeleteAtividadeById = `
  DELETE FROM atividade a WHERE a.id = ?
`
export const sqlUpdateUsuario = `
  UPDATE usuario u
  SET u.nome = ?, u.senha = ?, u.imagem = ?
  WHERE u.id = ?
`

export const sqlSelectUsuario = `
  DELETE FROM usuario u WHERE u.id = ?
`
