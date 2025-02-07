import mysql from 'mysql2';
import "dotenv/config"; // 🔹 Carrega as variáveis do .env

import dotenv from "dotenv";
dotenv.config();

console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_HOST:", process.env.DB_HOST);


// Configurando a pool de conexões
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: process.env.DB_CONNECTION_LIMIT || 10, // Valor padrão
  queueLimit: 0
});

// Exportando a conexão para ser utilizada no resto da aplicação
export default pool.promise();
