import express from 'express'
import pool from "../db.js"

const router = express.Router();


router.post("/register", async (req, res) => {
    try {
        const { cpf, name, email, password, birth_date } = req.body;

       
        if (!cpf || !name || !email || !password || !birth_date) {
            return res.status(400).json({ error: "CPF, full name, email, password, and birth date are required" });
        }

       
        const query = `
            INSERT INTO users (cpf, name, email, password, birth_date)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;

        
        const values = [cpf, name, email, password, birth_date];

      
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

export default router;