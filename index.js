require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const port = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
  })
);

app.get("./", (req, res) => {
  res.status(200).json({ message: "Welcome to dazzle mart server" });
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
