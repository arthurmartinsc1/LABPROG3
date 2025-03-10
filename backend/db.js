import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'labprog3',
    password: 'amarelo100',
    port: 5432, // Porta padrão do PostgreSQL
});

pool.connect()
    .then(() => {
        console.log('✅ Conectado ao PostgreSQL!');

        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                cpf VARCHAR(11) PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                password VARCHAR(100) NOT NULL,
                birth_date DATE NOT NULL
            );
        `;

        pool.query(createTableQuery)
            .then(() => console.log("✅ Tabela 'users' criada com sucesso!"))
            .catch(err => console.error("❌ Erro ao criar tabela:", err));
    })
    .catch(err => console.error("❌ Erro na conexão:", err));

export default pool;