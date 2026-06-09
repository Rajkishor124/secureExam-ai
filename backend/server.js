const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const examRoutes = require("./routes/examRoutes");
const resultRoutes = require("./routes/resultRoutes");
const adminRoutes = require("./routes/adminRoutes");
const exportRoutes = require("./routes/exportRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/exams", examRoutes);

app.use("/api/results", resultRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/export", exportRoutes);

app.get("/", (req, res) => {
  res.send("SecureExam AI Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});