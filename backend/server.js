import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import bookRoutes from "./routes/bookRoutes.js"
import borrowRequestRoutes from "./routes/borrowRequestRoutes.js"

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://borrowly-frontend.onrender.com",
    ],
    credentials: true,
  })
);

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);

app.use("/api/books",bookRoutes);

app.use("/api/borrow",borrowRequestRoutes);

app.get('/', (req,res) => {
    res.send("BACKEND IS RUNNING");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT , () => {
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});