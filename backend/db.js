import pkg from 'pg';
const { Pool } = pkg;
import { insertProducts } from "./productsDB.js";
const pool = new Pool({
    user: 'postgres',
    host: 'db',// nome do serviço no banco do docker-compose
    database: 'labprog3',
    password: 'amarelo100',
    port: 5432, // Porta padrão do PostgreSQL
});

pool.connect()
    .then(async () => {
        console.log('✅ Conectado ao PostgreSQL!');

        const createUsersTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,  -- id autoincrementável como chave primária
    cpf VARCHAR(11) UNIQUE, -- cpf agora pode ser NULL, mas ainda é único se preenchido
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100),
    birth_date DATE
    );
`;


        pool.query(createUsersTableQuery)
            .then(() => console.log("✅ Tabela 'users' criada com sucesso!", createUsersTableQuery))
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


        const checkProductsTableExistsQuery = `
    SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'products'
    );
`;


        const createProductsTableQuery = `
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL UNIQUE,
                category VARCHAR(100) NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                image_url VARCHAR(1000) NOT NULL
            );
        `;

        try {
            
            await pool.query(createProductsTableQuery);
            console.log("✅ Tabela 'products' criada com sucesso!");
        
           
            const result = await pool.query(checkProductsTableExistsQuery);
            const tableExists = result.rows[0].exists;
        
            if (tableExists) {
                await insertProducts();
                console.log("📦 Produtos inseridos com sucesso!");
            } else {
                console.log("⚠️ Tabela 'products' não existe. Inserção ignorada.");
            }
        
        } catch (err) {
            console.error("❌ Erro ao lidar com a tabela 'products':", err);
        }

        const createOrdersTableQuery = `
            CREATE TABLE IF NOT EXISTS orders (
                id SERIAL PRIMARY KEY,
                user_id integer REFERENCES users(id),
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