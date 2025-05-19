import express from 'express'
import pool from "../db.js"

const router = express.Router();





router.post("/order", async (req, res) => {
    const { user_id, items } = req.body;
  
    if (!user_id || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Dados inválidos" });
    }
  
    const client = await pool.connect();
  
    try {
      await client.query("BEGIN");
  
      let total = 0;
      const produtosMapeados = [];
  
      
      for (const item of items) {
        const product = await client.query("SELECT * FROM products WHERE id = $1", [item.product_id]);
  
        if (product.rows.length === 0) {
          return res.status(400).json({ error: `Produto ${item.product_id} não encontrado` });
        }
  
        const productData = product.rows[0];
        const subtotal = productData.price * item.quantity;
  
        total += subtotal;
  
        produtosMapeados.push({
          ...item,
          price: productData.price,
        });
      }
  
      
      const orderResult = await client.query(
        "INSERT INTO orders (user_id, total) VALUES ($1, $2) RETURNING *",
        [user_id, total]
      );
  
      const order = orderResult.rows[0];
      const orderId = order.id;
  
      
      for (const item of produtosMapeados) {
        await client.query(
          "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)",
          [orderId, item.product_id, item.quantity, item.price]
        );
      }
  
      await client.query("COMMIT");
  
      res.status(201).json({
        message: "Pedido criado com sucesso!",
        order,
      });
  
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("❌ Error creating order:", error);
      res.status(500).json({ error: "Internal server error" });
    } finally {
      client.release();
    }
  });
  



router.get("/todos", async(req,res) => {
    try {
        const result = await pool.query("SELECT * FROM orders");
        console.log("pedidos", result.rows)
        res.json(result.rows);
        

        
    } catch (error) {
        console.error("❌ Error retrieving orders:", error);
        res.status(500).json({ error: "Internal server error" });
        
    }
})


router.get('/orderItems', async (req,res)=> {
    try {
        const result = await pool.query("SELECT * FROM order_items");
        console.log("pedidos", result.rows)
        res.json(result.rows);
        
    } catch (error) {
        console.error("❌ Error retrieving order items:", error);
        res.status(500).json({ error: "Internal server error" });
        
    }
})














export default router;