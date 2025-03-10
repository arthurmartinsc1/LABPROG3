const express = require("express");
const pool = require("./db"); 

const app = express();
app.use(express.json()); 

const PORT = 3000;


app.post("/register", async (req, res) => {
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


app.get("/users", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM users");
        res.json(result.rows);
    } catch (error) {
        console.error("❌ Error retrieving users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.get("/", (req, res) => {
    res.send("🚀 API is running...");
});


app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
