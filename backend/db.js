const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "labprog3",
    password: "amarelo100",
    port: 5432, // Porta padrão do PostgreSQL
});

pool.connect()
    .then(() => console.log("✅ Conectado ao PostgreSQL!"))
    .catch(err => console.error("❌ Erro na conexão:", err));

module.exports = pool;
