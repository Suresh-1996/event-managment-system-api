// const express = require("express");
// const dotenv = require("dotenv");

// const connectDB = require("./config/db");
// const bookinRoutes = require("./routes/bookingRoutes");
// const http = require("http"); // Required for socket.io
// const { Server } = require("socket.io");
// const cors = require("cors");

// dotenv.config();
// connectDB();

// const app = express();
// app.use(express.json());
// app.use(cors());

// // Routes
// app.use("/api/admin", require("./routes/adminRoutes"));
// app.use("/api/events", require("./routes/eventRoutes"));
// app.use("/api/users", require("./routes/userRoutes"));
// app.use("/api/bookings", bookinRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bookingRoutes = require("./routes/bookingRoutes");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "DELETE", "PUT", "POST"],
  },
});

app.use(cors());
app.use(express.json());
app.set("io", io);

io.on("connection", (socket) => {
  console.log("Admin Connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("Admin Disconnected:", socket.id);
  });
});

app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
