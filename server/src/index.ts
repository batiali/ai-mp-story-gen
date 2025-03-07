import express from "express";
import http from "http";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import { authMiddleware } from "./middleware/authMiddleware";

dotenv.config();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Auth middleware
app.use(authMiddleware);

// Use API routes
app.use(routes);

// Database connection
const connectDB = async () => {
    try {
        const mongoUri =
            process.env.MONGODB_URI ||
            "mongodb://mongodb-dev:27017/ai-narrative?replicaSet=rs0";
        console.log("Connecting to MongoDB at:", mongoUri);
        await mongoose.connect(mongoUri);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

// Routes
app.get("/", (req, res) => {
    res.send("AI Narrative API is running");
});

// Start server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Connect to database
connectDB();
