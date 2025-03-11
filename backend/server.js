import publicRoutes from "./routes/public.js"
import privateRoutes from "./routes/private.js"
import express from 'express'
import auth from "./middlewares/auth.js";

import { swaggerUi, swaggerDocs } from "./swaggerConfig.js";
const PORT = 3000;

const app = express();
app.use(express.json()); 
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/', publicRoutes);
app.use('/',auth, privateRoutes)

app.listen(PORT, () =>{ 
    console.log("📄 Documentação disponível em http://localhost:3000/api-docs");
    console.log(`🚀 Server is running on port ${PORT}`)});
