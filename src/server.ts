import express from "express";
import dotenv from "dotenv";
import connectDB from "./db";
import userRoutes from "./routes/userRoutes";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Conexão com o MongoDB
connectDB();

// Usar as rotas de usuário
app.use("/api", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
