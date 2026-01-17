import express from "express";
import dotenv from "dotenv";
import path from "path";  
import connectDB from "./Config/db_config.js";
import authRoutes from "./Routes/auth_routs.js";
import corsMiddleware from "./middleware/cors_middleware.js";
import uploadRoutes from "./Routes/upload_routes.js"
import deleteRoutes from "./Routes/delete_routs.js";
import bookingRoutes from './Routes/booking_routs.js'
dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(corsMiddleware);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api", uploadRoutes);
app.use("/api", deleteRoutes);
app.use("/api", bookingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
