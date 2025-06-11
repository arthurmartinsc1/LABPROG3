import express from 'express'
import pool from "../db.js"

const router = express.Router();




/**
 * @swagger
 * /me:
 *   get:
 *     summary: Retorna os dados do usuário autenticado.
 *     description: Requer um token JWT válido no cabeçalho Authorization. Retorna os dados do usuário correspondente ao token.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do usuário retornados com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 cpf:
 *                   type: string
 *                   example: "12345678900"
 *                 name:
 *                   type: string
 *                   example: "João Silva"
 *                 email:
 *                   type: string
 *                   example: "joao@email.com"
 *                 birth_date:
 *                   type: string
 *                   format: date
 *                   example: "1990-01-01"
 *                 email_verified:
 *                   type: boolean
 *                   example: true
 *       401:
 *         description: Token de autenticação não fornecido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Acesso negado!"
 *       403:
 *         description: Token inválido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Token inválido!"
 *       404:
 *         description: Usuário não encontrado no banco de dados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
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

router.get("/me", async (req, res) => {
  try {
    const { cpf } = req.user;

    const userQuery = await pool.query("SELECT * FROM users WHERE cpf = $1", [cpf]);

    if (userQuery.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = userQuery.rows[0];
    delete user.password;

    res.json(user);
  } catch (err) {
    console.error("❌ Error in /me:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});




export default router;