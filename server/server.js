const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const statusRoutes = require("./routes/statusRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();


// Create HTTP Server
const server = http.createServer(app);


// Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});


// Make io available everywhere
app.set("io", io);


// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/status", statusRoutes);
app.use("/api/users", userRoutes);


// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));


// Test Route
app.get("/", (req, res) => {
  res.send("Campus Connect API Running");
});


// Socket Connection
io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});


// Start Server
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});