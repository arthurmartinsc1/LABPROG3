import express from 'express'
import pool from "../db.js"

const router = express.Router();

router.get("/users", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM users");
        res.json(result.rows);
    } catch (error) {
        console.error("❌ Error retrieving users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/cardapio", async (req,res) => {
    try{
        const result = await pool.query("SELECT * FROM products");
        res.json(result.rows);
    }
    catch(err){
        console.error("❌ Error retrieving products:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

export default router;