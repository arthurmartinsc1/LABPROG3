import express from 'express'
import pool from "../db.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
import crypto from 'crypto'
import { sendVerificationEmail } from '../emailService.js';
dotenv.config();

const router = express.Router();


const JWT_SECRET = process.env.JWT_SECRET;
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registra um novo usuário no sistema.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cpf
 *               - name
 *               - email
 *               - password
 *               - birth_date
 *             properties:
 *               cpf:
 *                 type: string
 *                 example: "123.456.789-00"
 *               name:
 *                 type: string
 *                 example: "João Silva"
 *               email:
 *                 type: string
 *                 example: "joao@email.com"
 *               password:
 *                 type: string
 *                 example: "SenhaSegura123!"
 *               birth_date:
 *                 type: string
 *                 format: date
 *                 example: "1995-06-15"
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User successfully registered"
 *                 user:
 *                   type: object
 *                   properties:
 *                     
 *                     cpf:
 *                       type: string
 *                       example: "123.456.789-00"
 *                     name:
 *                       type: string
 *                       example: "João Silva"
 *                     email:
 *                       type: string
 *                       example: "joao@email.com"
 *                     birth_date:
 *                       type: string
 *                       format: date
 *                       example: "1995-06-15"
 *       400:
 *         description: Campos obrigatórios ausentes ou inválidos.
 *       500:
 *         description: Erro interno do servidor.
 */
router.post("/register", async (req, res) => {
    try {
        const { cpf, name, email, password, birth_date } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        
 
        if (!cpf || !name || !email || !password || !birth_date) {
            return res.status(400).json({ error: "CPF, full name, email, password, and birth date are required" });
        }

       
        const query = `
            INSERT INTO users (cpf, name, email, password, birth_date)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;

        
        const values = [cpf, name, email, hashPassword, birth_date];

      
        const result = await pool.query(query, values);

        res.status(201).json({ message: "User successfully registered", user: result.rows[0] });
    } catch (error) {
        console.error("❌ Registration error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


router.get("/", (req, res) => {
    res.send("🚀 API is running...");
});

//login route

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Autentica um usuário e retorna um token JWT.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "usuario@email.com"
 *               password:
 *                 type: string
 *                 example: "senha123"
 *     responses:
 *       200:
 *         description: Login bem-sucedido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1..."
 *       400:
 *         description: Usuário não encontrado ou credenciais inválidas.
 *       500:
 *         description: Erro interno do servidor.
 */


router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        
        const userQuery = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        
        if (userQuery.rows.length === 0) {
            return res.status(400).json({ error: "User not found" });
        }

        

        const user = userQuery.rows[0];

       
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });


        }

        console.log("JWT_SECRET:", JWT_SECRET); 


        const accessToken = jwt.sign({email: user.email}, JWT_SECRET, { expiresIn: "1d" });

        
        res.status(200).json({accessToken});

    } catch (error) {
        console.error("❌ Login error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});





export default router;