const express = require("express");
const path = require("path");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// frontend
app.use(express.static(path.join(__dirname, "../public")));

// api
app.use("/api", userRoutes);

module.exports = app;