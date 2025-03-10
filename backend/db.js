const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "labprog3",
    password: "amarelo100",
    port: 5432, // Porta padrão do PostgreSQL
});

pool.connect()
    .then(() => {
        console.log("✅ Conectado ao PostgreSQL!");

        const createUsersTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                cpf VARCHAR(11) PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                password VARCHAR(100) NOT NULL,
                birth_date DATE NOT NULL
                
            );
        `;

        pool.query(createUsersTableQuery)
            .then(() => console.log("✅ Tabela 'users' criada com sucesso!"))
            .catch(err => console.error("❌ Erro ao criar tabela:", err));

        const createProductsTableQuery = `
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY, 
                name VARCHAR(100) NOT NULL, 
                price DECIMAL(10, 2) NOT NULL,
                image_url VARCHAR(100) NOT NULL
            );
        `;

        pool.query(createProductsTableQuery)
            .then(() => console.log("✅ Tabela 'products' criada com sucesso!"))
            .catch(err => console.error("❌ Erro ao criar tabela:", err));
    })
    .catch(err => console.error("❌ Erro na conexão:", err));

module.exports = pool;