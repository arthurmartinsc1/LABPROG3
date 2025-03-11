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
    .then(async () => {
        console.log('✅ Conectado ao PostgreSQL!');

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
            .catch(err => console.error("❌ Erro ao criar tabela 'users':", err));

            const checkColumnQuery = `
            SELECT column_name FROM information_schema.columns 
            WHERE table_name='users' AND column_name='email_verified';
        `;

        
        const result = await pool.query(checkColumnQuery);

        if (result.rows.length === 0) {
            console.log("⚠️ Coluna 'email_verified' não encontrada, adicionando...");
            await pool.query("ALTER TABLE users ADD COLUMN email_verified BOOLEAN DEFAULT FALSE;");
            console.log("✅ Coluna 'email_verified' adicionada com sucesso!");
        } else {
            console.log("✅ Coluna 'email_verified' já existe.");
        }
            

        const createProductsTableQuery = `
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                category VARCHAR(100) NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                image_url VARCHAR(100) NOT NULL
            );
        `;

        pool.query(createProductsTableQuery)
            .then(() => console.log("✅ Tabela 'products' criada com sucesso!"))
            .catch(err => console.error("❌ Erro ao criar tabela 'products':", err));

        const createOrdersTableQuery = `
            CREATE TABLE IF NOT EXISTS orders (
                id SERIAL PRIMARY KEY,
                user_id VARCHAR(11) REFERENCES users(cpf),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                total NUMERIC(10, 2) NOT NULL
            );
        `;

        pool.query(createOrdersTableQuery)
            .then(() => {
                console.log("✅ Tabela 'orders' criada com sucesso!");

                const createOrderItemsTableQuery = `
                    CREATE TABLE IF NOT EXISTS order_items (
                        id SERIAL PRIMARY KEY,
                        order_id INT REFERENCES orders(id),
                        product_id INT REFERENCES products(id),
                        quantity INT NOT NULL,
                        price NUMERIC(10, 2) NOT NULL
                    );
                `;

                pool.query(createOrderItemsTableQuery)
                    .then(() => console.log("✅ Tabela 'order_items' criada com sucesso!"))
                    .catch(err => console.error("❌ Erro ao criar tabela 'order_items':", err));
            })
            .catch(err => console.error("❌ Erro ao criar tabela 'orders':", err));
    })
    .catch(err => console.error("❌ Erro na conexão:", err));

export default pool;