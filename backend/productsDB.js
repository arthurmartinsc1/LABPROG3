import pool from "./db.js";

const products = [
    // Sanduíches
    { name: "Big Mac", category: "Sanduíches", price: 25.90, image_url: "https://cache-mcd-middleware.mcdonaldscupones.com/media/image/product$kzXCTbnv/200/200/original?country=br" },
    { name: "Cheeseburger", category: "Sanduíches", price: 10.90, image_url: "https://cache-mcd-middleware.mcdonaldscupones.com/media/image/product$kRXV7tWV/200/200/original?country=br" },
    { name: "McChicken", category: "Sanduíches", price: 22.90, image_url: "	https://cache-mcd-middleware.mcdonaldscupones.com/media/image/product$keX4W7gr/200/200/original?country=br" },
    { name: "Quarterão com Queijo", category: "Sanduíches", price: 26.90, image_url: "https://cache-mcd-middleware.mcdonaldscupones.com/media/image/product$kzXNUCF7/200/200/original?country=br" },
    { name: "McFiesta", category: "Sanduíches", price: 25.90, image_url: "https://cache-mcd-middleware.mcdonaldscupones.com/media/image/product$kCXRg6qT/200/200/original?country=br" },
    { name: "Cheddar McMelt", category: "Sanduíches", price: 29.90, image_url: "https://cache-mcd-middleware.mcdonaldscupones.com/media/image/product$kzXv7hw4/200/200/original?country=br" },
    { name: "McNífico Bacon", category: "Sanduíches", price: 31.90, image_url: "https://cache-mcd-middleware.mcdonaldscupones.com/media/image/product$kzXjtUHf/200/200/original?country=br" },
    { name: "Big Tasty", category: "Sanduíches", price: 34.90, image_url: "https://cache-mcd-middleware.mcdonaldscupones.com/media/image/product$kfXJJjT7/200/200/original?country=br" },

    // Bebidas
    { name: "Coca-Cola", category: "Bebidas", price: 8.00, image_url: "https://cache-mcd-middleware.mcdonaldscupones.com/media/image/product$kNXBvqQj/200/200/original?country=br" },
    { name: "Fanta Laranja", category: "Bebidas", price: 8.00, image_url: "https://cache-mcd-middleware.mcdonaldscupones.com/media/image/product$kNXCmy2C/200/200/original?country=br" },
    { name: "Fanta Guaraná", category: "Bebidas", price: 8.00, image_url: "https://cache-mcd-middleware.mcdonaldscupones.com/media/image/product$kNXqRBxK/200/200/original?country=br" },
    { name: "Suco de Uva Del Valle", category: "Bebidas", price: 10.00, image_url: "https://cache-mcd-middleware.mcdonaldscupones.com/media/image/product$kNXlm7Gu/200/200/original?country=br" },
    { name: "Suco de Laranja Del Valle", category: "Bebidas", price: 10.00, image_url: "https://cache-mcd-middleware.mcdonaldscupones.com/media/image/product$kNXkpLzq/200/200/original?country=br" },
    { name: "Água Mineral", category: "Bebidas", price: 6.00, image_url: "https://cache-mcd-middleware.mcdonaldscupones.com/media/image/product$k7X5DQ6J/200/200/original?country=br" },
    

    // Acompanhamentos
    { name: "Batata Frita", category: "Acompanhamentos", price: 5.90, image_url: "https://cache-mcd-middleware.mcdonaldscupones.com/media/image/product$kUXGZHtB/200/200/original?country=br" },
    { name: "McFritas Cheddar Bacon", category: "Acompanhamentos", price: 18.90, image_url: "https://cache-mcd-middleware.mcdonaldscupones.com/media/image/product$kvX4h9AE/200/200/original?country=br" },
    { name: "Chicken McNuggets", category: "Acompanhamentos", price: 24.90, image_url: "https://cache-mcd-middleware.mcdonaldscupones.com/media/image/product$kMXFAQwe/200/200/original?country=br" },

    // Sobremesas
    { name: "McFlurry", category: "Sobremesas", price: 16.90, image_url: "https://cache-mcd-middleware.mcdonaldscupones.com/media/image/product$kRX3z5qu/200/200/original?country=br" },
    { name: "Sundae", category: "Sobremesas", price: 12.90, image_url: "https://cache-mcd-middleware.mcdonaldscupones.com/media/image/product$kpXuLeTy/200/200/original?country=br" },
    { name: "Top Sundae", category: "Sobremesas", price: 13.90, image_url: "https://cache-mcd-middleware.mcdonaldscupones.com/media/image/product$kpXGFtJB/200/200/original?country=br" },
    { name: "Casquinha", category: "Sobremesas", price: 5.90, image_url: "https://cache-mcd-middleware.mcdonaldscupones.com/media/image/product$kpX0NLJ6/200/200/original?country=br" },
    { name: "McShake", category: "Bebidas", price: 15.90, image_url: "https://cache-mcd-middleware.mcdonaldscupones.com/media/image/product$kJX8kVfQ/200/200/original?country=br" },
    { name: "Torta de Maçã", category: "Sobremesas", price: 8.90, image_url: "https://cache-mcd-middleware.mcdonaldscupones.com/media/image/product$krXTZ9Ue/200/200/original?country=br" },
    { name: "Torta de Banana", category: "Sobremesas", price: 8.90, image_url: "https://cache-mcd-middleware.mcdonaldscupones.com/media/image/product$krXM4gra/200/200/original?country=br" },
];


export const insertProducts = async () => {
    try {
        for (const product of products) {
            const res = await pool.query(
                `INSERT INTO products (name, category, price, image_url) 
                VALUES ($1, $2, $3, $4)
                ON CONFLICT (name) DO NOTHING RETURNING *;`, // Evita duplicatas
                [product.name, product.category, product.price, product.image_url]
            );
            console.log("✅ Produto inserido:", res.rows[0] || "Já existia");
        }
    } catch (err) {
        console.error("❌ Erro ao inserir produtos:", err);
    }
};
