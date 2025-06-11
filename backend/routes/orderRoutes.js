import express from 'express'
import pool from "../db.js"

const router = express.Router();

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Cria um novo pedido
 *     tags:
 *       - Pedidos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - items
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 1
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - product_id
 *                     - quantity
 *                   properties:
 *                     product_id:
 *                       type: integer
 *                       example: 101
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Pedido criado com sucesso!
 *                 order:
 *                   type: object
 *       400:
 *         description: Dados inválidos ou produto não encontrado
 *       500:
 *         description: Erro interno no servidor
 */

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

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Lista todos os pedidos
 *     description: Retorna todos os pedidos registrados no banco de dados.
 *     tags:
 *       - Pedidos
 *     responses:
 *       200:
 *         description: Lista de pedidos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   user_id:
 *                     type: integer
 *                     example: 1
 *                   total:
 *                     type: number
 *                     format: float
 *                     example: 149.90
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-06-10T14:30:00.000Z"
 *       500:
 *         description: Erro interno no servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
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

/**
 * @swagger
 * /orderItems:
 *   get:
 *     summary: Lista todos os itens de pedidos
 *     description: Retorna todos os registros da tabela `order_items`, contendo os produtos relacionados a cada pedido.
 *     tags:
 *       - Pedidos
 *     responses:
 *       200:
 *         description: Lista de itens de pedidos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   order_id:
 *                     type: integer
 *                     example: 10
 *                   product_id:
 *                     type: integer
 *                     example: 101
 *                   quantity:
 *                     type: integer
 *                     example: 2
 *                   price:
 *                     type: number
 *                     format: float
 *                     example: 49.95
 *       500:
 *         description: Erro interno ao buscar os itens de pedidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
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