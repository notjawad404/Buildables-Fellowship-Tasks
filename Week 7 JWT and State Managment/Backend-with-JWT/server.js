import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express();

// ✅ Allow all origins and all methods
app.use(
  cors({
    origin: "*", // allow all origins
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // allow all HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // allow common headers
  })
);
app.use(express.json());

// Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("✅ Task API with JWT Authentication running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
