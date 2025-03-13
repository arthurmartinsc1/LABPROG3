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

const verificationCodes = new Map();
router.post("/register-app", async (req, res) => {
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

        const verificationCode = crypto.randomInt(100000, 999999).toString();
        console.log("Verification code:", verificationCode);
        verificationCodes.set(email, {code : verificationCode, expires: Date.now() + 10*60*1000});

        console.log("salvo no map " , verificationCodes.get(email, verificationCode));

        await sendVerificationEmail(email, verificationCode);

        res.status(201).json({
             message: "Usuário registrado com sucesso! Verifique seu email para ativar sua conta.",
             redirect: "/verify-email",
             user: result.rows[0]

             });
    } catch (error) {
        console.error("❌ Registration error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

/**
 * @swagger
 * /verify-email:
 *   post:
 *     summary: Verifica o email do usuário
 *     description: Verifica o código de verificação enviado para o email do usuário e marca o email como verificado no banco de dados.
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
 *               - code
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "usuario@email.com"
 *               code:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Email verificado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email verified successfully"
 *                 redirect:
 *                   type: string
 *                   example: "/login"
 *       400:
 *         description: Código inválido ou expirado, ou campos ausentes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid or expired verification code"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */


router.post("/verify-email" , async (req,res) => {
    try {
        const {email, code} = req.body;

        if(!email || !code){
            return res.status(400).json({error: "Email and code are required"});
        }

        const storedCode = verificationCodes.get(email);
        console.log("Stored code:", storedCode);
        if (!storedCode || storedCode.code !== code) {
            return res.status(400).json({ error: "Invalid or expired verification code" });


        }

        await pool.query("UPDATE users SET email_verified = TRUE WHERE email = $1", [email]);

        verificationCodes.delete(email);

        res.status(200).json({
            message: "Email verified successfully",
            redirect: "/login"
        });

    } catch (error) {
        
    }
})




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
 *               - cpf
 *               - password
 *             properties:
 *               cpf:
 *                 type: string
 *                 example: "123.456.789-00"
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


router.post("/login-app", async (req, res) => {
    try {
        const { cpf, password } = req.body;

        
        if (!cpf || !password) {
            return res.status(400).json({ error: "cpf  and password are required" });
        }

        
        const userQuery = await pool.query("SELECT * FROM users WHERE cpf = $1", [cpf]);

        
        if (userQuery.rows.length === 0) {
            return res.status(400).json({ error: "User not found" });
        }

        

        const user = userQuery.rows[0];

       
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });


        }

        console.log("JWT_SECRET:", JWT_SECRET); 


        if (!user.email_verified) {
            return res.status(403).json({ error: "Email not verified", redirect: "/verify-email" });
        }


        const accessToken = jwt.sign({cpf: user.cpf}, JWT_SECRET, { expiresIn: "1d" });

        
        res.status(200).json({accessToken});

    } catch (error) {
        console.error("❌ Login error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/register-totem", async (req,res) => {
    const { cpf } = req.body;
    if (!cpf) {
        
        const newUser = await pool.query(
            "INSERT INTO users (cpf, name, email, password, birth_date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [null, null, null, null, null]
        );
        return res.status(201).json(newUser.rows[0]);
    }
    try{
        const userQuery = await pool.query("SELECT * FROM users WHERE cpf = $1", [cpf]);

        if(userQuery.rows.length >0){
            return res.status(400).json({error: "User already exists"});
        }


        if (userQuery.rows.length === 0){
            
            const newUser = await pool.query(
                "INSERT INTO users (cpf, name, email, password, birth_date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
                [cpf, null, null,null, null]
            );
            return res.status(201).json(newUser.rows[0]);
        }
        else {
            
            return res.status(200).json(userQuery.rows[0]);
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
    
});





export default router;