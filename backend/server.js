import publicRoutes from "./routes/public.js"
import privateRoutes from "./routes/private.js"
import express from 'express'

const PORT = 3000;

const app = express();
app.use(express.json()); 

app.use('/', publicRoutes);
app.use('/', privateRoutes)

app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
