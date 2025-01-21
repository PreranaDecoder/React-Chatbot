const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Update this to your frontend URL if different
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// Test Root Route
app.get("/", (req, res) => {
  res.send("Server is running successfully!");
});

app.get("/api/test-db", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT 1");
    res.status(200).send("Database connected!");
  } catch (error) {
    res.status(500).send("Database connection failed!");
  }
});

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/chats", require("./routes/chat"));

// Global Error Handler (Optional for debugging)
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack);
  res
    .status(500)
    .json({ message: "Internal server error", error: err.message });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
