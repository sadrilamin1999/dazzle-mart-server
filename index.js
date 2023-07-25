require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user.route");

// Variables
const port = process.env.PORT || 4000;
const uri = process.env.MONGO_URI;

// Express app
const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    credentials: true,
  })
);

// Test api
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to dazzle mart server" });
});

// Bypassed api
app.use("/api/user", userRoutes);

// Database
mongoose
  .connect(uri, { useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
