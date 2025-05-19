import authRoutes from "./routes/authRoutes.js"
import privateRoutes from "./routes/private.js"
import cardapio from "./routes/cardapio.js"
import express from 'express'
import orderRoutes from "./routes/orderRoutes.js"
import auth from "./middlewares/auth.js"
import { swaggerUi, swaggerDocs } from "./swaggerConfig.js";
import cors from "cors";
const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json()); 
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/', orderRoutes)
app.use('/', authRoutes);
app.use('/', cardapio)
app.use('/',auth, privateRoutes)



app.listen(PORT, () =>{ 
    console.log("📄 Documentação disponível em http://localhost:3000/api-docs");
    console.log(`🚀 Server is running on port ${PORT}`)});
