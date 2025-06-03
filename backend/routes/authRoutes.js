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
 *       - Auth(app)
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
 *       - Auth(app)
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
    res.send("🚀 API is running...NOVO");
});

//login route

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Autentica um usuário e retorna um token JWT.
 *     tags:
 *       - Auth(app)
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
        const { email, password } = req.body;

        
        if (!email || !password) {
            return res.status(400).json({ error: "email  and password are required" });
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


        if (!user.email_verified) {
            return res.status(403).json({ error: "Email not verified", redirect: "/verify-email" });
        }


        const accessToken = jwt.sign({cpf: user.cpf}, JWT_SECRET, { expiresIn: "1d" });

        
        res.status(200).json({
            message : "login bem sucedido",
            accessToken: accessToken,
            
        });

    } catch (error) {
        console.error("❌ Login error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


/**
 * @swagger
 * /register-totem:
 *   post:
 *     summary: Registra um usuário via totem
 *     tags:
 *       - Auth (totem)
 *     description: Permite que um usuário se registre no sistema via totem, podendo fornecer ou não um CPF no body.
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cpf:
 *                 type: string
 *                 example: "12345678900"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
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
 *                   nullable: true
 *                   example: "12345678900"
 *                 name:
 *                   type: string
 *                   nullable: true
 *                 email:
 *                   type: string
 *                   nullable: true
 *                 password:
 *                   type: string
 *                   nullable: true
 *                 birth_date:
 *                   type: string
 *                   format: date
 *                   nullable: true
 *       400:
 *         description: Usuário já existe.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User already exists"
 *       500:
 *         description: Erro interno no servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
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
            console.log("User created:", newUser.rows[0]);
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

router.get("/usuarios", async (req,res) => {
    try{
        const result = await pool.query("SELECT * FROM users");
        console.log("usuários", result.rows)
        res.json(result.rows);
    }
    catch(err){
        console.error("❌ Error retrieving products:", err);
        console.log("nao deu")
        res.status(500).json({ error: "Internal server error" });
    }
});



//login 

/**
 * @swagger
 * /login-totem:
 *   post:
 *     summary: Login de totem via CPF
 *     tags:
 *       - Auth (totem)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cpf
 *             properties:
 *               cpf:
 *                 type: string
 *                 example: "12345678900"
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso
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
 *       400:
 *         description: CPF ausente ou usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Erro interno do servidor
 */

router.post("/login-totem",async(req,res) =>{
    try{
        const {cpf} = req.body;

        if(!cpf){
            return res.status(400).json({error: "CPF is required"});
        }

        const userQuery = await pool.query("SELECT * FROM users WHERE cpf = $1", [cpf]);

        if(userQuery.rows.length === 0){
            return res.status(400).json({error: "User not found"});
        }

        const user = userQuery.rows[0];

        res.status(200).json({
            id: user.id,
            cpf: user.cpf,
        });
    }
    catch(err){
        console.error("❌ Login error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
})

router.post("/anonymous-users", async (req, res) => {
  try {
    const newUser = await pool.query(
      "INSERT INTO users (cpf, name, email, password, birth_date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [null, null, null, null, null]
    );
    console.log("Anonymous user created:", newUser.rows[0]);
    return res.status(201).json(newUser.rows[0]);
  } catch (error) {
    console.error("Error creating anonymous user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/usuarios/:id",async(req,res) => {
    try{
        const {id} = req.params;
        const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

        if(result.rows.length === 0){
            return res.status(404).json({error: "User not found"});
        }

        res.json(result.rows[0]);
    }
    catch(err){
        console.error("❌ Error retrieving user:", err);
        res.status(500).json({ error: "Internal server error" });
    }
})






export default router;