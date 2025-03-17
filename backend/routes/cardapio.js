
import express from 'express'
import pool from "../db.js"

const router = express.Router();

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Retorna a lista de produtos disponíveis
 *     tags:
 *       - Produtos
 *     description: Obtém todos os produtos cadastrados no banco de dados.
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso.
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
 *                   name:
 *                     type: string
 *                     example: "Big Mac"
 *                   category:
 *                     type: string
 *                     example: "Sanduíches"
 *                   price:
 *                     type: number
 *                     format: float
 *                     example: 25.90
 *                   image_url:
 *                     type: string
 *                     example: "https://cache-mcd-middleware.mcdonaldscupones.com/media/image/product$kzXCTbnv/200/200/original?country=br"
 *       500:
 *         description: Erro interno no servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get("/produtos", async (req,res) => {
    try{
        const result = await pool.query("SELECT * FROM products");
        console.log("prdutos", result.rows)
        res.json(result.rows);
    }
    catch(err){
        console.error("❌ Error retrieving products:", err);
        console.log("nao deu")
        res.status(500).json({ error: "Internal server error" });
    }
});


export default router;