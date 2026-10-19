
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
}));

app.use(express.json({ limit: "10kb" }));

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "MarketSlim API is running.",
  });
});

app.use("/api/auth", authRoutes);

const startServer = async () => {
  try {
    if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
      throw new Error("MONGO_URI and JWT_SECRET must be configured.");
    }

    await connectDB();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`MarketSlim API: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
